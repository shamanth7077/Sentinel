/**
 * Created by joerijackers on 07/07/2017.
 */
"use strict";
var dividend_class_1 = require("../models/dividend.class");
var service_provider_class_1 = require("../models/service-provider.class");
var beneficial_owner_class_1 = require("../models/beneficial-owner.class");
var status_class_1 = require("../models/status.class");
var stocksplit_class_1 = require("../models/stocksplit.class");
var MockDividend = (function () {
    function MockDividend() {
    }
    return MockDividend;
}());
MockDividend.div = new dividend_class_1.Dividend('', '', '', '', null, null, null, null, null, null, null, null);
MockDividend.status = new status_class_1.Status(null, null, null, false, false, false, false);
exports.MockDividend = MockDividend;
var MockStockSplit = (function () {
    function MockStockSplit() {
    }
    return MockStockSplit;
}());
MockStockSplit.stocksplit = new stocksplit_class_1.StockSplit('', '', '', '', null);
MockStockSplit.status = new status_class_1.Status(null, null, null, false, false, false, false);
exports.MockStockSplit = MockStockSplit;
var MockServiceProvider = (function () {
    function MockServiceProvider() {
    }
    return MockServiceProvider;
}());
MockServiceProvider.sp = new service_provider_class_1.ServiceProvider(null, '', null, '');
exports.MockServiceProvider = MockServiceProvider;
var MockBeneficialOwner = (function () {
    function MockBeneficialOwner() {
    }
    return MockBeneficialOwner;
}());
MockBeneficialOwner.bo = new beneficial_owner_class_1.BeneficialOwner(MockServiceProvider.sp, null, '', null, null, null, null);
exports.MockBeneficialOwner = MockBeneficialOwner;
//# sourceMappingURL=mock_input.js.map