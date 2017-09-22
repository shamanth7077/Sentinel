import {Component, OnInit} from '@angular/core';
import { StockSplitService } from '../shared/services/stocksplit.service';
import {BeneficialOwner} from "../shared/models/beneficial-owner.class";
import {StockSplit} from "../shared/models/stocksplit.class";

@Component({
  selector: 'bo-creations',
  templateUrl: './bo-creations.component.html',
  styleUrls: ['./bo-creations.component.css']
})
export class BoCreationsComponent implements OnInit {
    private COAF: string;
    private stocksplit: StockSplit;
    private users: any[];
    private bo: BeneficialOwner;

    constructor(private StockService: StockSplitService) {
        this.COAF = this.StockService.getCOAF();
        this.stocksplit = this.StockService.getDiv();
        this.launchSubscriptions();
        this.users = [];
    }

    launchSubscriptions() {
        this.StockService.coafObs.subscribe(
            res => {
                this.COAF = res;
                this.getUsers();
            }
        );
        this.StockService.divObs.subscribe(
            res => {
                this.stocksplit = res;
                this.getUsers();
            }
        );
    }

    getUsers() {
      if(this.COAF){
        this.StockService.getShareholders(this.COAF)
            .subscribe(
                res => {
                    this.users = res.shareholders;
                    this.refresh();
                    console.log(res);
                },
                err => console.log(err)
            );
          }
    }

    refresh() {
        this.getUsers();
    }



    ngOnInit() {
        if (this.COAF) {
            this.getUsers();
        }
    }
}
