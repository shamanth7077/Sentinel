import { Component } from '@angular/core';
import { IMyOptions} from 'mydatepicker';
import { StockSplit } from '../shared/models/stocksplit.class';
import { MockStockSplit } from '../shared/data/mock_input';

@Component({
  selector: 'stocksplit-creation',
  templateUrl: './stocksplit-creation.component.html',
  styleUrls: ['./stocksplit-creation.component.css']
})
export class StockSplitCreationComponent {

  private stocksplit: StockSplit;

  private myDatePickerOptions: IMyOptions = {
    dateFormat: 'yyyy-mm-dd',
    width: '100%',
    alignSelectorRight: true
  };

  constructor() {
      this.stocksplit = MockStockSplit.stocksplit;
  }
}
