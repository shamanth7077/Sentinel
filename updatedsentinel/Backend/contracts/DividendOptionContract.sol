pragma solidity ^0.4.7;

contract DividendOptionContract {

  //@version: 2.0

  // Next version:
  // - usage of bytes32 instead of strings
  // - Refactor code..

  /*
    VARIABLES
  */

  bool locked = false; // contract's locker
  uint numberOfServiceProviders = 0;

  /*
    EVENTS
  */

  event Announcement(string _msg);

  /*
    MAPPINGS
  */

  // saves the option of shareholders

  mapping(string => address) accountOf;
  mapping(uint => string) optionOf;
  mapping(address => ServiceProviderModule) providerOf;

  /*
    MODULES
  */

  // ### OPTIONAL ###

  struct ShareholderModule {
    string name;
    uint sharesTotal;
    uint sharesChoice;
    uint dividendChoice;
    bool voted;
    bool active;
  }


  struct InfoModule{
    uint creaTime;
    uint announcedTime;
    uint executedTime;
    bool divOptAnnounced;
    bool divOptExecuted;
    bool locked;
  }
  InfoModule info;

  // Timing module not used yet
  struct TimingModule {
    uint exDate;
    uint recordDate;
    uint divPayementDate;
    uint resDeadlineDate;
  }
  TimingModule timing;

  // Informations about the given security asset.
  struct SecurityIdModule {
    string isin;
    string coaf;
    string choice;
    string information;
  }
  SecurityIdModule securityId;

  // Array of different service providers
  // CSD can authorize them
  struct ServiceProviderModule {
    string name;
    uint votingRightsMax;
    uint votingRightsUsed;
    bool active; // handy variable
    uint numberOfClients;
    mapping(uint => ShareholderModule) client;
  }
  ServiceProviderModule[] serviceProvider;

  // Dividend option module
  struct DivOptModule {
    FloatModule dividendPerShare;
    uint minSharesForOption;
    uint holdShares;
    uint getShares;
    uint votingRightsMax;
    uint votingRightsUsed;
  }
  DivOptModule divOpt;

  // Soldity has no floats, we use multiplicators
  struct FloatModule {
    uint number;
    uint multiplicator;
  }

  /*
    CONSTRUCTOR
  */

  function DividendOptionContract(address _csd, string _securityIsin, string _securityCoaf, string _securityChoice, string _securityInfo){
    // Recording of the issuer address
    accountOf['issuer'] = msg.sender;
    // Recording of the CSD address
    accountOf['csd'] = _csd;
    // Recording contract creation time
    info.creaTime = now;
    info.locked = false;
    initDivOpt(_securityIsin, _securityCoaf, _securityChoice, _securityInfo);
  }

  /*
   MODIFIERS
  */

  // Contract locker, not used yet
  modifier locker{
    if(locked)
    throw;
    _;
  }


  modifier forCsd {
    if(msg.sender != accountOf["csd"])
    throw;
    _;
  }

  modifier forIssuer {
    if(msg.sender != accountOf["issuer"])
    throw;
    _;
  }

  // Not optimal yet, will refactor later
  modifier forProvider {
    if(providerOf[msg.sender].active == false ||
    providerOf[msg.sender].votingRightsUsed > providerOf[msg.sender].votingRightsMax)
    throw;
    _;
  }

  modifier ifDivOptAnnounced {
    if(info.divOptAnnounced == false){
      throw;
    }
    _;
  }

  modifier ifDivOptExecuted {
    if(info.divOptExecuted == false){
      throw;
    }
    _;
  }

  /*
   SETTERS
  */

  /*
    Simple dividend option announcement, at this point the address of the
    contract will be sent through an app to the CSD so it will begin listening
    for any new stuff from the contract
  */
  function announceDivOpt() forIssuer {
    if (info.divOptAnnounced) {
      throw;
    }
    info.divOptAnnounced = true;
    info.announcedTime = now;
    Announcement('Swift message: Dividend option Announced');
  }

  /*
    Simple dividend option announcement, at this point the address of the
    contract will be sent through an app to the CSD so it will begin listening
    for any new stuff from the contract
  */
    function initDivOpt(string _securityIsin, string _securityCoaf, string _securityChoice,
    string _securityInfo){
        // Timing to be added...
        securityId.isin = _securityIsin;
        securityId.coaf = _securityCoaf;
        securityId.choice = _securityChoice;
        securityId.information = _securityInfo;
        Announcement('Swift message: Dividend Option Deployed');
    }

    function updateDivOpt(uint _minShares, uint _divPerShare,
    uint _divMult, uint _holdShares, uint _getShares, uint _votesMax) forIssuer ifDivOptAnnounced {
      // Timing to be added...
      if (info.divOptExecuted) {
        throw;
      }
      divOpt.minSharesForOption = _minShares;
      divOpt.dividendPerShare.number = _divPerShare;
      divOpt.holdShares = _holdShares;
      divOpt.getShares = _getShares;
      divOpt.dividendPerShare.multiplicator = _divMult;
      divOpt.votingRightsMax = _votesMax;
      Announcement('Swift message: Dividend Option Updated');
    }

//  function executeDivOpt() forIssuer ifDivOptAnnounced {
  function executeDivOpt() ifDivOptAnnounced {
    // Timing to be added...
    if (info.divOptExecuted) {
      throw;
    }

    for (uint i = 0; i < numberOfServiceProviders; i++) {
      ServiceProviderModule sp = serviceProvider[i];
      for (uint j = 0; j < sp.numberOfClients; j++) {
        sp.client[j].sharesChoice = 0;
        sp.client[j].dividendChoice = sp.client[j].sharesTotal;
        sp.client[j].voted = true;
      }
    }

    info.executedTime = now;
    info.divOptExecuted = true;
    Announcement('Swift message: Dividend Option Executed');
  }

  function checkVotes() {
    if (divOpt.votingRightsUsed == divOpt.votingRightsMax) {
        info.locked = true;
    }
  }

  function submitVote(address _sp, uint _shareholderId, uint _dividend, uint _newShares) {
    // record customer in blockchain
    // Need to add logic to check if choice has already been recorded
    ServiceProviderModule sp = providerOf[_sp];
    ShareholderModule sh = sp.client[_shareholderId];
    if (!sh.active || sh.voted) {
      throw;
    }
    if (_dividend + _newShares != sh.sharesTotal) {
      throw;
    }
    sh.sharesChoice = _newShares;
    sh.dividendChoice = _dividend;
    sh.voted = true;
    sp.votingRightsUsed += sh.sharesTotal;
    // locking contract when max votes achieved
    checkVotes();
  }

//  function allowServiceProvider(address _sp, string _name, uint _votes) forCsd ifDivOptExecuted {
  function allowServiceProvider(address _sp, string _name, uint _votes) {
//    // CSD can allow a service provider to submit its customers votes
//    if(_votes > divOpt.votingRightsMax - divOpt.votingRightsUsed){
//      // throw in case you give more votes to the service provider than allowed
//      throw;
//    }
    // used to dynamically map index to structure in array of structs
    // to be refactored..
    uint len = serviceProvider.push(ServiceProviderModule(_name, _votes, 0, true, 0)) - 1;
    providerOf[_sp] = serviceProvider[len];
    numberOfServiceProviders += 1;
  }

  function allowShareholder(address _sp, string _shareholderName, uint _shares) {
    ServiceProviderModule sp = providerOf[_sp];
    sp.client[sp.numberOfClients] = ShareholderModule(_shareholderName, _shares, 0, 0, false, true);
    sp.numberOfClients += 1;
  }


  /*
   GETTERS
  */

  function getSecurityId() constant returns (string isin, string coaf, string choice, string info){
    return (securityId.isin, securityId.coaf, securityId.choice, securityId.information);
  }

  function getShareholder(address _sp, uint _shareholderId) constant returns (string name, uint sharesTotal, uint sharesChoice, uint divChoice, bool voted, bool active) {
    ShareholderModule shareholder = providerOf[_sp].client[_shareholderId];
    return (shareholder.name, shareholder.sharesTotal, shareholder.sharesChoice, shareholder.dividendChoice, shareholder.voted, shareholder.active);
  }

  function getProvider(address _sp) constant returns (string name, uint voteRightsMax, uint voteRightsUsed, bool active, uint numberOfClients) {
    return (providerOf[_sp].name, providerOf[_sp].votingRightsMax, providerOf[_sp].votingRightsUsed, providerOf[_sp].active, providerOf[_sp].numberOfClients);
  }

  function getProviderById(uint _id) constant returns (string name, uint voteRightsMax, uint voteRightsUsed, bool active, uint numberOfClients) {
    uint len = getNumberOfProviders();
    if (_id >= len) {
      throw;
    }
    return (serviceProvider[_id].name,
    serviceProvider[_id].votingRightsMax,
    serviceProvider[_id].votingRightsUsed,
    serviceProvider[_id].active,
    serviceProvider[_id].numberOfClients);
  }

  function getNumberOfProviders() constant returns (uint length) {
    return numberOfServiceProviders;
  }

  function getNumberOfShareholders(address _sp) constant returns (uint number) {
    return (providerOf[_sp].numberOfClients);
  }

  function getDividendOptionInfo() constant returns (uint divPerShare, uint divMult, uint minShares, uint holdShares, uint getShares){
    return(divOpt.dividendPerShare.number, divOpt.dividendPerShare.multiplicator, divOpt.minSharesForOption, divOpt.holdShares, divOpt.getShares);
  }

  function getInfo() constant returns (uint creaTime, uint announcedTime, uint executedTime, bool divOptAnnounced, bool divOptExecuted) {
    return(info.creaTime,info.announcedTime,
    info.executedTime,info.divOptAnnounced,
    info.divOptExecuted);
  }
}
