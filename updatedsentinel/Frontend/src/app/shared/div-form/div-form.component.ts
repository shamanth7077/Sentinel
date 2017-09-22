import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dividend } from '../models/dividend.class';
import { MockDividend } from '../data/mock_input';
import { DividendService } from '../services/dividend.service';
import { Status } from '../models/status.class';
import { UserService } from '../services/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'div-form',
  templateUrl: './div-form.component.html',
  styleUrls: ['./div-form.component.css']
})
export class DivFormComponent implements OnInit {

    @Input() dividend: Dividend;
    @Input() status: Status;
    @Input() type: string;
    @Output() coaf = new EventEmitter<string>();
    private user: number;

    private disabled: boolean;
    private basic_disabled: boolean;

    constructor(private divService: DividendService,
                private router: Router,
                private userService: UserService) {
        this.user = this.userService.getUser();
        this.userService.userObs.subscribe(res => {
            this.user = res;
            this.type = (this.user !== 0) ? 'read' : this.type;
            // this.type = (this.user === 0 && this.type !== 'create') ? 'update' : 'read';
            this.checkType();
        });
    }

    checkType() {
        switch (this.type) {
            case 'create':
                this.disabled = false;
                this.basic_disabled = false;
                break;
            case 'update':
                this.disabled = this.status.divOptExecuted;
                this.basic_disabled = true;
                break;
            case 'read':
                this.disabled = true;
                this.basic_disabled = true;
                break;
            default:
                this.disabled = true;
                this.basic_disabled = true;
        }
    }

    reset() {
        this.coaf.emit(undefined);
        this.dividend = MockDividend.div;
    }

    CreateDividend() {
        this.divService.CreateContract(this.dividend)
            .subscribe(
                () => {
                    alert('successfully created dividend contract');
                    this.router.navigate(['/home']);
                    this.divService.refresh();
                    // this.reset();
                },
                err => {
                    console.log(err);
                    alert('error in creating the contract');
                }
            );
    }

    UpdateDividend() {
        this.divService.UpdateContract(this.dividend)
            .subscribe(
                () => {
                    alert('successfully updated dividend contract');
                    this.router.navigate(['/home']);
                    this.divService.refresh();
                    // this.reset();
                },
                err => {
                    console.log(err);
                    alert('error in updating the contract');
                }
            );
    }

    Announce() {
        this.divService.AnnounceContract(this.dividend)
            .subscribe(
                () => {
                    alert('successfully announced dividend contract');
                          this.router.navigate(['/home']);
                    this.divService.refresh();
                  //  this.reset();
                },
                err => {
                    console.log(err);
                    alert('error in announcing the contract');
                }
            );
    }

    Execute() {
        this.divService.ExecuteContract(this.dividend)
            .subscribe(
                () => {
                    alert('successfully created dividend contract');
                          this.router.navigate(['/home']);
                    this.divService.refresh();
                    // this.reset();
                },
                err => {
                    console.log(err);
                    alert('error in creating the contract');
                }
            );
    }

    ngOnInit() {
        // this.type = (this.user === 0 && this.type !== 'create') ? 'update' : 'read';
        // this.type = (this.user !== 0 && this.type === 'create') ? 'read' : this.type;
        this.type = (this.user !== 0) ? 'read' : this.type;
        this.checkType();
    }
}
