var Product = function (obj) {
    var self = this;

    if (!obj) {
        self.productName = null;
        self.quantity =null;
        self.quantityDesc = null;
        self.rate = null;
        self.amount = null;

    } else {
        self.productName = obj.productName;
        self.quantity = obj.quantity;
        self.quantityDesc = obj.quantityDesc;
        self.rate = obj.rate;
        self.amount = obj.amount;
    }
    return self;
}