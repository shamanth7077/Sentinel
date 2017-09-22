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
var SpCreationComponent = (function () {
    function SpCreationComponent(divService, SplitService) {
        this.divService = divService;
        this.SplitService = SplitService;
        this.coaf = this.divService.getCOAF();
        this.dividend = this.divService.getDiv();
        this.status = mock_input_2.MockDividend.status;
        this.status2 = mock_input_1.MockStockSplit.status;
        this.coaf2 = this.SplitService.getCOAF();
        this.stocksplit = this.SplitService.getDiv();
        this.users = [];
        this.launchSubscriptions();
    }
    SpCreationComponent.prototype.launchSubscriptions = function () {
        var _this = this;
        this.divService.coafObs.subscribe(function (res) {
            _this.coaf = res;
            if (_this.coaf) {
                _this.getUsers(res);
            }
        });
        this.divService.divObs.subscribe(function (res) {
            _this.dividend = res;
        });
        this.SplitService.coafObs.subscribe(function (res) {
            _this.coaf2 = res;
            if (_this.coaf2) {
                _this.getUsers2(res);
            }
        });
        this.SplitService.divObs.subscribe(function (res) {
            _this.stocksplit = res;
        });
    };
    SpCreationComponent.prototype.getUsers = function (coaf) {
        var _this = this;
        if (coaf) {
            this.divService.getProviders(coaf)
                .subscribe(function (res) {
                _this.users = res.providers;
                console.log(_this.users);
            }, function (err) { return console.log(err); });
        }
    };
    SpCreationComponent.prototype.getUsers2 = function (coaf) {
        var _this = this;
        if (coaf) {
            this.SplitService.getProviders(coaf)
                .subscribe(function (res) {
                _this.users = res.providers;
                console.log(_this.users);
            }, function (err) { return console.log(err); });
        }
    };
    SpCreationComponent.prototype.ngOnInit = function () {
        if (this.coaf) {
            this.getUsers(this.coaf);
        }
        else if (this.coaf2) {
            this.getUsers2(this.coaf2);
        }
    };
    return SpCreationComponent;
}());
SpCreationComponent = __decorate([
    core_1.Component({
        selector: 'sp-creation',
        templateUrl: './sp-creation.component.html',
        styleUrls: ['./sp-creation.component.css']
    }),
    __metadata("design:paramtypes", [dividend_service_1.DividendService, stocksplit_service_1.StockSplitService])
], SpCreationComponent);
exports.SpCreationComponent = SpCreationComponent;
//# sourceMappingURL=sp-creation.component.js.map