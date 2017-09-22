/**
 * Created by joerijackers on 06/07/2017.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var url_service_1 = require("./url.service");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
var user_service_1 = require("./user.service");
var Subject_1 = require("rxjs/Subject");
var mock_input_1 = require("../data/mock_input");
var DividendService = (function () {
    function DividendService(http, UrlData, userService) {
        this.http = http;
        this.UrlData = UrlData;
        this.userService = userService;
        this.Url = this.UrlData;
        this.coafObs = new Subject_1.Subject();
        this.divObs = new Subject_1.Subject();
        this.setCOAF(undefined);
        this.setDiv(mock_input_1.MockDividend.div);
    }
    DividendService.prototype.refresh = function () {
        this.setCOAF(undefined);
        this.setCOAF(this.COAF);
    };
    DividendService.prototype.getCOAF = function () {
        return this.COAF;
    };
    DividendService.prototype.setCOAF = function (_COAF) {
        var _this = this;
        this.COAF = _COAF;
        this.coafObs.next(this.COAF);
        console.log('divService - COAF set to: ');
        console.log(this.COAF);
        if (this.COAF) {
            this.getContractInfo(this.COAF).subscribe(function (res) {
                _this.setDiv(res.dividend);
            });
        }
        else {
            this.setDiv(mock_input_1.MockDividend.div);
        }
    };
    DividendService.prototype.getDiv = function () {
        return this.dividend;
    };
    DividendService.prototype.setDiv = function (dividend) {
        this.dividend = dividend;
        this.divObs.next(dividend);
        console.log('divService - Dividend set to: ');
        console.log(this.dividend);
    };
    DividendService.prototype.CreateContract = function (dividend) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
            name: 'dividend',
            coaf: dividend.COAF,
            choice: dividend.Choice,
            information: dividend.Information,
            isin: dividend.ISIN
        };
        console.log(body);
        return this.http.post(this.Url.deploy, body, { headers: headers })
            .map(function (response) { return response; })
            .catch(function (err) { return Observable_1.Observable.throw(err); });
    };
    DividendService.prototype.AnnounceContract = function (dividend) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.UrlData.announceContract(dividend.COAF), {}, { headers: headers })
            .map(function (response) { return response; })
            .catch(function (err) { return Observable_1.Observable.throw(err); });
    };
    DividendService.prototype.UpdateContract = function (dividend) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
            minShares: dividend.minShares,
            divPerShare: dividend.divPerShare,
            divMult: 100,
            holdShares: dividend.holdShares,
            getShares: dividend.getShares,
            votesMax: 1000
        };
        console.log(body);
        return this.http.post(this.UrlData.updateContract(dividend.COAF), body, { headers: headers })
            .map(function (response) { return response; })
            .catch(function (err) { return Observable_1.Observable.throw(err); });
    };
    DividendService.prototype.ExecuteContract = function (dividend) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.UrlData.executeContract(dividend.COAF), {}, { headers: headers })
            .map(function (response) { return response; })
            .catch(function (err) { return Observable_1.Observable.throw(err); });
    };
    DividendService.prototype.allowSP = function (sp) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
            name: sp.name,
            votes: sp.votes
        };
        console.log(body);
        return this.http.post(this.UrlData.allowSP(sp.COAF), body, { headers: headers })
            .map(function (response) { return response; })
            .catch(function (err) { return Observable_1.Observable.throw(err); });
    };
    DividendService.prototype.allowBO = function (bo) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
            shareholderName: bo.name,
            shares: bo.sharesTotal
        };
        console.log(body);
        return this.http.post(this.UrlData.allowBO(this.COAF), body, { headers: headers })
            .map(function (response) { return response; })
            .catch(function (err) { return Observable_1.Observable.throw(err); });
    };
    DividendService.prototype.submitVote = function (bo) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
            shareholderId: bo.id,
            dividend: bo.dividendChoice,
            newShares: bo.sharesChoice
        };
        console.log(body);
        return this.http.post(this.UrlData.submitVote(this.COAF), body, { headers: headers })
            .map(function (response) { return response; })
            .catch(function (err) { return Observable_1.Observable.throw(err); });
    };
    DividendService.prototype.getContractInfo = function (coaf) {
        var node = this.userService.getUser();
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({ 'Content-Type': 'application/json' })
        });
        console.log("divService - Getting contract with coaf " + coaf + " from node " + node);
        return this.http.get(this.UrlData.getInfo(coaf), options)
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Observable_1.Observable.throw('Server error'); });
    };
    DividendService.prototype.getMe = function (coaf) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({ 'Content-Type': 'application/json' })
        });
        console.log("divService - Getting providers for contract with coaf " + coaf);
        return this.http.get(this.UrlData.getMe(coaf), options)
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Observable_1.Observable.throw('Server error'); });
    };
    DividendService.prototype.getProviders = function (coaf) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({ 'Content-Type': 'application/json' })
        });
        console.log("divService - Getting providers for contract with coaf " + coaf);
        return this.http.get(this.UrlData.getProviders(coaf), options)
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Observable_1.Observable.throw('Server error'); });
    };
    DividendService.prototype.getShareholders = function (coaf) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({ 'Content-Type': 'application/json' })
        });
        console.log("divService - Getting shareholders for contract with coaf " + coaf);
        return this.http.get(this.UrlData.getShareholders(coaf), options)
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Observable_1.Observable.throw('Server error'); });
    };
    return DividendService;
}());
DividendService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        url_service_1.UrlService,
        user_service_1.UserService])
], DividendService);
exports.DividendService = DividendService;
//# sourceMappingURL=dividend.service.js.map