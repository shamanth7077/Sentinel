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
var router_1 = require("@angular/router");
var mock_input_1 = require("../data/mock_input");
var dividend_class_1 = require("../models/dividend.class");
var status_class_1 = require("../models/status.class");
var UserFormComponent = (function () {
    function UserFormComponent(divService, router) {
        this.divService = divService;
        this.router = router;
        this.refresh = new core_1.EventEmitter();
        this.initInput();
    }
    UserFormComponent.prototype.initInput = function () {
        this.newSP = mock_input_1.MockServiceProvider.sp;
        this.newBO = mock_input_1.MockBeneficialOwner.bo;
    };
    UserFormComponent.prototype.clearInput = function () {
        this.newSP.name = '';
        this.newSP.votes = null;
    };
    UserFormComponent.prototype.checkType = function () {
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
    UserFormComponent.prototype.inputOK = function (inputs) {
        for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
            var input = inputs_1[_i];
            if (!input) {
                alert('Please fill in all the required fields');
                return false;
            }
        }
        return true;
    };
    UserFormComponent.prototype.createSP = function () {
        var _this = this;
        this.newSP.COAF = this.COAF;
        if (!this.inputOK([this.newSP.name, this.newSP.votes])) {
            return;
        }
        this.divService.allowSP(this.newSP)
            .subscribe(function () {
            alert('Successfully added SP to the Div contract');
            _this.clearInput();
            _this.router.navigate(['/home']);
            _this.divService.refresh();
        }, function (err) { return alert('Error adding SP to the Div contract'); });
    };
    UserFormComponent.prototype.createBO = function () {
        var _this = this;
        // this.newBO.sp.name = 'joeri';
        this.newBO.sp.COAF = this.COAF;
        this.divService.allowBO(this.newBO)
            .subscribe(function () {
            alert('Successfully added BO to the Div contract');
            _this.clearInput();
            _this.divService.refresh();
        }, function (err) { return alert('Error adding BO to the Div contract'); });
    };
    UserFormComponent.prototype.ngOnInit = function () {
        this.checkType();
    };
    return UserFormComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", dividend_class_1.Dividend)
], UserFormComponent.prototype, "dividend", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], UserFormComponent.prototype, "COAF", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], UserFormComponent.prototype, "type", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", status_class_1.Status)
], UserFormComponent.prototype, "status", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], UserFormComponent.prototype, "refresh", void 0);
UserFormComponent = __decorate([
    core_1.Component({
        selector: 'user-form',
        templateUrl: './user-form.component.html',
        styleUrls: ['./user-form.component.css']
    }),
    __metadata("design:paramtypes", [dividend_service_1.DividendService,
        router_1.Router])
], UserFormComponent);
exports.UserFormComponent = UserFormComponent;
//# sourceMappingURL=user-form.component.js.map