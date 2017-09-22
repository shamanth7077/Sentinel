import {Component, OnInit} from '@angular/core';
import { DividendService } from '../shared/services/dividend.service';
import {BeneficialOwner} from "../shared/models/beneficial-owner.class";
import {Dividend} from "../shared/models/dividend.class";
import {StockSplitService} from "../shared/services/stocksplit.service";
import { MockStockSplit } from '../shared/data/mock_input';
import { StockSplit } from '../shared/models/stocksplit.class';
import {Status} from "../shared/models/status.class";
import { MockDividend } from '../shared/data/mock_input';
@Component({
  selector: 'bo-creation',
  templateUrl: './bo-creation.component.html',
  styleUrls: ['./bo-creation.component.css']
})
export class BoCreationComponent implements OnInit {
    private COAF: string;
      private COAF2:string;
    private dividend: Dividend;
    private stocksplit:StockSplit;
    private status2: Status;
    private status: Status;
    private users: any[];
    private voting = false;
    private bo: BeneficialOwner;

    constructor(private divService: DividendService, private SplitService: StockSplitService) {
        this.COAF = this.divService.getCOAF();
        this.dividend = this.divService.getDiv();
        this.status = MockDividend.status;
        this.status2 = MockStockSplit.status;
        this.COAF2 = this.SplitService.getCOAF();
        this.stocksplit = this.SplitService.getDiv();
        this.launchSubscriptions();
        this.users = [];
    }

    launchSubscriptions() {
        this.divService.coafObs.subscribe(
            res => {
                this.COAF = res;
                this.getUsers();
            }
        );
        this.divService.divObs.subscribe(
            res => {
                this.dividend = res;
                this.getUsers();
            }
        );
        this.SplitService.coafObs.subscribe(res => {
            this.COAF2 = res;
        });
        this.SplitService.divObs.subscribe(
            res => {
                this.stocksplit = res;
                this.getUsers2();
            }
        );
    }

    getUsers() {
       if(this.COAF){
        this.divService.getShareholders(this.COAF)
            .subscribe(
                res => {
                    this.users = res.shareholders;
                    console.log(res);
                },
                err => console.log(err)
            );
          }
    }
    getUsers2() {
      if(this.COAF2){
        this.SplitService.getShareholders(this.COAF2)
            .subscribe(
                res => {
                    this.users = res.shareholders;
                    console.log(res);

                },
                err => console.log(err)
            );
          }
    }

    refresh() {
        this.getUsers();
    }

    setVoter(voter: BeneficialOwner) {
        this.voting = true;
        this.bo = voter;
    }

    setVoting(voting: boolean) {
        this.voting = voting;
    }
    newStatus(status: Status) {
        this.status = status;
    }
    newStatus2(status: Status) {
        this.status2 = status;
    }

    ngOnInit() {
        if (this.COAF) {
            this.getUsers();
        }
        else if (this.COAF2){
          this.getUsers2();
        }
    }
}
