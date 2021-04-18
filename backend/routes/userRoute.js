const router = require("express").Router();
const dbService = require("../db");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult, body } = require("express-validator");
const auth = require("../middleware/auth");
const db = new dbService();

router.post(
  "/login",
  [
    body("email")
      .isLength({ min: 10, max: 255 })
      .withMessage("Email phải có ít 10 ký tự và ít hơn 255 ký tự")
      .isEmail()
      .withMessage("Email không đúng định dạng"),
    body("password")
      .isLength({ min: 1, max: 255 })
      .withMessage("Mật khẩu phải có ít 10 ký tự và ít hơn 255 ký tự"),
  ],
  async (req, res) => {
    db.openConnect();
    const validate = validationResult(req);
    if (!validate.isEmpty()) {
      return res.status(400).json(validate);
    }
    const { email, password } = req.body;
    const user = await db.findByEmail(email);
    if (user.length === 0)
      return res.status(400).json({
        errors: [
          {
            msg: "Email không tồn tại",
            param: "email",
          },
        ],
        logged: false,
      });
    const isValided = await bcrypt.compare(
      password,
      user[0]["customer_password"]
    );
    if (!isValided) {
      return res.status(400).json({
        errors: [
          {
            msg: "Mật khẩu không đúng",
            param: "password",
          },
        ],
        logged: false,
      });
    }
    // const {
    //   customer_email: verifiedEmail,
    //   customer_address: verifiedAddress,
    //   customer_name: verifiedName,
    //   customer_phone: verifiedPhone,
    //   customer_id: verifiedId,
    // } = user[0];
    const verifiedUser = { ...user[0] };
    const token = jwt.sign(verifiedUser, process.env.ACCESS_SECRET_TOKEN);
    res.status(200).json({
      accessToken: token,
      logged: true,
      errors: [],
    });
    db.closeConnect();
  }
);
router.post(
  "/register",
  [
    body("email")
      .isLength({ min: 10, max: 255 })
      .withMessage("Email phải có ít 10 ký tự và ít hơn 255 ký tự")
      .isEmail()
      .withMessage("Email không đúng định dạng"),
    body("name")
      .isLength({ min: 10, max: 255 })
      .withMessage("Tên phải có ít 10 ký tự và ít hơn 255 ký tự"),
    body("phone")
      .isLength({ min: 10, max: 10 })
      .withMessage("Số điện thoại không hợp lệ")
      .isNumeric()
      .withMessage("Số điện thoại không đúng định dạng"),
    body("address")
      .isLength({ min: 1, max: 255 })
      .withMessage("Địa chỉ phải có ít 10 ký tự và ít hơn 255 ký tự"),
    body("password")
      .isLength({ min: 1, max: 255 })
      .withMessage("Mật khẩu phải có ít 10 ký tự và ít hơn 255 ký tự"),
  ],
  async (req, res) => {
    db.openConnect();
    // validation
    const validate = validationResult(req);
    if (!validate.isEmpty()) return res.status(400).json(validate);
    const user = await db.findByEmail(req.body.email);
    if (user.length > 0) {
      return res.status(400).json({
        errors: [{ msg: "Email không khả dụng", param: "email" }],
        success: false,
      });
    }
    // xử lý request
    const salt = await bcrypt.genSalt(10);
    const { name, address, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const response = await db.regitser(
      new User(name, email, address, phone, hashedPassword)
    );
    res.send({ errors: [], success: true, id: response.insertId });
    db.closeConnect();
  }
);

router.get("/", auth, async (req, res) => {
  db.openConnect();
  try {
    const user = await db.findById(req.user["customer_id"]);
    if (!user) throw Error("User does not exist");
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
  db.closeConnect();
});

router.get("/orders", auth, async (req, res) => {
  db.openConnect();
  try {
    const user = await db.findById(req.user["customer_id"]);
    if (!user) throw Error("User does not exist");
    const orders = await db.getUserOrders(user[0]["customer_id"]);
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ msg: e.message });
  }
  db.closeConnect();
});

module.exports = router;
