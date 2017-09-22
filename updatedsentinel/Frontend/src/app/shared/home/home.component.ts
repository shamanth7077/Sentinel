import { Component } from '@angular/core';
import { Dividend } from '../models/dividend.class';
import { MockDividend } from '../data/mock_input';
import {Status} from "../models/status.class";
import {DividendService} from "../services/dividend.service";
import {StockSplitService} from "../services/stocksplit.service";
import { MockStockSplit } from '../data/mock_input';
import { StockSplit } from '../models/stocksplit.class';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private dividend: Dividend;
  private status: Status;
  private coaf: string;
  private stocksplit:StockSplit;
  private status2: Status;
  private coaf2: string;

  constructor(private divService: DividendService,private SplitService:StockSplitService) {
    this.SplitService.refresh();
      this.status = MockDividend.status;
      this.coaf = this.divService.getCOAF();
      this.dividend = this.divService.getDiv();
      this.status2 = MockStockSplit.status;
      this.coaf2 = this.SplitService.getCOAF();
      this.stocksplit = this.SplitService.getDiv();
      this.launchSubscriptions();
  }


  launchSubscriptions() {
      this.divService.coafObs.subscribe(res => this.coaf = res);
      this.divService.divObs.subscribe(res => this.dividend = res);
      this.SplitService.divObs.subscribe(res => this.stocksplit = res);
      this.SplitService.coafObs.subscribe(res => this.coaf2 = res);
  }

  // newDiv(div: Dividend) {
  //     this.dividend = div;
  // }

  newStatus(status: Status) {
      this.status = status;
  }
  newStatus2(status: Status) {
      this.status2 = status;
  }
}
