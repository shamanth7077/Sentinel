const fs       = require("fs");
const express  = require('express');
const router   = express.Router();
const fakeData = require('./fakeData');

router.post("/api/issuer/deploy_sol", (req, res) => {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    let sampleFile = req.files.file;
    sampleFile.mv('File/' + req.files.file.name, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
    });

    fs.appendFile( "filename.json", req.body.contractName);
    fs.appendFile( "filename.json", req.body.coaf);
    fs.appendFile( "filename.json",  JSON.stringify(req.body.args) + '\n');
    res.send("successful");
    res.end();
});

router.get("/api/contract/get_info", (req, res) => {
    let result = {};
    for(let i = 0; i < fakeData.result.length; i++){
        if(fakeData.result[i].coaf === req.query.COAF){
            result = fakeData.result[i];
            break;
          }
     }
    res.json(result);
    res.end();
});


router.post("/api/issuer/update_contract", (req, res) => {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    let sampleFile = req.files.file;
    sampleFile.mv('File/' + req.files.file.name, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
    });
    //   fs.writeFile( "filename.json",  req.body.dividend, "utf8");
    fs.appendFile("filename.json", req.body.coaf);
    fs.appendFile("filename.json", JSON.parse(req.body.args) + '\n');
    res.send("successful");
});


router.post("/api/csd/allow_provider", (req, res) => {
    console.log(req);
    fs.appendFile("filename.json", JSON.stringify(req.body.providerId));
    fs.appendFile("filename.json", JSON.stringify(req.body.providerName));
    fs.appendFile("filename.json", JSON.stringify(req.body.votes) + '\n');
    res.send("successful");
    res.end();
});

router.post("/api/provider/allow_shareholder", (req, res) => {
    console.log(req);
    fs.appendFile("filename.json", JSON.stringify(req.body.providerId));
    fs.appendFile("filename.json", JSON.stringify(req.body.shareholderId));
    fs.appendFile("filename.json", JSON.stringify(req.body.shareholderName));
    fs.appendFile("filename.json", JSON.stringify(req.body.shares) + '\n');
    res.send("successful");
    res.end();
});

module.exports = router;