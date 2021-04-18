const mysql = require("mysql");
const dotenv = require("dotenv");
const Order = require("./models/Order");
const OrderDetail = require("./models/OrderDetail");

dotenv.config();

class Db {
  constructor() {
    this.connection = null;
  }

  openConnect() {
    if (this.connection === null) {
      this.connection = this.getConnection();
      this.connection.connect((error) => {
        if (error) throw error;
        console.log("Database connection created!");
      });
    }
  }

  getConnection() {
    return mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  closeConnect() {
    try {
      this.connection.end((error) => {
        if (error) throw error;
        console.log("Database connection closed!");
      });
      this.connection = null;
    } catch (error) {
      return error;
    }
  }

  async executeQuery(query) {
    try {
      const response = await new Promise((resolve, reject) => {
        this.connection.query(query, (error, data) => {
          if (error) reject(error);
          resolve(data);
        });
      });
      return response;
    } catch (error) {
      return error.message;
    }
  }

  async executeQuery(query, params = []) {
    try {
      const response = await new Promise((resolve, reject) => {
        this.connection.query(query, params, (error, data) => {
          if (error) reject(error);
          resolve(data);
        });
      });
      return response;
    } catch (error) {
      return error.message;
    }
  }

  getAllProducts() {
    const query = "select * from tn_product";
    return this.executeQuery(query);
  }

  getProductsInRange(limit, offset) {
    const query = "select * from tn_product limit ? offset ?";
    return this.executeQuery(query, [limit, offset]);
  }

  getProductsByCat(cat = "") {
    const query =
      "select tn_product.*, category_name from tn_product left join tn_category on tn_product.category_id = tn_category.category_id where category_name like ?";
    return this.executeQuery(query, [cat]);
  }

  getProductById(id = "") {
    const query = "select * from tn_product where product_id = ?";
    return this.executeQuery(query, [id]);
  }

  getProductByName(name = "") {
    const query = "select * from tn_product where product_name like ?";
    return this.executeQuery(query, [`%${name}%`]);
  }

  getProductByCatInRange(cat, limit, offset) {
    const query =
      "select tn_product.*, category_name from tn_product left join tn_category on tn_product.category_id = tn_category.category_id where category_name like ? limit ? offset ?";
    return this.executeQuery(query, [cat, parseInt(limit), parseInt(offset)]);
  }

  getCategories() {
    const query = "select * from tn_category";
    return this.executeQuery(query);
  }

  findByEmail(email) {
    const query = "select * from tn_customer where customer_email like ?";
    return this.executeQuery(query, [email]);
  }
  login(email, password) {}

  regitser(user) {
    const query = "insert into tn_customer set ?";
    return this.executeQuery(query, user);
  }

  findById(id) {
    const query = "select * from tn_customer where customer_id = ?";
    return this.executeQuery(query, [id]);
  }

  async createOrder(info, user) {
    const worth = info["worth"];
    const cart = [...info["cart"]];
    const orderQuery = "insert into tn_order set ?";
    const orderDetailQuery = "insert into tn_order_detail set ?";
    const order = new Order(worth, user.customer_id, user.customer_address);
    let isOk = true;

    this.connection.beginTransaction((error) => {
      if (error) throw error;
      console.log("The transaction has been started!");
    });
    const orderResult = await this.executeQuery(orderQuery, order);
    if (orderResult.affectedRows > 0) {
      const orderId = orderResult.insertId;
      console.log("Order created with id: " + orderId);
      for (const item of cart) {
        let detailWorth = item.number * item.product_originprice;
        let detail = new OrderDetail(
          item.product_id,
          orderId,
          item.product_originprice,
          item.number,
          detailWorth
        );
        let detailResult = await this.executeQuery(orderDetailQuery, detail);
        if (detailResult.affectedRows <= 0) {
          this.connection.rollback((error) => {
            if (error) throw error;
            console.log("The transaction has been rollbacked!");
            isOk = false;
          });
        } else {
          console.log("Detail inserted for order with id: " + orderId);
        }
      }
    } else {
      this.connection.rollback((error) => {
        if (error) throw error;
        console.log("The transaction has been rollbacked!");
        isOk = false;
      });
    }

    if (!isOk) {
      return isOk;
    }
    this.connection.commit((error) => {
      if (error) throw error;
      console.log("The transaction has been commited and closed!");
    });
    return orderResult;
  }

  getUserOrders(userId) {
    const query =
      "select tn_order.*, product_name, product_thumb, order_detail_originprice, order_detail_number, order_detail_worth from tn_order join tn_order_detail on tn_order_detail.order_id = tn_order.order_id join tn_product on tn_product.product_id = tn_order_detail.product_id where tn_order.customer_id = ? order by tn_order.order_id DESC";
    return this.executeQuery(query, [userId]);
  }
}

module.exports = Db;
