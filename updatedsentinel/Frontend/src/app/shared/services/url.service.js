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
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/do");
var user_service_1 = require("./user.service");
var UrlService = (function () {
    function UrlService(userService) {
        var _this = this;
        this.userService = userService;
        this.url = 'http://localhost:8000';
        this.deploy = this.url + '/api/0/deploy_sol';
        this.node = +this.userService.getUser();
        this.userService.userObs.subscribe(function (user) { return _this.node = +user; }, function (err) { return console.log(err); });
    }
    UrlService.prototype.getInfo = function (COAF) {
        return this.url + '/api/' + this.node + '/' + COAF + '/get_info';
    };
    UrlService.prototype.getSecurityInfo = function (COAF) {
        return this.url + '/api/' + this.node + '/' + COAF + '/security_id';
    };
    UrlService.prototype.getMe = function (COAF) {
        return this.url + '/api/' + this.node + '/' + COAF + '/get_me';
    };
    UrlService.prototype.getProviders = function (COAF) {
        return this.url + '/api/' + this.node + '/' + COAF + '/get_providers';
    };
    UrlService.prototype.getShareholders = function (COAF) {
        return this.url + '/api/' + this.node + '/' + COAF + '/get_shareholders';
    };
    UrlService.prototype.announceContract = function (COAF) {
        return this.url + '/api/' + this.node + '/' + COAF + '/announce';
    };
    UrlService.prototype.updateContract = function (COAF) {
        return this.url + '/api/' + this.node + '/' + COAF + '/update';
    };
    UrlService.prototype.allowSP = function (COAF) {
        return this.url + '/api/' + this.node + '/' + COAF + '/allow_provider';
    };
    UrlService.prototype.allowBO = function (COAF) {
        return this.url + '/api/' + this.node + '/' + COAF + '/allow_shareholder';
    };
    UrlService.prototype.submitVote = function (COAF) {
        return this.url + '/api/' + this.node + '/' + COAF + '/submit_vote';
    };
    UrlService.prototype.executeContract = function (COAF) {
        return this.url + '/api/' + this.node + '/' + COAF + '/execute';
    };
    UrlService.prototype.executeContractsplit = function (COAF) {
        return this.url + '/api/' + this.node + '/' + COAF + '/executesplit';
    };
    UrlService.prototype.updateContractsplit = function (COAF) {
        return this.url + '/api/' + this.node + '/' + COAF + '/updatesplit';
    };
    UrlService.prototype.announceContractsplit = function (COAF) {
        return this.url + '/api/' + this.node + '/' + COAF + '/announcesplit';
    };
    UrlService.prototype.getInfosplit = function (COAF) {
        var get = this.url + '/api/' + this.node + '/' + COAF + '/get_infosplit';
        console.log(get);
        return get;
    };
    UrlService.prototype.getShareholderssplit = function (COAF) {
        return this.url + '/api/' + this.node + '/' + COAF + '/get_shareholdersplit';
    };
    return UrlService;
}());
UrlService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UrlService);
exports.UrlService = UrlService;
//# sourceMappingURL=url.service.js.map