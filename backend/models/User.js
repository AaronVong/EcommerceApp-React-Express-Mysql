class User {
  constructor(name = "", email = "", address = "", phone = "", password = "") {
    this.customer_name = name;
    this.customer_email = email;
    this.customer_phone = phone;
    this.customer_address = address;
    this.customer_password = password;
  }
}

module.exports = User;
