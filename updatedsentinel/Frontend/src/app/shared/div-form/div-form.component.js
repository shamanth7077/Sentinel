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
var dividend_class_1 = require("../models/dividend.class");
var mock_input_1 = require("../data/mock_input");
var dividend_service_1 = require("../services/dividend.service");
var status_class_1 = require("../models/status.class");
var user_service_1 = require("../services/user.service");
var router_1 = require("@angular/router");
var DivFormComponent = (function () {
    function DivFormComponent(divService, router, userService) {
        var _this = this;
        this.divService = divService;
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
    DivFormComponent.prototype.checkType = function () {
        switch (this.type) {
            case 'create':
                this.disabled = false;
                this.basic_disabled = false;
                break;
            case 'update':
                this.disabled = this.status.divOptExecuted;
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
    DivFormComponent.prototype.reset = function () {
        this.coaf.emit(undefined);
        this.dividend = mock_input_1.MockDividend.div;
    };
    DivFormComponent.prototype.CreateDividend = function () {
        var _this = this;
        this.divService.CreateContract(this.dividend)
            .subscribe(function () {
            alert('successfully created dividend contract');
            _this.router.navigate(['/home']);
            _this.divService.refresh();
            // this.reset();
        }, function (err) {
            console.log(err);
            alert('error in creating the contract');
        });
    };
    DivFormComponent.prototype.UpdateDividend = function () {
        var _this = this;
        this.divService.UpdateContract(this.dividend)
            .subscribe(function () {
            alert('successfully updated dividend contract');
            _this.router.navigate(['/home']);
            _this.divService.refresh();
            // this.reset();
        }, function (err) {
            console.log(err);
            alert('error in updating the contract');
        });
    };
    DivFormComponent.prototype.Announce = function () {
        var _this = this;
        this.divService.AnnounceContract(this.dividend)
            .subscribe(function () {
            alert('successfully announced dividend contract');
            _this.router.navigate(['/home']);
            _this.divService.refresh();
            //  this.reset();
        }, function (err) {
            console.log(err);
            alert('error in announcing the contract');
        });
    };
    DivFormComponent.prototype.Execute = function () {
        var _this = this;
        this.divService.ExecuteContract(this.dividend)
            .subscribe(function () {
            alert('successfully created dividend contract');
            _this.router.navigate(['/home']);
            _this.divService.refresh();
            // this.reset();
        }, function (err) {
            console.log(err);
            alert('error in creating the contract');
        });
    };
    DivFormComponent.prototype.ngOnInit = function () {
        // this.type = (this.user === 0 && this.type !== 'create') ? 'update' : 'read';
        // this.type = (this.user !== 0 && this.type === 'create') ? 'read' : this.type;
        this.type = (this.user !== 0) ? 'read' : this.type;
        this.checkType();
    };
    return DivFormComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", dividend_class_1.Dividend)
], DivFormComponent.prototype, "dividend", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", status_class_1.Status)
], DivFormComponent.prototype, "status", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DivFormComponent.prototype, "type", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DivFormComponent.prototype, "coaf", void 0);
DivFormComponent = __decorate([
    core_1.Component({
        selector: 'div-form',
        templateUrl: './div-form.component.html',
        styleUrls: ['./div-form.component.css']
    }),
    __metadata("design:paramtypes", [dividend_service_1.DividendService,
        router_1.Router,
        user_service_1.UserService])
], DivFormComponent);
exports.DivFormComponent = DivFormComponent;
//# sourceMappingURL=div-form.component.js.map