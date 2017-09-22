"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var home_component_1 = require("./shared/home/home.component");
var dividend_creation_component_1 = require("./dividend-creation/dividend-creation.component");
var dividend_update_component_1 = require("./dividend-update/dividend-update.component");
var stocksplit_creation_component_1 = require("./stocksplit-creation/stocksplit-creation.component");
var stocksplit_update_component_1 = require("./stocksplit-update/stocksplit-update.component");
var sp_creation_component_1 = require("./sp-creation/sp-creation.component");
var bo_creation_component_1 = require("./bo-creation/bo-creation.component");
var bo_creations_component_1 = require("./bo-creationstocksplit/bo-creations.component");
var bo_voting_component_1 = require("./bo-voting/bo-voting.component");
var sp_register_component_1 = require("./sp-register/sp-register.component");
var routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'create/dividend-option', component: dividend_creation_component_1.DividendCreationComponent },
    { path: 'update/dividend-option', component: dividend_update_component_1.DividendUpdateComponent },
    { path: 'create/stocksplit', component: stocksplit_creation_component_1.StockSplitCreationComponent },
    { path: 'update/stocksplit', component: stocksplit_update_component_1.StockSplitUpdateComponent },
    { path: 'action/csd', component: sp_creation_component_1.SpCreationComponent },
    { path: 'action/sp', component: bo_creation_component_1.BoCreationComponent },
    { path: 'action/sps', component: bo_creations_component_1.BoCreationsComponent },
    { path: 'register/sp', component: sp_register_component_1.SpRegisterComponent },
    { path: 'action/bo', component: bo_voting_component_1.BoVotingComponent },
    { path: '**', component: home_component_1.HomeComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app.routes.js.map