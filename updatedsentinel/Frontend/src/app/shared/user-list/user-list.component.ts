import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DividendService } from '../services/dividend.service';
import {BeneficialOwner} from "../models/beneficial-owner.class";

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    @Input() type: string;
    @Input() users: any[];
    @Output() bo = new EventEmitter<BeneficialOwner>();
    private coaf: string;

    private user: string;

    constructor(private divService: DividendService) {
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
    }

    ngOnInit() {
        this.checkType();
    }
}
