/**
 * Created by joerijackers on 02/07/2017.
 */
const express = require('express');
const router  = express.Router();
const log4js  = require('log4js');
var splitratio;
const logger = log4js.getLogger('routes');
const user   = require('./user');
const Web3Q  = require('./web3q-essentials.js'); // we import the web3q-essentials, that allows to talk with the blockchain at low level (normally we have to import it in light api but we use it here for debugging)
const quorumApi   = require('./quorumjs-api-light').quorum();  // light api, which normally imports low level web3q
const coafMethods = require('./coaf');
const Nedb = require('nedb');
const nedb = new Nedb({filename: './DB/dates.db', autoload:true});
const nedbstock=new Nedb({filename: './DB/datesstock.db', autoload:true});
var temp;
var temp2;
const net = require('net'); // used if you want to do an ipc connection to blockchain. REMEMBER ! ipc connections are ASYNC
// let issuerNode = Web3Q.extend.RPC("http://localhost:22000/"); // this is how you connect to the blockchain through RPC
// let issuerNode = Web3Q.extendIPC('patht to geth.ipc', net) // this is how you connect ot the blockchain through IPC

function sendError(res, func, err) {
    logger.error(`Error in '${func}'`);
    logger.error(err);
    res.send(err);
    res.end();
}
function assigntemp(a){
  temp=a;
}
function assigntemp2(a){
  temp2=a;
}
// #### TEMPLATE OF THE API CALLS

//POST requests
router.post('/:issuer/deploy_sol', (req, res) => {
    /**
     * @param { number } req.body.issuer - issuer id
     * @param { string } req.body.contractName - abi of the contract
     * @param { string } req.body.coaf - coaf reference of the contract
     * @param { Array<String> } req.body.args - array of arguments to be passed in the constructor
     */

    const issuer = req.params.issuer;

    const coaf = req.body.coaf;
    const isin = req.body.isin;
    const choice = req.body.choice || '';
    const info = req.body.information || '';
    const name = req.body.name;


    const issuerNode = Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(issuer)}/`); // creating an rpc connection with the node
    const csdAddress = issuerNode.eth.accounts[0];
    user.save('csd', csdAddress)
        .then(() => {
            const args = [
              csdAddress,
                isin,
                coaf,
                choice,
                info
            ];
            logger.info(`Deploying contract with coaf ${coaf} with args: ${args}`);
            quorumApi.deploy_sol(issuerNode, name, args)
                .then((contract) => {
                    coafMethods.save_coaf(coaf, contract.abi, contract.address);
                    res.send(contract);
                    res.end();
                })
                .catch((err) => {
                    res.status(500).send(err)
                });
        })
        .catch(err => sendError(res, 'deploy-sol', err));
});

router.post('/:issuer/:coaf/announce', (req, res) => {
    const issuer = req.params.issuer;
    const func   = 'announceDivOpt';
    const _coaf   = req.params.coaf;
    const args   = req.body.args || [];

    const issuerNode = Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(issuer)}/`); // creating an rpc connection with the node

    logger.info(`Announcing new dividend option for coaf ${_coaf} through issuer ${issuer}`);
    var currentdate = new Date();
    var datetime =   currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
                const data = {
                    coaf: _coaf,
                    date: datetime,
                    type:"announced"
                };
                temp=datetime;
                nedb.insert(data, (err, res) => {
                    if (err) {
                        logger.error('Error inserting date into DB');

                    }
                    if (res) {
                        logger.info('got date from DB');

                    }
                });
    coafMethods.get_coaf_mapping(_coaf)
        .then(contract => {
            quorumApi.contract_set(issuerNode, contract[0].abi, contract[0].address, func, args)
                .then((_res) => {
                    res.send(JSON.stringify({
                        message: _res[0],
                        data: _res[1]
                    }));
                    res.end();
                })
                .catch((err) => {
                    logger.error(err);
                    res.status(500).send(err)
                })
        })

});

router.post('/:issuer/:coaf/update', (req, res) => {
    const issuer = req.params.issuer;
    const func   = 'updateDivOpt';
    const coaf   = req.params.coaf;
    const args = [
        req.body.minShares,
        req.body.divPerShare,
        req.body.divMult,
        req.body.holdShares,
        req.body.getShares,
        req.body.votesMax
    ];

    const issuerNode = Web3Q.extend.RPC(`http://localhost:${22000+parseInt(issuer)}/`); // creating an rpc connection with the node
    logger.info(`Updating new dividend option for coaf ${coaf} through issuer ${issuer}`);
    logger.info(`args: ${args}`);

    coafMethods.get_coaf_mapping(coaf)
        .then(contract =>{
            quorumApi.contract_set(issuerNode, contract[0].abi, contract[0].address, func, args)
                .then((_res)=>{
                    logger.info('Update successful');
                    res.send(JSON.stringify({
                        message: _res[0],
                        data: _res[1]
                    }));
                    res.end();
                })
                .catch((err) =>{
                    logger.error(err);
                    res.status(500).send(err)
                })
        })
});

router.post('/:issuer/:coaf/execute', (req, res) => {
    const issuer = req.params.issuer;
    const func   = 'executeDivOpt';
    const _coaf   = req.params.coaf;

    const issuerNode = Web3Q.extend.RPC(`http://localhost:${22000+parseInt(issuer)}/`);
    logger.info(`Executing new dividend option for coaf ${_coaf} through issuer ${issuer}`);
    var currentdate = new Date();
    var datetime =   currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
                const data = {
                    coaf: _coaf,
                    date: datetime,
                    type:"executed"
                };
                temp2=datetime;
                nedb.insert(data, (err, res) => {
                    if (err) {
                        logger.error('Error inserting date into DB');

                    }
                    if (res) {
                        logger.info('got date from DB');

                    }
                });
    coafMethods.get_coaf_mapping(_coaf)
        .then(contract =>{
            quorumApi.contract_set(issuerNode, contract[0].abi, contract[0].address, func, [])
                .then((_res)=>{
                    logger.info('Execute successful');
                    res.send(JSON.stringify({
                        message: _res[0],
                        data: _res[1]
                    }));
                    res.end();
                })
                .catch((err) =>{
                    logger.error(err);
                    res.status(500).send(err)
                })
        })

});

router.post('/:provider/:coaf/allow_provider', (req, res) => {
    const provider = req.params.provider;
    const coaf     = req.params.coaf;
    const providerName = req.body.name.toLowerCase();

    const providerNode= Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(provider)}/`); // creating an rpc connection with the node
    const providerAddress = providerNode.eth.accounts[0];
    logger.info(`Allowing provider ${providerName} @${providerAddress} for coaf ${coaf}`);

    coafMethods.get_coaf_mapping(coaf)
        .then(contract => {
            const func = 'allowServiceProvider';
            const args = [
                providerAddress,
                providerName,
                req.body.votes
            ];
            logger.info(`Using args: ${args}`);
            quorumApi.contract_set(providerNode, contract[0].abi, contract[0].address, func, args)
                .then((_res) => {
                    logger.info("Allow provider successful");
                    user.save(providerName, providerAddress)
                        .then(() => {
                            res.send(JSON.stringify({
                                message: _res[0],
                                data: _res[1]
                            }));
                            res.end();
                        })
                        .catch((err) => {
                            sendError(res, func, err);
                        });
                })
                .catch((err) => {
                    sendError(res, 'allow_provider', err);
                })
        })
});

router.post('/:provider/:coaf/allow_shareholder', (req, res) => {
    const provider = req.params.provider;
    const coaf     = req.params.coaf;
    const func     = 'allowShareholder';

    const providerNode = Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(provider)}/`); // creating an rpc connection with the node
    const providerAddress = providerNode.eth.accounts[0];
    logger.info(`Allowing provider for coaf ${coaf} through provider node ${provider}`);

    // Only execute contract functions when fetching of the parameters is complete
    coafMethods.get_coaf_mapping(coaf)
        .then((contract) => {
            const args = [
                providerAddress,
                req.body.shareholderName,
                req.body.shares
            ];
            logger.info(`Using args: ${args}`);
            quorumApi.contract_set(providerNode, contract[0].abi, contract[0].address, func, args)
                .then((_res) => {
                    logger.info("Allow shareholder successful");
                    res.send(JSON.stringify({
                        message: _res[0],
                        data: _res[1]
                    }));
                    res.end();
                })
        })
        .catch((err) => sendError(res, func, err));
});


router.post('/:provider/:coaf/submit_vote', (req, res) => {
    const provider = req.params.provider;
    const coaf   = req.params.coaf;
    const func = 'submitVote';

    const providerNode = Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(provider)}/`); // creating an rpc connection with the node
    const providerAddress = providerNode.eth.accounts[0];

    coafMethods.get_coaf_mapping(coaf)
        .then((contract) => {



          const args = [
                providerAddress,
                req.body.shareholderId,
                req.body.dividend,
                req.body.newShares
            ];
            logger.info(`Using args: ${args}`);
            quorumApi.contract_set(providerNode, contract[0].abi, contract[0].address, func, args)
                .then((_res) => {
                    logger.info("Vote successful");
                    res.send(JSON.stringify({
                        message: _res[0],
                        data: _res[1]
                    }));
                    res.end();
                })
        })
        .catch((err) => sendError(res, func, err));
});

// GET requests
router.get('/:issuer/:coaf/get_info', (req, res) => {
    const issuer = req.params.issuer;
    const _coaf   = req.params.coaf;
var x;
    const issuerNode = Web3Q.extend.RPC(`http://localhost:${22000+parseInt(issuer)}/`); // creating an rpc connection with the node

    coafMethods.get_coaf_mapping(_coaf)
        .then(contract => {
            const info    = quorumApi.contract_get(issuerNode, contract[0].abi, contract[0].address, 'getSecurityId', []);
            const status  = quorumApi.contract_get(issuerNode, contract[0].abi, contract[0].address, 'getInfo', []);
            const div_opt = quorumApi.contract_get(issuerNode, contract[0].abi, contract[0].address, 'getDividendOptionInfo', []);

            var resultObj = {
                dividend: {
                    ISIN:        info[0],
                    COAF:        info[1],
                    Choice:      info[2].toUpperCase(),
                    Information: info[3].toUpperCase(),
                    divPerShare: div_opt[0],
                    divMult:     div_opt[1],
                    minShares:   div_opt[2],
                    holdShares:  div_opt[3],
                    getShares:   div_opt[4],
                },
                status: {
                    createdTime:     status[0],
                    announcedTime:   status[1],
                    executedTime:    status[2],
                    divOptAnnounced: status[3],
                    divOptExecuted:  status[4],
                }
            };
            nedb.find({coaf: _coaf,type:"announced"},function(err,docs){

              if (err || docs.length === 0) {
                  logger.error('Error date');

              }
              if (docs) {
                  logger.info('Retrieved date');
                  if(docs[0]){
                  assigntemp(docs[0]['date']);
                }

              }
            })
                console.log("TEMP:"+temp);
                resultObj.status.announcedTime=temp;
            nedb.find({coaf: _coaf,type:"executed"},function(err,docs){

              if (err || docs.length === 0) {
                  logger.error('Error date');

              }
              if (docs) {
                  logger.info('Retrieved date');
                  if(docs[0]){
                  assigntemp2(docs[0]['date']);
                }

              }
            })
                resultObj.status.executedTime=temp2;



              res.send(JSON.stringify(resultObj));
              res.end();


        }).catch((err) => {
                  res.status(500).send(err)
              });


});

router.get('/:caller/:coaf/get_me', (req, res) => {
    const func   = 'getProvider';
    const caller = req.params.caller;
    const coaf   = req.params.coaf;

    const callerNode = Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(caller)}/`); // creating an rpc connection with the node
    const callerAddress = callerNode.eth.accounts[0];

    coafMethods.get_coaf_mapping(coaf)
        .then((contract) => {
            const args = [
                callerAddress
            ];
            logger.info(`Calling get_provider with args: ${args}`);
            const result   = quorumApi.contract_get(callerNode, contract[0].abi, contract[0].address, func, args);
            const resultObj = {
                name:             result[0],
                votingRightsMax:  result[1],
                votingRightsUsed: result[2],
                active:           result[3],
                numberOfClient:   result[4],
            };
            logger.info("done");
            res.send(JSON.stringify(resultObj));
            res.end();
        })
        .catch(err => sendError(res, func, err));
});

router.get('/:caller/:coaf/get_provider', (req, res) => {
    const func   = 'getProvider';
    const caller = req.params.caller;
    const coaf   = req.params.coaf;
    const provider = req.query.provider;

    const callerNode = Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(caller)}/`); // creating an rpc connection with the node

    getUserAndContract(provider, coaf)
        .then((results) => {
            const provider = results[0];
            const contract = results[1];
            const args = [
                provider.address
            ];
            logger.info(`Calling get_provider with args: ${args}`);
            const result   = quorumApi.contract_get(callerNode, contract[0].abi, contract[0].address, func, args);
            const resultObj = {
                name:             result[0],
                votingRightsMax:  result[1],
                votingRightsUsed: result[2],
                active:           result[3],
                numberOfClient:   result[4],
            };
            logger.info("successfull");
            res.send(JSON.stringify(resultObj));
            res.end();
        })
        .catch(err => sendError(res, func, err));
});

router.get('/:caller/:coaf/get_number_of_providers', (req, res) => {
    const func   = 'getNumberOfProviders';
    const caller = req.params.caller;
    const coaf   = req.params.coaf;

    const callerNode = Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(caller)}/`); // creating an rpc connection with the node

    coafMethods.get_coaf_mapping(coaf)
        .then((contract) => {

            const args = [];
            logger.info(`Calling get_providers with args: ${args}`);
            const len = quorumApi.contract_get(callerNode, contract[0].abi, contract[0].address, 'getNumberOfProviders', []);
            res.send({length: len});
            res.end();
        })
        .catch(err => sendError(res, func, err));
});


router.get('/:caller/:coaf/get_providers', (req, res) => {
    const func   = 'getNumberOfProviders';
    const caller = req.params.caller;
    const coaf   = req.params.coaf;

    const callerNode = Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(caller)}/`); // creating an rpc connection with the node

    coafMethods.get_coaf_mapping(coaf)
        .then((contract) => {
  
            const args = [];
            logger.info(`Calling get_providers with args: ${args}`);
            const len = quorumApi.contract_get(callerNode, contract[0].abi, contract[0].address, 'getNumberOfProviders', []);
            const providers = [];
            for (let i = 0; i < len; i++) {
                const provider = quorumApi.contract_get(callerNode, contract[0].abi, contract[0].address, 'getProviderById', [i]);
                const providerObj = {
                    NodeId:           i + 1,
                    name:             provider[0],
                    votingRightsMax:  provider[1],
                    votingRightsUsed: provider[2],
                    active:           provider[3],
                    numberOfClient:   provider[4],
                };
                providers.push(providerObj);
            }
            res.send({providers: providers});
            res.end();
        })
        .catch(err => sendError(res, func, err));
});


router.get('/:caller/:coaf/get_provider_by_id', (req, res) => {
    const func   = 'getProviderById';
    const caller = req.params.caller;
    const coaf   = req.params.coaf;
    const id     = +req.query.id;

    const callerNode = Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(caller)}/`); // creating an rpc connection with the node

    coafMethods.get_coaf_mapping(coaf)
        .then((contract) => {
            const args = [
                id
            ];
            logger.info(`Calling get_provider_by_id with args: ${args}`);
            const result   = quorumApi.contract_get(callerNode, contract[0].abi, contract[0].address, func, args);
            const resultObj = {
                name:             result[0],
                votingRightsMax:  result[1],
                votingRightsUsed: result[2],
                active:           result[3],
                numberOfClient:   result[4],
            };
            res.send(JSON.stringify(resultObj));
            res.end();
        })
        .catch(err => sendError(res, func, err));
});


router.get('/:provider/:coaf/get_shareholder', (req, res) => {
    const func   = 'getShareholder';
    const coaf   = req.params.coaf;
    const provider = req.params.provider;

    const providerNode = Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(provider)}/`); // creating an rpc connection with the node
    const providerAddress = providerNode.eth.accounts[0];

    coafMethods.get_coaf_mapping(coaf)
        .then((contract) => {
            const args = [
                providerAddress,
                req.query.id
            ];
            logger.info(contract[0].address);
            logger.info(`Using args: ${args}`);
            const result   = quorumApi.contract_get(providerNode, contract[0].abi, contract[0].address, func, args);
            const resultObj = {
                name:           result[0],
                sharesTotal:    result[1],
                sharesChoice:   result[2],
                dividendChoice: result[3],
                voted:          result[4],
                active:         result[5],

            };
            res.send(JSON.stringify(resultObj));
            res.end();
        })
        .catch(err => sendError(res, func, err));
});

router.get('/:provider/:coaf/get_shareholders', (req, res) => {
    const provider = req.params.provider;
    const coaf     = req.params.coaf;

    const providerNode = Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(provider)}/`); // creating an rpc connection with the node
    const providerAddress = providerNode.eth.accounts[0];

    coafMethods.get_coaf_mapping(coaf)
        .then((contract) => {
            const args = [];
            logger.info(`Calling get_providers with args: ${args}`);
            const len = quorumApi.contract_get(providerNode, contract[0].abi, contract[0].address, 'getNumberOfShareholders', [providerAddress]);
            const shareholders = [];
            for (let i = 0; i < len; i++) {
                logger.info("entered here");
                const shareholder = quorumApi.contract_get(providerNode, contract[0].abi, contract[0].address, 'getShareholder', [providerAddress, i]);
                const shareholderObj = {
                    id:             i,
                    name:           shareholder[0],
                    sharesTotal:    shareholder[1],
                    sharesChoice:   shareholder[2],
                    dividendChoice: shareholder[3],
                    voted:          shareholder[4],
                    active:         shareholder[5]
                };
                shareholders.push(shareholderObj);
            }
            res.send({shareholders: shareholders});
            res.end();
        })
        .catch(err => sendError(res, func, err));
});


router.get('/:issuer/:coaf/:provider/get_option', (req, res) => {
    /**
     * Customer id is passed as query params ex. /api/1/coaf1234/kbc/get_option?customer=1
     */

    const issuer = req.params.issuer;
    const coaf = req.params.coaf;
    const customerId = +req.query.customer;
    const func = 'getOption';

    const issuerNode = Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(issuer)}/`); // creating an rpc connection with the node

    logger.info(`Getting option info for coaf ${coaf} through issuer ${issuer}`);

    getUserAndContract(req.params.provider, coaf)
        .then((results) => {
            const provider = results[0];
            const contract = results[1];
            const args = [
                provider.address,
                customerId
            ];
            logger.info(`args: ${args}`);
            logger.info(`tx: ${contract[0].address}`);
            const result = quorumApi.contract_get(issuerNode, contract[0].abi, contract[0].address, func, args);
            const resultObj = {
                option: result
            };
            res.send(JSON.stringify(resultObj));
            res.end();
        })
        .catch((err) => sendError(res, func, err));
});


module.exports = router;
//stocksplit functions
router.post('/:issuer/:coaf/announcesplit', (req, res) => {
    const issuer = req.params.issuer;
    const func   = 'announceSplit';
    const _coaf   = req.params.coaf;
    const args   = req.body.args || [];

    const issuerNode = Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(issuer)}/`); // creating an rpc connection with the node

    logger.info(`Announcing a new stocksplit for coaf ${_coaf} through issuer ${issuer}`);
    var currentdate = new Date();
    var datetime =   currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
                const data = {
                    coaf: _coaf,
                    date: datetime,
                    type:"announced"
                };
                temp=datetime;
                nedbstock.insert(data, (err, res) => {
                    if (err) {
                        logger.error('Error inserting date into DB');

                    }
                    if (res) {
                        logger.info('got date from DB');

                    }
                });
    coafMethods.get_coaf_mapping(_coaf)
        .then(contract => {
            quorumApi.contract_set(issuerNode, contract[0].abi, contract[0].address, func, args)
                .then((_res) => {
                    res.send(JSON.stringify({
                        message: _res[0],
                        data: _res[1]
                    }));
                    res.end();
                })
                .catch((err) => {
                    logger.error(err);
                    res.status(500).send(err)
                })
        })
});
router.post('/:issuer/:coaf/updatesplit', (req, res) => {
    const issuer = req.params.issuer;
    const func   = 'updateSplit';
    const coaf   = req.params.coaf;
    const args = [
        req.body.splitRatio
    ];
    splitratio=req.body.splitRatio;
    console.log(splitratio);
    const issuerNode = Web3Q.extend.RPC(`http://localhost:${22000+parseInt(issuer)}/`); // creating an rpc connection with the node
    logger.info(`Updating new stocksplit for coaf ${coaf} through issuer ${issuer}`);
    logger.info(`ar: ${args}`);

    coafMethods.get_coaf_mapping(coaf)
        .then(contract =>{
            quorumApi.contract_set(issuerNode, contract[0].abi, contract[0].address, func, args)
                .then((_res)=>{
                    logger.info('Update successful');
                    res.send(JSON.stringify({
                        message: _res[0],
                        data: _res[1]
                    }));
                    res.end();
                })
                .catch((err) =>{
                    logger.error(err);
                    res.status(500).send(err)
                })
        })
});
router.post('/:issuer/:coaf/executesplit', (req, res) => {
    const issuer = req.params.issuer;
    const func   = 'executeSplit';
    const _coaf   = req.params.coaf;

    const issuerNode = Web3Q.extend.RPC(`http://localhost:${22000+parseInt(issuer)}/`);
    logger.info(`Executing new split for coaf ${_coaf} through issuer ${issuer}`);
    var currentdate = new Date();
    var datetime =   currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
                const data = {
                    coaf: _coaf,
                    date: datetime,
                    type:"executed"
                };
                temp2=datetime;
                nedbstock.insert(data, (err, res) => {
                    if (err) {
                        logger.error('Error inserting date into DB');

                    }
                    if (res) {
                        logger.info('got date from DB');

                    }
                });
    coafMethods.get_coaf_mapping(_coaf)
        .then(contract =>{
            quorumApi.contract_set(issuerNode, contract[0].abi, contract[0].address, func, [])
                .then((_res)=>{
                    logger.info('Execute chcek  successful');
                    res.send(JSON.stringify({
                        message: _res[0],
                        data: _res[1]
                    }));
                    res.end();
                })
                .catch((err) =>{
                    logger.error(err);
                    res.status(500).send(err)
                })
        })
});
//STOCKSPLIT GETTERS


router.get('/:issuer/:coaf/get_infosplit', (req, res) => {
    const issuer = req.params.issuer;
    const _coaf   = req.params.coaf;

    const issuerNode = Web3Q.extend.RPC(`http://localhost:${22000+parseInt(issuer)}/`); // creating an rpc connection with the node
   logger.info("getting info")
    coafMethods.get_coaf_mapping(_coaf)
        .then(contract => {
            const info    = quorumApi.contract_get(issuerNode, contract[0].abi, contract[0].address, 'getSecurityId', []);
            const status  = quorumApi.contract_get(issuerNode, contract[0].abi, contract[0].address, 'getInfo', []);
            const split_opt = quorumApi.contract_get(issuerNode, contract[0].abi, contract[0].address, 'getSplitInfo', []);
            const resultObj = {
                stocksplit: {
                    ISIN:        info[0],
                    COAF:        info[1],
                    Choice:      info[2].toUpperCase(),
                    Information: info[3].toUpperCase(),
                    splitratio:  split_opt,
                },
                status: {
                    createdTime:     status[0],
                    announcedTime:   status[1],
                    executedTime:    status[2],
                    StockSplitAnnounced: status[3],
                    StockSplitExecuted:  status[4],
                }
            };
            nedbstock.find({coaf:_coaf,type:"announced"},function(err,docs){

              if (err || docs.length === 0) {
                  logger.error('Error date');

              }
              if (docs) {
                  logger.info('Retrieved date');
                  if(docs[0]){
                  assigntemp(docs[0]['date']);
                }

              }
            })
                console.log("TEMP:"+temp);
                resultObj.status.announcedTime=temp;
            nedbstock.find({coaf: _coaf,type:"executed"},function(err,docs){

              if (err || docs.length === 0) {
                  logger.error('Error date');

              }
              if (docs) {
                  logger.info('Retrieved date');
                  if(docs[0]){
                  assigntemp2(docs[0]['date']);
                }

              }
            })
                resultObj.status.executedTime=temp2;
            res.send(JSON.stringify(resultObj));
            res.end();
        })
        .catch((err) => {
                 logger.info(err);
                  res.status(500).send(err)

              });
});
router.get('/:provider/:coaf/get_shareholdersplit', (req, res) => {
    const provider = req.params.provider;
    const coaf     = req.params.coaf;

    const providerNode = Web3Q.extend.RPC(`http://localhost:${22000 + parseInt(provider)}/`); // creating an rpc connection with the node
    const providerAddress = providerNode.eth.accounts[0];

    coafMethods.get_coaf_mapping(coaf)
        .then((contract) => {
            const args = [];
            logger.info(`Calling get_providers with args: ${args}`);
            const len = quorumApi.contract_get(providerNode, contract[0].abi, contract[0].address, 'getNumberOfShareholders', [providerAddress]);
            const shareholders = [];
            logger.info(len);
            for (let i = 0; i < len; i++) {
                logger.info("entered here split");
                const shareholder = quorumApi.contract_get(providerNode, contract[0].abi, contract[0].address, 'getShareholder', [providerAddress, i]);
                const shareholderObj = {
                    id:             i,
                    name:           shareholder[0],
                    sharesTotal:    shareholder[1],
                    sharesaftersplit:   shareholder[2],
                    active:         shareholder[5]
                };
                shareholders.push(shareholderObj);
            }
            res.send({shareholders: shareholders});
            res.end();
        })
        .catch(err => sendError(res, func, err));
});
