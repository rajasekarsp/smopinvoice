var Product = function (obj) {
    var self = this;

    if (!obj) {
        self.productName = null;
        self.quantity =null;
        self.rate = null;
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