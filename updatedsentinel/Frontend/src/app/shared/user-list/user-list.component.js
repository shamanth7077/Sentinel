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
var UserListComponent = (function () {
    function UserListComponent(divService) {
        var _this = this;
        this.divService = divService;
        this.bo = new core_1.EventEmitter();
        this.users = [];
        this.coaf = this.divService.getCOAF();
        this.divService.coafObs.subscribe(function (res) { return _this.coaf = res; });
    }
    UserListComponent.prototype.checkType = function () {
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
    UserListComponent.prototype.vote = function (user) {
        this.bo.emit(user);
    };
    UserListComponent.prototype.ngOnInit = function () {
        this.checkType();
    };
    return UserListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], UserListComponent.prototype, "type", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], UserListComponent.prototype, "users", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], UserListComponent.prototype, "bo", void 0);
UserListComponent = __decorate([
    core_1.Component({
        selector: 'user-list',
        templateUrl: './user-list.component.html',
        styleUrls: ['./user-list.component.css']
    }),
    __metadata("design:paramtypes", [dividend_service_1.DividendService])
], UserListComponent);
exports.UserListComponent = UserListComponent;
//# sourceMappingURL=user-list.component.js.map