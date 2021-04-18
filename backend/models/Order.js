class Order {
  constructor(worth, userId, address) {
    this.order_worth = worth;
    this.customer_id = userId;
    this.order_address = address;
  }
}

module.exports = Order;
