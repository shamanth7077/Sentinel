"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var mydatepicker_1 = require("mydatepicker");
var app_component_1 = require("./app.component");
var navbar_component_1 = require("./shared/navbar/navbar.component");
var home_component_1 = require("./shared/home/home.component");
var dividend_creation_component_1 = require("./dividend-creation/dividend-creation.component");
var dividend_update_component_1 = require("./dividend-update/dividend-update.component");
var stocksplit_creation_component_1 = require("./stocksplit-creation/stocksplit-creation.component");
var stocksplit_update_component_1 = require("./stocksplit-update/stocksplit-update.component");
var sp_creation_component_1 = require("./sp-creation/sp-creation.component");
var sp_register_component_1 = require("./sp-register/sp-register.component");
var bo_creation_component_1 = require("./bo-creation/bo-creation.component");
var bo_creations_component_1 = require("./bo-creationstocksplit/bo-creations.component");
var bo_voting_component_1 = require("./bo-voting/bo-voting.component");
var stocksplit_service_1 = require("./shared/services/stocksplit.service");
var url_service_1 = require("./shared/services/url.service");
var split_form_component_1 = require("./shared/split-form/split-form.component");
var primeng_1 = require("primeng/primeng");
var animations_1 = require("@angular/platform-browser/animations");
var dividend_service_1 = require("./shared/services/dividend.service");
var user_service_1 = require("./shared/services/user.service");
var search_component_1 = require("./shared/search/search.component");
var div_form_component_1 = require("./shared/div-form/div-form.component");
var stock_form_component_1 = require("./shared/stock-form/stock-form.component");
var user_form_component_1 = require("./shared/user-form/user-form.component");
var user_list_component_1 = require("./shared/user-list/user-list.component");
var stocksplitform_component_1 = require("./shared/stocksplitform/stocksplitform.component");
var app_routes_1 = require("./app.routes");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            http_1.JsonpModule,
            app_routes_1.AppRoutingModule,
            mydatepicker_1.MyDatePickerModule,
            primeng_1.CalendarModule,
            animations_1.BrowserAnimationsModule,
        ],
        declarations: [
            app_component_1.AppComponent,
            dividend_creation_component_1.DividendCreationComponent,
            dividend_update_component_1.DividendUpdateComponent,
            stocksplit_creation_component_1.StockSplitCreationComponent,
            stocksplit_update_component_1.StockSplitUpdateComponent,
            sp_creation_component_1.SpCreationComponent,
            sp_register_component_1.SpRegisterComponent,
            bo_creation_component_1.BoCreationComponent,
            bo_voting_component_1.BoVotingComponent,
            navbar_component_1.NavbarComponent,
            home_component_1.HomeComponent,
            search_component_1.SearchComponent,
            div_form_component_1.DivFormComponent,
            stock_form_component_1.stocksplitFormComponent,
            user_form_component_1.UserFormComponent,
            user_list_component_1.UserListComponent,
            stocksplitform_component_1.StockSplitComponent,
            bo_creations_component_1.BoCreationsComponent,
            split_form_component_1.splitFormComponent
        ],
        providers: [
            url_service_1.UrlService,
            user_service_1.UserService,
            dividend_service_1.DividendService,
            stocksplit_service_1.StockSplitService,
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map