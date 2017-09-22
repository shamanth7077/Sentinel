import { Component } from '@angular/core';
import { Dividend } from '../shared/models/dividend.class';
import { MockDividend } from '../shared/data/mock_input';
import {Status} from "../shared/models/status.class";
import {DividendService} from "../shared/services/dividend.service";
import {StockSplitService} from "../shared/services/stocksplit.service";
import { MockStockSplit } from '../shared/data/mock_input';
import { StockSplit } from '../shared/models/stocksplit.class';

@Component({
  selector: 'sp-creation',
  templateUrl: './sp-register.component.html',
  styleUrls: ['./sp-register.component.css']
})
export class SpRegisterComponent {

    private dividend: Dividend;
    private stocksplit:StockSplit;
    private COAF: string;
    private COAF2:string;
    private users: any[];
    private status2: Status;
    private status: Status;
    private registered = false;
    private registered2=false;
    private name = '';

    constructor(private divService: DividendService, private SplitService: StockSplitService) {
        this.COAF = this.divService.getCOAF();
        this.dividend = this.divService.getDiv();
        this.users = [];
        this.status = MockDividend.status;
        this.status2 = MockStockSplit.status;
        this.COAF2 = this.SplitService.getCOAF();
        this.stocksplit = this.SplitService.getDiv();
        this.launchSubscriptions();
        this.checkRegistered();
    }

    launchSubscriptions() {

        this.divService.coafObs.subscribe(res => {
            this.COAF = res;
            console.log(this.COAF);
            this.checkRegistered();
        });
        this.SplitService.coafObs.subscribe(res => {
            this.COAF2 = res;
            this.checkRegistered2();
        });

    }

    checkRegistered() {
        if(this.COAF){
        this.divService.getMe(this.COAF).subscribe(res => {
            if (res.name !== '') {
                console.log(`Node registered to: ${res.name}`);
                this.name = res.name;
                this.registered = true;
            }
        });
      }
    }
    checkRegistered2() {
           if(this.COAF2){
         this.SplitService.getMe(this.COAF2).subscribe(res => {
             if (res.name !==  '' ) {
                 console.log(`Node registered to: ${res.name}`);
                 this.name = res.name;
                 this.registered2 = true;
             }
        });
      }
    }

    newStatus(status: Status) {
        this.status = status;
    }
    newStatus2(status: Status) {
        this.status2 = status;
    }

    // newDiv(div: Dividend) {
    //     this.dividend = div;
    // }

    // newCoaf(COAF: string) {
    //     console.log(`Setting coaf to: ${COAF}`);
    //     this.getUsers(COAF);
    //     this.COAF = COAF;
    // }

    // getUsers(coaf: string) {
    //     this.divService.getProviders(coaf)
    //         .subscribe(
    //             res => {
    //                 this.users = res.providers;
    //                 const regIds = this.users.map(x => x.NodeId);
    //                 const nodes = [1, 2, 3, 4, 5, 6];
    //                 this.avNodes = nodes.filter(x => regIds.indexOf(x) < 0);
    //                 console.log(this.users);
    //                 console.log(this.avNodes);
    //             },
    //             err => console.log(err)
    //         );
    // }
}
