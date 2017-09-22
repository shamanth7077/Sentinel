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
var router_1 = require("@angular/router");
var mock_input_1 = require("../data/mock_input");
var stocksplit_class_1 = require("../models/stocksplit.class");
var status_class_1 = require("../models/status.class");
var splitFormComponent = (function () {
    function splitFormComponent(divService, router) {
        this.divService = divService;
        this.router = router;
        this.refresh = new core_1.EventEmitter();
        this.initInput();
    }
    splitFormComponent.prototype.initInput = function () {
        this.newSP = mock_input_1.MockServiceProvider.sp;
        this.newBO = mock_input_1.MockBeneficialOwner.bo;
    };
    splitFormComponent.prototype.clearInput = function () {
        this.newSP.name = '';
        this.newSP.votes = null;
    };
    splitFormComponent.prototype.checkType = function () {
        switch (this.type) {
            case 'csd':
                this.user = 'Service Provider';
                this.create = this.createSP;
                break;
            case 'sp':
                this.user = 'Beneficial Owner';
                this.create = this.createBO;
                break;
            default:
                this.user = 'User';
        }
    };
    splitFormComponent.prototype.inputOK = function (inputs) {
        for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
            var input = inputs_1[_i];
            if (!input) {
                alert('Please fill in all the required fields');
                return false;
            }
        }
        return true;
    };
    splitFormComponent.prototype.createSP = function () {
        var _this = this;
        this.newSP.COAF = this.COAF2;
        if (!this.inputOK([this.newSP.name, this.newSP.votes])) {
            return;
        }
        this.divService.allowSP(this.newSP)
            .subscribe(function () {
            alert('Successfully added SP to the Div contract');
            _this.clearInput();
            _this.router.navigate(['/home']);
            _this.refresh.emit(true);
            _this.divService.refresh();
        }, function (err) { return alert('Error adding SP to the Div contract'); });
    };
    splitFormComponent.prototype.createBO = function () {
        var _this = this;
        // this.newBO.sp.name = 'joeri';
        this.newBO.sp.COAF = this.COAF2;
        this.divService.allowBO(this.newBO)
            .subscribe(function () {
            alert('Successfully added BO to the Div contract');
            _this.clearInput();
            //  this.refresh.emit(true);
            _this.divService.refresh();
        }, function (err) { return alert('Error adding BO to the Div contract'); });
    };
    splitFormComponent.prototype.ngOnInit = function () {
        this.checkType();
    };
    return splitFormComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", stocksplit_class_1.StockSplit)
], splitFormComponent.prototype, "stocksplit", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], splitFormComponent.prototype, "COAF2", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], splitFormComponent.prototype, "type", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", status_class_1.Status)
], splitFormComponent.prototype, "status2", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], splitFormComponent.prototype, "refresh", void 0);
splitFormComponent = __decorate([
    core_1.Component({
        selector: 'split-form',
        templateUrl: './split-form.component.html',
        styleUrls: ['./split-form.component.css']
    }),
    __metadata("design:paramtypes", [stocksplit_service_1.StockSplitService,
        router_1.Router])
], splitFormComponent);
exports.splitFormComponent = splitFormComponent;
//# sourceMappingURL=split-form.component.js.map