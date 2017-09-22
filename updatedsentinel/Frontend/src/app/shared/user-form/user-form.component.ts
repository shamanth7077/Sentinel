import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { DividendService } from '../services/dividend.service';
import { Router } from '@angular/router';
import { ServiceProvider } from '../models/service-provider.class';
import { BeneficialOwner } from '../models/beneficial-owner.class';
import { MockBeneficialOwner, MockServiceProvider } from '../data/mock_input';
import { Dividend } from '../models/dividend.class';
import { Status } from '../models/status.class';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

    @Input() dividend: Dividend;
    @Input() COAF: string;
    @Input() type: string;
      @Input() status: Status;
    @Output() refresh = new EventEmitter<boolean>();

    private user: string;
    private newSP: ServiceProvider;
    private newBO: BeneficialOwner;
    private create: any;

    constructor(private divService: DividendService,
                private router: Router) {
        this.initInput();
    }

    initInput() {
        this.newSP = MockServiceProvider.sp;
        this.newBO = MockBeneficialOwner.bo;
    }

    clearInput() {
        this.newSP.name = '';
        this.newSP.votes = null;
    }

    checkType() {
        switch (this.type) {
            case 'csd':
                this.user = 'Service Provider';
                this.create = this.createSP;
                break;
            case 'sp':
                this.user = 'Beneficial Owner';
                this.create = this.createBO;
                break;
            default:
                this.user = 'User';
        }
    }

    inputOK(inputs: any[]) {
        for (let input of inputs) {
            if (!input) {
                alert('Please fill in all the required fields');
                return false;
            }
        }
        return true;
    }

    createSP() {
        this.newSP.COAF = this.COAF;
        if (!this.inputOK([this.newSP.name, this.newSP.votes])) {
            return;
        }
        this.divService.allowSP(this.newSP)
            .subscribe(() => {
                alert('Successfully added SP to the Div contract');
                this.clearInput();
                this.router.navigate(['/home']);
                this.divService.refresh();
            },
            err => alert('Error adding SP to the Div contract')
            );
    }

    createBO() {
        // this.newBO.sp.name = 'joeri';
        this.newBO.sp.COAF = this.COAF;

        this.divService.allowBO(this.newBO)
            .subscribe(() => {
                    alert('Successfully added BO to the Div contract');
                    this.clearInput();
                      this.divService.refresh();
                },
                err => alert('Error adding BO to the Div contract')
            );
    }

    ngOnInit() {
        this.checkType();
    }
}
