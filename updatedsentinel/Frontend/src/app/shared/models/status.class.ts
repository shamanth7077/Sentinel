export class Status {
    constructor(
        public CreatedTime: Date,
        public AnnouncedTime: string,
        public ExecutedTime: string,
        public StockSplitExecuted:boolean,
        public StockSplitAnnounced:boolean,
        public divOptAnnounced: boolean,
        public divOptExecuted: boolean) {}
}
