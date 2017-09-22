export class Dividend {
    constructor(
        public COAF: string,
        public Choice: string,
        public Information: string,
        public ISIN: string,
        public ExDate: Date,
        public RecordDate: Date,
        public minShares: number,
        public divPerShare: number,
        public divMult: number,
        public holdShares: number,
        public getShares: number,
        public votesMax: number) {}
}


