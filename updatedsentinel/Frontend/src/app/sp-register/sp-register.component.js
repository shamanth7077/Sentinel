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
var mock_input_1 = require("../shared/data/mock_input");
var dividend_service_1 = require("../shared/services/dividend.service");
var stocksplit_service_1 = require("../shared/services/stocksplit.service");
var mock_input_2 = require("../shared/data/mock_input");
var SpRegisterComponent = (function () {
    function SpRegisterComponent(divService, SplitService) {
        this.divService = divService;
        this.SplitService = SplitService;
        this.registered = false;
        this.registered2 = false;
        this.name = '';
        this.COAF = this.divService.getCOAF();
        this.dividend = this.divService.getDiv();
        this.users = [];
        this.status = mock_input_1.MockDividend.status;
        this.status2 = mock_input_2.MockStockSplit.status;
        this.COAF2 = this.SplitService.getCOAF();
        this.stocksplit = this.SplitService.getDiv();
        this.launchSubscriptions();
        this.checkRegistered();
    }
    SpRegisterComponent.prototype.launchSubscriptions = function () {
        var _this = this;
        this.divService.coafObs.subscribe(function (res) {
            _this.COAF = res;
            console.log(_this.COAF);
            _this.checkRegistered();
        });
        this.SplitService.coafObs.subscribe(function (res) {
            _this.COAF2 = res;
            _this.checkRegistered2();
        });
    };
    SpRegisterComponent.prototype.checkRegistered = function () {
        var _this = this;
        if (this.COAF) {
            this.divService.getMe(this.COAF).subscribe(function (res) {
                if (res.name !== '') {
                    console.log("Node registered to: " + res.name);
                    _this.name = res.name;
                    _this.registered = true;
                }
            });
        }
    };
    SpRegisterComponent.prototype.checkRegistered2 = function () {
        var _this = this;
        if (this.COAF2) {
            this.SplitService.getMe(this.COAF2).subscribe(function (res) {
                if (res.name !== '') {
                    console.log("Node registered to: " + res.name);
                    _this.name = res.name;
                    _this.registered2 = true;
                }
            });
        }
    };
    SpRegisterComponent.prototype.newStatus = function (status) {
        this.status = status;
    };
    SpRegisterComponent.prototype.newStatus2 = function (status) {
        this.status2 = status;
    };
    return SpRegisterComponent;
}());
SpRegisterComponent = __decorate([
    core_1.Component({
        selector: 'sp-creation',
        templateUrl: './sp-register.component.html',
        styleUrls: ['./sp-register.component.css']
    }),
    __metadata("design:paramtypes", [dividend_service_1.DividendService, stocksplit_service_1.StockSplitService])
], SpRegisterComponent);
exports.SpRegisterComponent = SpRegisterComponent;
//# sourceMappingURL=sp-register.component.js.map