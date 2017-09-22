pragma solidity ^0.4.7;

contract StockSplitContract {

  //@version: 2.0

  /*
    VARIABLES
  */

  bool locked = false;

  uint numberOfServiceProviders = 0;
  uint numberofshareholders=0;
  uint splitratio=1;
  mapping(address => ServiceProviderModule) providerOf;
  mapping(uint=> ShareholderModule) shareholders;

  /*
    EVENTS
  */

  event Announcement(string _msg);

  /*
    MAPPINGS
  */

  mapping (string => address) accountOf;

  /*
    MODULES
  */
  struct ShareholderModule {
    string name;
    uint sharesTotal;
    uint splitshares;

    bool active;
  }
  struct ServiceProviderModule {
    string name;
    uint votingRightsMax;
    uint votingRightsUsed;
    bool active; // handy variable
    uint numberOfClients;
    mapping(uint => ShareholderModule) client;
  }
  ServiceProviderModule[] serviceProvider;
  struct InfoModule{
      // Possibility to add more info about creator
      uint creaTime;
      uint announcedTime;
      uint executedTime;
      uint acknowledgedTime;
      bool splitAnnounced;
      bool splitExecuted;
      bool splitAcknowledged;
      bool locked;
  }
  InfoModule infoModule;
  struct SecurityIdModule{
    string isin;
    string coaf;
    string choice;
    string information;

  }
  SecurityIdModule securityId;

  struct StockSplitModule{

     uint splitratio;
   }

   StockSplitModule stockSplit;

  /*
    CONSTRUCTOR
  */

  function StockSplitContract(address _csd,string _securityIsin, string _securityCoaf, string _securityChoice, string _securityInfo){
      // The issuer creates the contract and provides csd address
      accountOf['issuer'] = msg.sender;
      accountOf['csd'] = _csd;
      infoModule.creaTime = now;
      infoModule.locked = false;
      initSplitOpt(_securityIsin, _securityCoaf, _securityChoice, _securityInfo);
 }

  /*
   MODIFIERS
  */

  modifier forIssuer {
    if(msg.sender != accountOf["issuer"])
      throw;
    _;
  }

  modifier forCsd {
    if(msg.sender != accountOf["csd"])
      throw;
    _;
  }

  modifier locker{
    if(locked)
      throw;
    _;
  }

  modifier ifSplitExecuted {
    if(infoModule.splitExecuted == false){
      throw;
    }
    _;
  }

  modifier ifSplitAnnounced {
    if(infoModule.splitAnnounced == false){
      throw;
    }
    _;
  }

  /*
   SETTERS
  */

  function announceSplit() forIssuer locker{
    // If needed can save a record.
    // But in the docs it's just preliminary informatio
    if(infoModule.splitAnnounced){
      throw;
    }
    Announcement('Swift message: Stock Split  Announced');
    infoModule.splitAnnounced = true;
    infoModule.announcedTime = now;

  }
  function initSplitOpt(string _securityIsin, string _securityCoaf, string _securityChoice,
  string _securityInfo){
    securityId.isin = _securityIsin;
    securityId.coaf = _securityCoaf;
    securityId.choice = _securityChoice;
    securityId.information = _securityInfo;
    Announcement('Swift message: Stock Split Deployed');
}

function updateSplit(uint _splitratio)  forIssuer ifSplitAnnounced
{

  stockSplit.splitratio=_splitratio;

}
  function executeSplit() forIssuer ifSplitAnnounced {

      if(infoModule.splitExecuted){
        throw;
      }

      infoModule.splitExecuted = true;
      infoModule.executedTime = now;
      splitratio=stockSplit.splitratio;
      Announcement('Swift message: Stock Split Executed');

  }

  function acknowledgeSplit(bool _auth) forCsd ifSplitExecuted locker{
    if(_auth){
      infoModule.splitAcknowledged = true;
      infoModule.acknowledgedTime = now;
      Announcement('Swift message: Stock Split Acknowledged by CSD');
    }
    else{
      infoModule.splitAcknowledged = false;
      infoModule.acknowledgedTime = now;
      Announcement('Swift message: Stock Split Acknowledgment Rejected by CSD');

    }
    locked = true;
    Announcement('INFO: Stock Split Contract Locked');

  }
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
    sp.client[sp.numberOfClients] = ShareholderModule(_shareholderName, _shares, _shares, true);
    sp.numberOfClients += 1;
  }
  function createBO(string _shareholderName, uint _shares)
  {
    shareholders[numberofshareholders].name=_shareholderName;
    shareholders[numberofshareholders].sharesTotal=_shares;
    shareholders[numberofshareholders].splitshares=_shares*stockSplit.splitratio;
    numberofshareholders+=1;
  }
  /*
   GETTERS
  */
  function getSecurityId() constant returns (string isin, string coaf, string choice, string info){
    return (securityId.isin, securityId.coaf, securityId.choice, securityId.information);
  }
  function getInfo() constant returns (uint, uint, uint, bool, bool) {
      return(infoModule.creaTime,infoModule.announcedTime,
          infoModule.executedTime,
          infoModule.splitAnnounced,
          infoModule.splitExecuted);
  }
  function getSplitInfo() constant returns (uint splitratio){
    return(stockSplit.splitratio);
  }

    function getShareholder(address _sp, uint _shareholderId) constant returns (string name, uint sharesTotal, uint splitshares,bool active) {
      ShareholderModule shareholder = providerOf[_sp].client[_shareholderId];
      return (shareholder.name, shareholder.sharesTotal, shareholder.splitshares *splitratio,shareholder.active);
    }
  function getNumberOfShareholders(address _sp) constant returns (uint number) {
    return (providerOf[_sp].numberOfClients);
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
}
