import {Component, OnInit} from '@angular/core';
import {Dividend} from '../shared/models/dividend.class';
import {DividendService} from '../shared/services/dividend.service';
import {StockSplitService} from "../shared/services/stocksplit.service";
import { MockStockSplit } from '../shared/data/mock_input';
import { StockSplit } from '../shared/models/stocksplit.class';
import { MockDividend } from '../shared/data/mock_input';
import {Status} from "../shared/models/status.class";
@Component({
  selector: 'sp-creation',
  templateUrl: './sp-creation.component.html',
  styleUrls: ['./sp-creation.component.css']
})
export class SpCreationComponent implements OnInit {

    private dividend: Dividend;
    private stocksplit:StockSplit;
    private coaf: string;
    private coaf2:string;
    private users: any[];
    private status2: Status;
    private status: Status;


    constructor(private divService: DividendService,private SplitService: StockSplitService) {
        this.coaf = this.divService.getCOAF();
        this.dividend = this.divService.getDiv();
        this.status = MockDividend.status;
        this.status2 = MockStockSplit.status;
        this.coaf2 = this.SplitService.getCOAF();
        this.stocksplit = this.SplitService.getDiv();
          this.users = [];
        this.launchSubscriptions();


    }

    launchSubscriptions() {
        this.divService.coafObs.subscribe(
            res => {
                this.coaf = res;
                if(this.coaf){
                this.getUsers(res);}
            }
        );
        this.divService.divObs.subscribe(
            res => {
                this.dividend = res;
            }
        );
        this.SplitService.coafObs.subscribe(res => {
            this.coaf2 = res;
            if(this.coaf2){
            this.getUsers2(res);}
        });
        this.SplitService.divObs.subscribe(
            res => {
                this.stocksplit = res;

            }
        );
    }

    getUsers(coaf: string) {
      if(coaf){
        this.divService.getProviders(coaf)
            .subscribe(
                res => {
                    this.users = res.providers;
                    console.log(this.users);
                },
                err => console.log(err)
            );
          }
    }
    getUsers2(coaf: string) {
      if(coaf){
        this.SplitService.getProviders(coaf)
            .subscribe(
                res => {
                    this.users = res.providers;
                    console.log(this.users);
                },
                err => console.log(err)
            );
          }
    }

    ngOnInit() {
        if (this.coaf) {
            this.getUsers(this.coaf);
        }
        else if (this.coaf2){
          this.getUsers2(this.coaf2);
        }
    }
}
