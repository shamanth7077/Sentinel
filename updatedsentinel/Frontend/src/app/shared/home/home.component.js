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
var mock_input_1 = require("../data/mock_input");
var dividend_service_1 = require("../services/dividend.service");
var stocksplit_service_1 = require("../services/stocksplit.service");
var mock_input_2 = require("../data/mock_input");
var HomeComponent = (function () {
    function HomeComponent(divService, SplitService) {
        this.divService = divService;
        this.SplitService = SplitService;
        this.SplitService.refresh();
        this.status = mock_input_1.MockDividend.status;
        this.coaf = this.divService.getCOAF();
        this.dividend = this.divService.getDiv();
        this.status2 = mock_input_2.MockStockSplit.status;
        this.coaf2 = this.SplitService.getCOAF();
        this.stocksplit = this.SplitService.getDiv();
        this.launchSubscriptions();
    }
    HomeComponent.prototype.launchSubscriptions = function () {
        var _this = this;
        this.divService.coafObs.subscribe(function (res) { return _this.coaf = res; });
        this.divService.divObs.subscribe(function (res) { return _this.dividend = res; });
        this.SplitService.divObs.subscribe(function (res) { return _this.stocksplit = res; });
        this.SplitService.coafObs.subscribe(function (res) { return _this.coaf2 = res; });
    };
    // newDiv(div: Dividend) {
    //     this.dividend = div;
    // }
    HomeComponent.prototype.newStatus = function (status) {
        this.status = status;
    };
    HomeComponent.prototype.newStatus2 = function (status) {
        this.status2 = status;
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css']
    }),
    __metadata("design:paramtypes", [dividend_service_1.DividendService, stocksplit_service_1.StockSplitService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map