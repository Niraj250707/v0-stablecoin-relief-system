-- Added voting and audit logging for realism and functional DAO/Risk features
-- DAO Voting Table
create table if not exists public.votes (
  id uuid primary key default uuid_generate_v4(),
  proposal_id uuid references public.proposals(id) on delete cascade,
  voter_id uuid references public.profiles(id) on delete cascade,
  support boolean not null, -- true for yes, false for no
  voting_power numeric(20, 2) default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(proposal_id, voter_id)
);

-- AI Audit Log Table
create table if not exists public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  entity_id uuid not null,
  entity_type text not null,
  admin_id uuid references public.profiles(id),
  action text not null,
  details jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for new tables
alter table public.votes enable row level security;
alter table public.audit_logs enable row level security;

create policy "Users can view all votes." on public.votes for select using (true);
create policy "Donors can cast votes." on public.votes for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'donor')
);

create policy "Audit logs viewable by admins." on public.audit_logs for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Update existing RLS for better security
drop policy if exists "Users can update own profile." on public.profiles;
create policy "Users can update own profile details." on public.profiles for update using (auth.uid() = id);

-- Ensure field agents can register beneficiaries
create policy "Field agents can register beneficiaries." on public.profiles for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'field_agent')
);
