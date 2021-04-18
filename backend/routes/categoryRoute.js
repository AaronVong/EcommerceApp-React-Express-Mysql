const router = require("express").Router();
const dbService = require("../db");
const db = new dbService();

router.get("/", async (req, res) => {
  db.openConnect();
  const response = await db.getCategories();
  res.json({ data: response });
  db.closeConnect();
});

module.exports = router;
