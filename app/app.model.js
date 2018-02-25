var Product = function (obj) {
    var self = this;

    if (!obj) {
        self.productName = "Some test data bought for test purchase at some meager amount";
        self.quantity =200000;
        self.rate = 12000;
        self.ratePer = '1000';
        self.amount = null;

    } else {
        self.productName = obj.productName;
        self.quantity = obj.quantity;
        self.rate = obj.rate;
        self.ratePer = obj.ratePer;
        self.amount = obj.amount;
    }
    return self;
}