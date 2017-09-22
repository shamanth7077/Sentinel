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
var StockSplit_class_1 = require("../models/StockSplit.class");
var mock_input_1 = require("../data/mock_input");
var stocksplit_service_1 = require("../services/stocksplit.service");
var status_class_1 = require("../models/status.class");
var user_service_1 = require("../services/user.service");
var router_1 = require("@angular/router");
var stocksplitFormComponent = (function () {
    function stocksplitFormComponent(stocksplitService, router, userService) {
        var _this = this;
        this.stocksplitService = stocksplitService;
        this.router = router;
        this.userService = userService;
        this.coaf = new core_1.EventEmitter();
        this.user = this.userService.getUser();
        this.userService.userObs.subscribe(function (res) {
            _this.user = res;
            _this.type = (_this.user !== 0) ? 'read' : _this.type;
            // this.type = (this.user === 0 && this.type !== 'create') ? 'update' : 'read';
            _this.checkType();
        });
    }
    stocksplitFormComponent.prototype.checkType = function () {
        switch (this.type) {
            case 'create':
                this.disabled = false;
                this.basic_disabled = false;
                break;
            case 'update':
                this.disabled = this.status2.StockSplitExecuted;
                this.basic_disabled = true;
                break;
            case 'read':
                this.disabled = true;
                this.basic_disabled = true;
                break;
            default:
                this.disabled = true;
                this.basic_disabled = true;
        }
    };
    stocksplitFormComponent.prototype.reset = function () {
        this.coaf.emit(undefined);
        this.stocksplit = mock_input_1.MockStockSplit.stocksplit;
    };
    stocksplitFormComponent.prototype.CreateStockSplit = function () {
        var _this = this;
        this.stocksplitService.CreateContract(this.stocksplit)
            .subscribe(function () {
            alert('successfully created StockSplit contract');
            _this.router.navigate(['/home']);
            // this.reset();
        }, function (err) {
            console.log(err);
            alert('error in creating the contract');
        });
    };
    stocksplitFormComponent.prototype.UpdateStockSplit = function () {
        var _this = this;
        this.stocksplitService.UpdateContract(this.stocksplit)
            .subscribe(function () {
            alert('successfully updated StockSplit contract');
            _this.stocksplitService.refresh();
        }, function (err) {
            console.log(err);
            alert('error in updating the contract');
        });
    };
    stocksplitFormComponent.prototype.Announce = function () {
        var _this = this;
        this.stocksplitService.AnnounceContract(this.stocksplit)
            .subscribe(function () {
            alert('successfully announced StockSplit contract');
            _this.stocksplitService.refresh();
        }, function (err) {
            console.log(err);
            alert('error in announcing the contract');
        });
    };
    stocksplitFormComponent.prototype.Execute = function () {
        var _this = this;
        this.stocksplitService.ExecuteContract(this.stocksplit)
            .subscribe(function () {
            alert('successfully executed StockSplit contract');
            _this.stocksplitService.refresh();
        }, function (err) {
            console.log(err);
            alert('error in creating the contract');
        });
    };
    stocksplitFormComponent.prototype.ngOnInit = function () {
        // this.type = (this.user === 0 && this.type !== 'create') ? 'update' : 'read';
        // this.type = (this.user !== 0 && this.type === 'create') ? 'read' : this.type;
        this.type = (this.user !== 0) ? 'read' : this.type;
        this.checkType();
    };
    return stocksplitFormComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", StockSplit_class_1.StockSplit)
], stocksplitFormComponent.prototype, "stocksplit", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", status_class_1.Status)
], stocksplitFormComponent.prototype, "status2", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], stocksplitFormComponent.prototype, "type", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], stocksplitFormComponent.prototype, "coaf", void 0);
stocksplitFormComponent = __decorate([
    core_1.Component({
        selector: 'stock-form',
        templateUrl: './stock-form.component.html',
        styleUrls: ['./stock-form.component.css']
    }),
    __metadata("design:paramtypes", [stocksplit_service_1.StockSplitService,
        router_1.Router,
        user_service_1.UserService])
], stocksplitFormComponent);
exports.stocksplitFormComponent = stocksplitFormComponent;
//# sourceMappingURL=stock-form.component.js.map