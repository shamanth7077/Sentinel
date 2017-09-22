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
var dividend_service_1 = require("../shared/services/dividend.service");
var stocksplit_service_1 = require("../shared/services/stocksplit.service");
var mock_input_1 = require("../shared/data/mock_input");
var mock_input_2 = require("../shared/data/mock_input");
var BoCreationComponent = (function () {
    function BoCreationComponent(divService, SplitService) {
        this.divService = divService;
        this.SplitService = SplitService;
        this.voting = false;
        this.COAF = this.divService.getCOAF();
        this.dividend = this.divService.getDiv();
        this.status = mock_input_2.MockDividend.status;
        this.status2 = mock_input_1.MockStockSplit.status;
        this.COAF2 = this.SplitService.getCOAF();
        this.stocksplit = this.SplitService.getDiv();
        this.launchSubscriptions();
        this.users = [];
    }
    BoCreationComponent.prototype.launchSubscriptions = function () {
        var _this = this;
        this.divService.coafObs.subscribe(function (res) {
            _this.COAF = res;
            _this.getUsers();
        });
        this.divService.divObs.subscribe(function (res) {
            _this.dividend = res;
            _this.getUsers();
        });
        this.SplitService.coafObs.subscribe(function (res) {
            _this.COAF2 = res;
        });
        this.SplitService.divObs.subscribe(function (res) {
            _this.stocksplit = res;
            _this.getUsers2();
        });
    };
    BoCreationComponent.prototype.getUsers = function () {
        var _this = this;
        if (this.COAF) {
            this.divService.getShareholders(this.COAF)
                .subscribe(function (res) {
                _this.users = res.shareholders;
                console.log(res);
            }, function (err) { return console.log(err); });
        }
    };
    BoCreationComponent.prototype.getUsers2 = function () {
        var _this = this;
        if (this.COAF2) {
            this.SplitService.getShareholders(this.COAF2)
                .subscribe(function (res) {
                _this.users = res.shareholders;
                console.log(res);
            }, function (err) { return console.log(err); });
        }
    };
    BoCreationComponent.prototype.refresh = function () {
        this.getUsers();
    };
    BoCreationComponent.prototype.setVoter = function (voter) {
        this.voting = true;
        this.bo = voter;
    };
    BoCreationComponent.prototype.setVoting = function (voting) {
        this.voting = voting;
    };
    BoCreationComponent.prototype.newStatus = function (status) {
        this.status = status;
    };
    BoCreationComponent.prototype.newStatus2 = function (status) {
        this.status2 = status;
    };
    BoCreationComponent.prototype.ngOnInit = function () {
        if (this.COAF) {
            this.getUsers();
        }
        else if (this.COAF2) {
            this.getUsers2();
        }
    };
    return BoCreationComponent;
}());
BoCreationComponent = __decorate([
    core_1.Component({
        selector: 'bo-creation',
        templateUrl: './bo-creation.component.html',
        styleUrls: ['./bo-creation.component.css']
    }),
    __metadata("design:paramtypes", [dividend_service_1.DividendService, stocksplit_service_1.StockSplitService])
], BoCreationComponent);
exports.BoCreationComponent = BoCreationComponent;
//# sourceMappingURL=bo-creation.component.js.map