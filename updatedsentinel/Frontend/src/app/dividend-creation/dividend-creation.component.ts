import { Component } from '@angular/core';
import { IMyOptions} from 'mydatepicker';
import { Dividend } from '../shared/models/dividend.class';
import { MockDividend } from '../shared/data/mock_input';

@Component({
  selector: 'dividend-creation',
  templateUrl: './dividend-creation.component.html',
  styleUrls: ['./dividend-creation.component.css']
})
export class DividendCreationComponent {

  private dividend: Dividend;

  private myDatePickerOptions: IMyOptions = {
    dateFormat: 'yyyy-mm-dd',
    width: '100%',
    alignSelectorRight: true
  };

  constructor() {
      this.dividend = MockDividend.div;
  }
}
