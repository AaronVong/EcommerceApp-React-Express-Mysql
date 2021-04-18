const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
  // lấy token từ header
  const token = req.header("x-auth-token");
  // nếu token không có
  if (!token)
    return res.status(401).json({
      errors: [
        {
          msg: "Không tìm thấy token, xác minh thất bại",
          param: "token",
        },
      ],
      auth: false,
    });

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
    // lấy user từ token đã được xác minh
    req.user = decoded;
    next(); // tiếp tục thực hiện reqeust tiếp theo
  } catch (e) {
    res.status(400).json({
      errors: [
        {
          msg: "Token không hợp lệ",
          param: "token",
        },
      ],
      auth: false,
    });
  }
};
