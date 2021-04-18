const router = require("express").Router();
const dbService = require("../db");
const db = new dbService();
const auth = require("../middleware/auth");
router.post("/", auth, async (req, res) => {
  db.openConnect();
  const order = await db.createOrder(req.body, req.user);
  db.closeConnect();
  if (order != false) {
    const success = order.affectedRows > 0 ? true : false;
    return res
      .status(200)
      .json({ success, orderId: success ? order.insertId : -1 });
  }
  res.status(400).json({ success: order, orderId: -1 });
});

module.exports = router;
