import { Component, EventEmitter, Output } from '@angular/core';
import { DividendService } from '../services/dividend.service';
import { Dividend } from '../models/dividend.class';
import { MockDividend } from '../data/mock_input';
import { MockStockSplit } from '../data/mock_input';
import { Status } from '../models/status.class';
import {UserService} from "../services/user.service";
import { StockSplit } from '../models/stocksplit.class';
import { StockSplitService } from '../services/stocksplit.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

    @Output() dividend = new EventEmitter<Dividend>();
    @Output() stocksplit = new EventEmitter<StockSplit>();
    @Output() status = new EventEmitter<Status>();
    @Output() coaf = new EventEmitter<string>();
    @Output() coaf2 = new EventEmitter<string>();
    @Output() status2 = new EventEmitter<Status>();

    private user: number;

  constructor(private divService: DividendService,
              private userService: UserService, private SplitService:StockSplitService) {
      this.user = this.userService.getUser();
      this.userService.userObs.subscribe(res => this.user = res);
      this.dividend.emit(MockDividend.div);
      this.stocksplit.emit(MockStockSplit.stocksplit);
  }
  getDiv(coaf: string) {
    if(coaf){
      this.divService.getContractInfo(coaf)
          .subscribe(res => {
                  this.dividend.emit(res.dividend);
                  this.status.emit(res.status);
                  this.coaf.emit(coaf);
                  this.divService.setCOAF(coaf);

                   console.log(res);
              },
              err => {
                  alert('No dividend contract with that reference found.');
                  console.log(err);
              });
            }
  }
  getstock(coaf: string) {
      if(coaf){
      this.SplitService.getContractInfo(coaf)
          .subscribe(res => {
                  this.stocksplit.emit(res.stocksplit);
                  this.status2.emit(res.status);
                  this.coaf2.emit(coaf);
                  this.SplitService.setCOAF(coaf);
               console.log(res);
              },
              err => {
                  alert('No stock split contract with that reference found.');
                  console.log(err);
              });
      }
  }
}
