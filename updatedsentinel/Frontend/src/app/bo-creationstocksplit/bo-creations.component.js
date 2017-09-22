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
var stocksplit_service_1 = require("../shared/services/stocksplit.service");
var BoCreationsComponent = (function () {
    function BoCreationsComponent(StockService) {
        this.StockService = StockService;
        this.COAF = this.StockService.getCOAF();
        this.stocksplit = this.StockService.getDiv();
        this.launchSubscriptions();
        this.users = [];
    }
    BoCreationsComponent.prototype.launchSubscriptions = function () {
        var _this = this;
        this.StockService.coafObs.subscribe(function (res) {
            _this.COAF = res;
            _this.getUsers();
        });
        this.StockService.divObs.subscribe(function (res) {
            _this.stocksplit = res;
            _this.getUsers();
        });
    };
    BoCreationsComponent.prototype.getUsers = function () {
        var _this = this;
        if (this.COAF) {
            this.StockService.getShareholders(this.COAF)
                .subscribe(function (res) {
                _this.users = res.shareholders;
                _this.refresh();
                console.log(res);
            }, function (err) { return console.log(err); });
        }
    };
    BoCreationsComponent.prototype.refresh = function () {
        this.getUsers();
    };
    BoCreationsComponent.prototype.ngOnInit = function () {
        if (this.COAF) {
            this.getUsers();
        }
    };
    return BoCreationsComponent;
}());
BoCreationsComponent = __decorate([
    core_1.Component({
        selector: 'bo-creations',
        templateUrl: './bo-creations.component.html',
        styleUrls: ['./bo-creations.component.css']
    }),
    __metadata("design:paramtypes", [stocksplit_service_1.StockSplitService])
], BoCreationsComponent);
exports.BoCreationsComponent = BoCreationsComponent;
//# sourceMappingURL=bo-creations.component.js.map