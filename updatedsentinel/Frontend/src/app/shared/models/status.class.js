"use strict";
var Status = (function () {
    function Status(CreatedTime, AnnouncedTime, ExecutedTime, StockSplitExecuted, StockSplitAnnounced, divOptAnnounced, divOptExecuted) {
        this.CreatedTime = CreatedTime;
        this.AnnouncedTime = AnnouncedTime;
        this.ExecutedTime = ExecutedTime;
        this.StockSplitExecuted = StockSplitExecuted;
        this.StockSplitAnnounced = StockSplitAnnounced;
        this.divOptAnnounced = divOptAnnounced;
        this.divOptExecuted = divOptExecuted;
    }
    return Status;
}());
exports.Status = Status;
//# sourceMappingURL=status.class.js.map