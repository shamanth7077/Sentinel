import { Component } from '@angular/core';
import { Dividend } from '../shared/models/dividend.class';
import { MockDividend } from '../shared/data/mock_input';
import { Status } from '../shared/models/status.class';

@Component({
  selector: 'dividend-update',
  templateUrl: './dividend-update.component.html',
  styleUrls: ['./dividend-update.component.css']
})
export class DividendUpdateComponent {

    private dividend: Dividend;
    private status: Status;
    private coaf: string;

    constructor() {
        this.coaf = undefined;
        this.dividend = MockDividend.div;
        this.status = MockDividend.status;
    }

    newDiv(div: Dividend) {
        this.dividend = div;
    }

    newCoaf(coaf: string) {
        this.coaf = coaf;
    }

    newStatus(status: Status) {
        this.status = status;
    }
}
