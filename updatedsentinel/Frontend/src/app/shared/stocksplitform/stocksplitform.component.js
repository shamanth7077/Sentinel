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
var stocksplit_service_1 = require("../services/stocksplit.service");
var status_class_1 = require("../models/status.class");
var StockSplitComponent = (function () {
    function StockSplitComponent(divService) {
        var _this = this;
        this.divService = divService;
        this.bo = new core_1.EventEmitter();
        this.users = [];
        this.coaf = this.divService.getCOAF();
        this.divService.coafObs.subscribe(function (res) { return _this.coaf = res; });
    }
    StockSplitComponent.prototype.checkType = function () {
        switch (this.type) {
            case 'csd':
                this.user = 'Service Provider';
                break;
            case 'sp':
                this.user = 'Beneficial Owner';
                break;
            default:
                this.user = 'User';
        }
    };
    StockSplitComponent.prototype.vote = function (user) {
        this.bo.emit(user);
        alert('emitted');
    };
    StockSplitComponent.prototype.ngOnInit = function () {
        this.checkType();
    };
    return StockSplitComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], StockSplitComponent.prototype, "type", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], StockSplitComponent.prototype, "users", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", status_class_1.Status)
], StockSplitComponent.prototype, "status2", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], StockSplitComponent.prototype, "bo", void 0);
StockSplitComponent = __decorate([
    core_1.Component({
        selector: 'stocksplitform',
        templateUrl: './stocksplitform.component.html',
        styleUrls: ['./stocksplitform.component.css']
    }),
    __metadata("design:paramtypes", [stocksplit_service_1.StockSplitService])
], StockSplitComponent);
exports.StockSplitComponent = StockSplitComponent;
//# sourceMappingURL=stocksplitform.component.js.map