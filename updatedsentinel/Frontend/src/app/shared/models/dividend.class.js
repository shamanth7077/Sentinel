"use strict";
var Dividend = (function () {
    function Dividend(COAF, Choice, Information, ISIN, ExDate, RecordDate, minShares, divPerShare, divMult, holdShares, getShares, votesMax) {
        this.COAF = COAF;
        this.Choice = Choice;
        this.Information = Information;
        this.ISIN = ISIN;
        this.ExDate = ExDate;
        this.RecordDate = RecordDate;
        this.minShares = minShares;
        this.divPerShare = divPerShare;
        this.divMult = divMult;
        this.holdShares = holdShares;
        this.getShares = getShares;
        this.votesMax = votesMax;
    }
    return Dividend;
}());
exports.Dividend = Dividend;
//# sourceMappingURL=dividend.class.js.map