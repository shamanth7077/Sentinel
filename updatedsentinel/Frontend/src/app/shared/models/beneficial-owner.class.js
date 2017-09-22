"use strict";
var BeneficialOwner = (function () {
    function BeneficialOwner(sp, id, name, sharesTotal, sharesChoice, sharesaftersplit, dividendChoice) {
        this.sp = sp;
        this.id = id;
        this.name = name;
        this.sharesTotal = sharesTotal;
        this.sharesChoice = sharesChoice;
        this.sharesaftersplit = sharesaftersplit;
        this.dividendChoice = dividendChoice;
    }
    return BeneficialOwner;
}());
exports.BeneficialOwner = BeneficialOwner;
//# sourceMappingURL=beneficial-owner.class.js.map