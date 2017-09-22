import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BeneficialOwner} from "../shared/models/beneficial-owner.class";
import {Dividend} from "../shared/models/dividend.class";
import {DividendService} from "../shared/services/dividend.service";

@Component({
  moduleId: module.id,
  selector: 'bo-voting',
  templateUrl: 'bo-voting.component.html',
  styleUrls: ['bo-voting.component.css']
})
export class BoVotingComponent implements OnInit {

  @Input() dividend: Dividend;
  @Input() bo: BeneficialOwner;
  @Input() COAF: string;
  @Output() voting = new EventEmitter<boolean>();

  private sharesTotal: number;
  private div = 1;
  private sliderStep = 1;
  private sliderMax = 1;
  private newShares = 0;
  private minShares = 0;
  private default = false;
  private slider = this.sliderMax;

  constructor(private divService: DividendService) {}

  initSlider() {
    this.sliderStep = this.dividend.holdShares;
    this.sliderMax = this.bo.sharesTotal - (this.bo.sharesTotal % this.dividend.holdShares);
    this.slider = 0;
  }

  initShares() {
    this.sharesTotal = this.bo.sharesTotal;
    this.minShares = this.dividend.minShares;
    this.newShares = 0;
    this.div = this.sharesTotal;
    this.default = (this.sharesTotal - this.dividend.minShares) < 0;
    this.bo.dividendChoice = this.bo.sharesTotal - this.slider;
  }

  ngOnInit() {
    this.initSlider();
    this.initShares();
  }

  onSliderChange() {
      this.updateSharesTotal(this.slider);
  }

  updateSharesTotal(value: number): void {
    this.bo.sharesChoice = value;
    this.bo.dividendChoice = this.bo.sharesTotal - value;
  }

  setValues() {
    this.newShares = this.slider;
    this.div = this.sharesTotal - this.slider;
  }

  submitBoVote() {
      this.divService.submitVote(this.bo)
     .subscribe(
         () => {
         alert('successfully submitted vote');
         this.voting.emit(false);
           this.divService.refresh();
       },
       err => {
            console.log(err);
            alert('error in submit');
          }
     );
  }
}
