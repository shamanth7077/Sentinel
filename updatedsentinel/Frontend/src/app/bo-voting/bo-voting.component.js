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
var beneficial_owner_class_1 = require("../shared/models/beneficial-owner.class");
var dividend_class_1 = require("../shared/models/dividend.class");
var dividend_service_1 = require("../shared/services/dividend.service");
var BoVotingComponent = (function () {
    function BoVotingComponent(divService) {
        this.divService = divService;
        this.voting = new core_1.EventEmitter();
        this.div = 1;
        this.sliderStep = 1;
        this.sliderMax = 1;
        this.newShares = 0;
        this.minShares = 0;
        this.default = false;
        this.slider = this.sliderMax;
    }
    BoVotingComponent.prototype.initSlider = function () {
        this.sliderStep = this.dividend.holdShares;
        this.sliderMax = this.bo.sharesTotal - (this.bo.sharesTotal % this.dividend.holdShares);
        this.slider = 0;
    };
    BoVotingComponent.prototype.initShares = function () {
        this.sharesTotal = this.bo.sharesTotal;
        this.minShares = this.dividend.minShares;
        this.newShares = 0;
        this.div = this.sharesTotal;
        this.default = (this.sharesTotal - this.dividend.minShares) < 0;
        this.bo.dividendChoice = this.bo.sharesTotal - this.slider;
    };
    BoVotingComponent.prototype.ngOnInit = function () {
        this.initSlider();
        this.initShares();
    };
    BoVotingComponent.prototype.onSliderChange = function () {
        this.updateSharesTotal(this.slider);
    };
    BoVotingComponent.prototype.updateSharesTotal = function (value) {
        this.bo.sharesChoice = value;
        this.bo.dividendChoice = this.bo.sharesTotal - value;
    };
    BoVotingComponent.prototype.setValues = function () {
        this.newShares = this.slider;
        this.div = this.sharesTotal - this.slider;
    };
    BoVotingComponent.prototype.submitBoVote = function () {
        var _this = this;
        this.divService.submitVote(this.bo)
            .subscribe(function () {
            alert('successfully submitted vote');
            _this.voting.emit(false);
            _this.divService.refresh();
        }, function (err) {
            console.log(err);
            alert('error in submit');
        });
    };
    return BoVotingComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", dividend_class_1.Dividend)
], BoVotingComponent.prototype, "dividend", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", beneficial_owner_class_1.BeneficialOwner)
], BoVotingComponent.prototype, "bo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], BoVotingComponent.prototype, "COAF", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], BoVotingComponent.prototype, "voting", void 0);
BoVotingComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'bo-voting',
        templateUrl: 'bo-voting.component.html',
        styleUrls: ['bo-voting.component.css']
    }),
    __metadata("design:paramtypes", [dividend_service_1.DividendService])
], BoVotingComponent);
exports.BoVotingComponent = BoVotingComponent;
//# sourceMappingURL=bo-voting.component.js.map