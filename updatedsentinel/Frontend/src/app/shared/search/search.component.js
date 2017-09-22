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
var dividend_service_1 = require("../services/dividend.service");
var mock_input_1 = require("../data/mock_input");
var mock_input_2 = require("../data/mock_input");
var user_service_1 = require("../services/user.service");
var stocksplit_service_1 = require("../services/stocksplit.service");
var SearchComponent = (function () {
    function SearchComponent(divService, userService, SplitService) {
        var _this = this;
        this.divService = divService;
        this.userService = userService;
        this.SplitService = SplitService;
        this.dividend = new core_1.EventEmitter();
        this.stocksplit = new core_1.EventEmitter();
        this.status = new core_1.EventEmitter();
        this.coaf = new core_1.EventEmitter();
        this.coaf2 = new core_1.EventEmitter();
        this.status2 = new core_1.EventEmitter();
        this.user = this.userService.getUser();
        this.userService.userObs.subscribe(function (res) { return _this.user = res; });
        this.dividend.emit(mock_input_1.MockDividend.div);
        this.stocksplit.emit(mock_input_2.MockStockSplit.stocksplit);
    }
    SearchComponent.prototype.getDiv = function (coaf) {
        var _this = this;
        if (coaf) {
            this.divService.getContractInfo(coaf)
                .subscribe(function (res) {
                _this.dividend.emit(res.dividend);
                _this.status.emit(res.status);
                _this.coaf.emit(coaf);
                _this.divService.setCOAF(coaf);
                console.log(res);
            }, function (err) {
                alert('No dividend contract with that reference found.');
                console.log(err);
            });
        }
    };
    SearchComponent.prototype.getstock = function (coaf) {
        var _this = this;
        if (coaf) {
            this.SplitService.getContractInfo(coaf)
                .subscribe(function (res) {
                _this.stocksplit.emit(res.stocksplit);
                _this.status2.emit(res.status);
                _this.coaf2.emit(coaf);
                _this.SplitService.setCOAF(coaf);
                console.log(res);
            }, function (err) {
                alert('No stock split contract with that reference found.');
                console.log(err);
            });
        }
    };
    return SearchComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SearchComponent.prototype, "dividend", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SearchComponent.prototype, "stocksplit", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SearchComponent.prototype, "status", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SearchComponent.prototype, "coaf", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SearchComponent.prototype, "coaf2", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SearchComponent.prototype, "status2", void 0);
SearchComponent = __decorate([
    core_1.Component({
        selector: 'search',
        templateUrl: './search.component.html',
        styleUrls: ['./search.component.css']
    }),
    __metadata("design:paramtypes", [dividend_service_1.DividendService,
        user_service_1.UserService, stocksplit_service_1.StockSplitService])
], SearchComponent);
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map