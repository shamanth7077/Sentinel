import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StockSplitService } from '../services/stocksplit.service';
import {BeneficialOwner} from "../models/beneficial-owner.class";
import { MockStockSplit } from '../data/mock_input';

import { Status } from '../models/status.class';
@Component({
  selector: 'stocksplitform',
  templateUrl: './stocksplitform.component.html',
  styleUrls: ['./stocksplitform.component.css']
})
export class StockSplitComponent implements OnInit {

    @Input() type: string;
    @Input() users: any[];
    @Input() status2: Status;
    @Output() bo = new EventEmitter<BeneficialOwner>();
    private coaf: string;

    private user: string;

    constructor(private divService: StockSplitService) {
        this.users = [];
        this.coaf = this.divService.getCOAF();
        this.divService.coafObs.subscribe(
            res => this.coaf = res
        );
    }

    checkType() {
        switch (this.type) {
            case 'csd':
                this.user = 'Service Provider';
                break;
            case 'sp':
                this.user = 'Beneficial Owner';
                break;
            default:
                this.user = 'User';
        }
    }

    vote(user: BeneficialOwner) {
        this.bo.emit(user);
        alert('emitted');
    }

    ngOnInit() {
        this.checkType();
    }
}
