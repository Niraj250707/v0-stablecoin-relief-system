-- updated initial schema to include all necessary tables for the stablecoin relief system
-- Emergency & Disaster Relief Stablecoin System (RELIEF)
-- Initial Database Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Roles Enum
create type user_role as enum ('admin', 'field_agent', 'merchant', 'beneficiary', 'donor');

-- Profiles Table (Linked to Auth.Users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  role user_role default 'beneficiary',
  organization_name text,
  is_verified boolean default false,
  wallet_address text unique,
  location_json jsonb, -- { state, district, village }
  kyc_hash text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Disaster Relief Campaigns
create table if not exists public.campaigns (
  id uuid primary key default uuid_generate_v4(),
  on_chain_id bigint unique, -- ID in ProgramManager contract
  title text not null,
  description text,
  disaster_type text,
  region text, -- state/district
  status text check (status in ('active', 'completed', 'paused')) default 'active',
  budget_total numeric(20, 2) default 0,
  budget_spent numeric(20, 2) default 0,
  allocation_per_user numeric(20, 2) default 0,
  start_date timestamp with time zone,
  end_date timestamp with time zone,
  created_by uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Beneficiary Allocations (Stablecoin Credits)
create table if not exists public.allocations (
  id uuid primary key default uuid_generate_v4(),
  campaign_id uuid references public.campaigns(id) on delete cascade,
  beneficiary_id uuid references public.profiles(id) on delete cascade,
  amount numeric(20, 2) not null,
  status text check (status in ('pending', 'active', 'redeemed', 'expired')) default 'active',
  expires_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Transactions (Blockchain-tracked relay)
create table if not exists public.transactions (
  id uuid primary key default uuid_generate_v4(),
  sender_id uuid references public.profiles(id),
  receiver_id uuid references public.profiles(id),
  campaign_id uuid references public.campaigns(id),
  amount numeric(20, 2) not null,
  tx_hash text unique, -- EVM Transaction Hash
  status text check (status in ('pending', 'confirmed', 'failed')) default 'pending',
  type text check (type in ('donation', 'allocation', 'disbursement', 'purchase')),
  category text check (category in ('Food', 'Health', 'Shelter', 'Fuel', 'Other')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- AI Risk Scoring (for fraud detection)
create table if not exists public.risk_scores (
  id uuid primary key default uuid_generate_v4(),
  entity_id uuid not null, -- profile_id or merchant_id
  entity_type text not null, -- 'profile' or 'merchant'
  score numeric(5, 2) not null, -- 0-100
  risk_factors jsonb,
  risk_reason text,
  last_updated timestamp with time zone default timezone('utc'::text, now()) not null
);

-- DAO Proposals (Simplified)
create table if not exists public.proposals (
  id uuid primary key default uuid_generate_v4(),
  campaign_id uuid references public.campaigns(id),
  title text not null,
  description text,
  votes_for bigint default 0,
  votes_against bigint default 0,
  status text check (status in ('pending', 'active', 'passed', 'failed')) default 'pending',
  created_by uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.campaigns enable row level security;
alter table public.allocations enable row level security;
alter table public.transactions enable row level security;
alter table public.risk_scores enable row level security;
alter table public.proposals enable row level security;

-- RLS Policies

-- Profiles
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- Campaigns
create policy "Campaigns are viewable by everyone." on public.campaigns for select using (true);
create policy "Admins can insert campaigns." on public.campaigns for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Transactions
create policy "Users can view their own transactions." on public.transactions for select using (
  auth.uid() = sender_id or auth.uid() = receiver_id
);

-- Trigger for profile creation on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    coalesce((new.raw_user_meta_data ->> 'role')::user_role, 'beneficiary'::user_role)
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
