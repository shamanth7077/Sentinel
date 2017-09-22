import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StockSplit } from '../models/StockSplit.class';
import { MockStockSplit } from '../data/mock_input';
import { StockSplitService } from '../services/stocksplit.service';
import { Status } from '../models/status.class';
import { UserService } from '../services/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class stocksplitFormComponent implements OnInit {

    @Input() stocksplit: StockSplit;
    @Input() status2: Status;
    @Input() type: string;
    @Output() coaf = new EventEmitter<string>();
    private user: number;

    private disabled: boolean;
    private basic_disabled: boolean;

    constructor(private stocksplitService: StockSplitService,
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
                this.disabled = this.status2.StockSplitExecuted;
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
        this.stocksplit = MockStockSplit.stocksplit;
    }

    CreateStockSplit() {
        this.stocksplitService.CreateContract(this.stocksplit)
            .subscribe(
                () => {
                    alert('successfully created StockSplit contract');
                    this.router.navigate(['/home']);
                    // this.reset();
                },
                err => {
                    console.log(err);
                    alert('error in creating the contract');
                }
            );
    }

    UpdateStockSplit() {
        this.stocksplitService.UpdateContract(this.stocksplit)
            .subscribe(
                () => {
                  
                    alert('successfully updated StockSplit contract');
                  this.stocksplitService.refresh();
                },
                err => {
                    console.log(err);
                    alert('error in updating the contract');
                }
            );
    }

    Announce() {
        this.stocksplitService.AnnounceContract(this.stocksplit)
            .subscribe(
                () => {
                    alert('successfully announced StockSplit contract');

                    this.stocksplitService.refresh();
                },
                err => {
                    console.log(err);
                    alert('error in announcing the contract');
                }
            );
    }

    Execute() {
        this.stocksplitService.ExecuteContract(this.stocksplit)
            .subscribe(
                () => {
                    alert('successfully executed StockSplit contract');
                    this.stocksplitService.refresh();
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
