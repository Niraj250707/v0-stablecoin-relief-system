// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./ReliefStablecoin.sol";

/**
 * @title ProgramManager
 * @dev Manages disaster relief programs, registrations, and disbursements.
 */
contract ProgramManager is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant FIELD_AGENT_ROLE = keccak256("FIELD_AGENT_ROLE");

    ReliefStablecoin public token;

    enum ProgramStatus { Active, Completed, Paused }
    enum MerchantCategory { Food, Health, Shelter, Fuel, Other }

    struct Program {
        uint256 id;
        string name;
        string disasterType;
        string region;
        uint256 startDate;
        uint256 endDate;
        uint256 totalBudget;
        uint256 allocationPerUser;
        ProgramStatus status;
        uint256 fundsDistributed;
    }

    struct MerchantInfo {
        MerchantCategory category;
        string region;
        bool isRegistered;
    }

    struct BeneficiaryInfo {
        bytes32 offChainHash;
        string region;
        bool isRegistered;
        uint256 totalReceived;
        uint256 dailySpent;
        uint256 lastSpendTimestamp;
    }

    mapping(uint256 => Program) public programs;
    uint256 public programCount;

    // programId => wallet => info
    mapping(uint256 => mapping(address => BeneficiaryInfo)) public beneficiaries;
    mapping(uint256 => mapping(address => MerchantInfo)) public merchants;

    event ProgramCreated(uint256 indexed id, string name, uint256 budget);
    event BeneficiaryRegistered(uint256 indexed programId, address indexed wallet);
    event MerchantRegistered(uint256 indexed programId, address indexed wallet, MerchantCategory category);
    event TokensAirdropped(uint256 indexed programId, uint256 totalAmount, uint256 count);
    event MerchantPaid(uint256 indexed programId, address indexed beneficiary, address indexed merchant, uint256 amount);
    event TokensClawedBack(uint256 indexed programId, address indexed wallet, uint256 amount);

    constructor(address _tokenAddress) {
        token = ReliefStablecoin(_tokenAddress);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function createProgram(
        string memory _name,
        string memory _disasterType,
        string memory _region,
        uint256 _startDate,
        uint256 _endDate,
        uint256 _totalBudget,
        uint256 _allocationPerUser
    ) external onlyRole(ADMIN_ROLE) {
        programCount++;
        programs[programCount] = Program({
            id: programCount,
            name: _name,
            disasterType: _disasterType,
            region: _region,
            startDate: _startDate,
            endDate: _endDate,
            totalBudget: _totalBudget,
            allocationPerUser: _allocationPerUser,
            status: ProgramStatus.Active,
            fundsDistributed: 0
        });

        emit ProgramCreated(programCount, _name, _totalBudget);
    }

    function registerBeneficiary(uint256 _programId, address _wallet, bytes32 _offChainHash, string memory _region) external onlyRole(FIELD_AGENT_ROLE) {
        require(!beneficiaries[_programId][_wallet].isRegistered, "Already registered");
        beneficiaries[_programId][_wallet] = BeneficiaryInfo({
            offChainHash: _offChainHash,
            region: _region,
            isRegistered: true,
            totalReceived: 0,
            dailySpent: 0,
            lastSpendTimestamp: 0
        });
        emit BeneficiaryRegistered(_programId, _wallet);
    }

    function registerMerchant(uint256 _programId, address _wallet, MerchantCategory _category, string memory _region) external onlyRole(ADMIN_ROLE) {
        merchants[_programId][_wallet] = MerchantInfo({
            category: _category,
            region: _region,
            isRegistered: true
        });
        emit MerchantRegistered(_programId, _wallet, _category);
    }

    function airdropToBeneficiaries(uint256 _programId, address[] calldata _beneficiaries) external onlyRole(ADMIN_ROLE) {
        Program storage p = programs[_programId];
        require(p.status == ProgramStatus.Active, "Program not active");
        
        uint256 totalAmount = _beneficiaries.length * p.allocationPerUser;
        require(p.fundsDistributed + totalAmount <= p.totalBudget, "Budget exceeded");

        for (uint i = 0; i < _beneficiaries.length; i++) {
            address b = _beneficiaries[i];
            require(beneficiaries[_programId][b].isRegistered, "Beneficiary not registered");
            beneficiaries[_programId][b].totalReceived += p.allocationPerUser;
            token.mint(b, p.allocationPerUser);
        }

        p.fundsDistributed += totalAmount;
        emit TokensAirdropped(_programId, totalAmount, _beneficiaries.length);
    }

    function payMerchant(uint256 _programId, address _merchant, uint256 _amount) external {
        Program storage p = programs[_programId];
        require(block.timestamp >= p.startDate && block.timestamp <= p.endDate, "Outside program dates");
        require(p.status == ProgramStatus.Active, "Program not active");
        
        BeneficiaryInfo storage b = beneficiaries[_programId][msg.sender];
        require(b.isRegistered, "Beneficiary not registered");
        require(merchants[_programId][_merchant].isRegistered, "Merchant not registered");

        // Rule: Reset daily spent if new day
        if (block.timestamp > b.lastSpendTimestamp + 1 days) {
            b.dailySpent = 0;
        }

        // Rule: Simple daily cap (50% of total allocation for demo)
        require(b.dailySpent + _amount <= p.allocationPerUser / 2, "Daily limit reached");

        b.dailySpent += _amount;
        b.lastSpendTimestamp = block.timestamp;

        token.transferFrom(msg.sender, _merchant, _amount);
        emit MerchantPaid(_programId, msg.sender, _merchant, _amount);
    }

    function clawback(uint256 _programId, address _from) external onlyRole(ADMIN_ROLE) {
        require(block.timestamp > programs[_programId].endDate, "Program not ended");
        uint256 balance = token.balanceOf(_from);
        if (balance > 0) {
            token.burn(_from, balance);
            emit TokensClawedBack(_programId, _from, balance);
        }
    }
}
