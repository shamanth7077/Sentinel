/**
 * Created by joerijackers on 07/07/2017.
 */

import { Dividend } from '../models/dividend.class';
import { ServiceProvider } from '../models/service-provider.class';
import { BeneficialOwner } from '../models/beneficial-owner.class';
import { Status } from '../models/status.class';
import { StockSplit } from '../models/stocksplit.class';

export class MockDividend {
    static div = new Dividend('', '', '', '', null, null, null, null, null, null, null, null);
    static status = new Status(null, null, null,false,false, false, false);
}
export class MockStockSplit {
    static stocksplit = new StockSplit('', '', '','',null);
    static status = new Status(null, null, null,false,false, false, false);
}
export class MockServiceProvider {
    static sp = new ServiceProvider(null, '', null, '');
}

export class MockBeneficialOwner {
    static bo = new BeneficialOwner(MockServiceProvider.sp, null, '', null, null, null,null);
}
