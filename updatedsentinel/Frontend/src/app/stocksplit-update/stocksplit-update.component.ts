import { Component } from '@angular/core';
import { StockSplit } from '../shared/models/stocksplit.class';
import { MockStockSplit } from '../shared/data/mock_input';
import { Status } from '../shared/models/status.class';

@Component({
  selector: 'stocksplit-update',
  templateUrl: './stocksplit-update.component.html',
  styleUrls: ['./stocksplit-update.component.css']
})
export class StockSplitUpdateComponent {

    private stocksplit: StockSplit;
    private status: Status;
    private coaf: string;

    constructor() {
        this.coaf = undefined;
        this.stocksplit = MockStockSplit.stocksplit;
        this.status = MockStockSplit.status;
    }

    newSplit(div: StockSplit) {
        this.stocksplit = div;

    }

    newCoaf(coaf: string) {
        this.coaf = coaf;

    }

    newStatus(status: Status) {
        this.status = status;

    }
}
