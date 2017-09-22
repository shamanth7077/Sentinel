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
var user_service_1 = require("../services/user.service");
var router_1 = require("@angular/router");
var dividend_service_1 = require("../services/dividend.service");
var NavbarComponent = (function () {
    function NavbarComponent(users, divService, router) {
        var _this = this;
        this.users = users;
        this.divService = divService;
        this.router = router;
        this.user = '' + this.users.getUser();
        this.users.userObs.subscribe(function (res) {
            _this.user = '' + res;
            _this.router.navigate(['/home']);
        }, function (err) { return console.log('Error fetching changed user'); });
        this.COAF = this.divService.getCOAF();
        this.divService.coafObs.subscribe(function (res) {
            _this.COAF = res;
        });
    }
    NavbarComponent.prototype.switchUser = function () {
        this.users.setUser(+this.user);
    };
    NavbarComponent.prototype.clearCOAF = function () {
        this.divService.setCOAF(undefined);
        this.router.navigate(['/home']);
    };
    NavbarComponent.prototype.ngOnInit = function () {
        $('.ui.dropdown')
            .dropdown();
    };
    return NavbarComponent;
}());
NavbarComponent = __decorate([
    core_1.Component({
        selector: 'navbar',
        templateUrl: './navbar.component.html',
        styleUrls: ['./navbar.component.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        dividend_service_1.DividendService,
        router_1.Router])
], NavbarComponent);
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map