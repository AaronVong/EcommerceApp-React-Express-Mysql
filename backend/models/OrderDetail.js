class OrderDetail {
  constructor(productId, orderId, price, number, worth) {
    this.product_id = productId;
    this.order_id = orderId;
    this.order_detail_originprice = price;
    this.order_detail_number = number;
    this.order_detail_worth = worth;
  }
}

module.exports = OrderDetail;
