const router = require("express").Router();
const dbService = require("../db");
const db = new dbService();

router.get("/", async (req, res) => {
  db.openConnect();
  const response = await db.getAllProducts();
  res.json({ data: response });
  db.closeConnect();
});

router.get("/:limit-:offset", async (req, res) => {
  db.openConnect();
  const response = await db.getProductsInRange(
    parseInt(req.params.limit),
    parseInt(req.params.offset)
  );
  res.json({ data: response });
  db.closeConnect();
});

router.get("/:id", async (req, res) => {
  db.openConnect();
  const id = req.params.id;
  const response = await db.getProductById(id);
  res.json({ data: response });
  db.closeConnect();
});

router.get("/name/:name", async (req, res) => {
  db.openConnect();
  const name = req.params.name;
  const response = await db.getProductByName(name);
  res.json({ data: response });
  db.closeConnect();
});

router.get("/category/:cat", async (req, res) => {
  db.openConnect();
  const cat = req.params.cat;
  const response = await db.getProductsByCat(cat);
  res.json({ data: response });
  db.closeConnect();
});

router.get("/category/:cat/:limit-:offset", async (req, res) => {
  db.openConnect();
  const response = await db.getProductByCatInRange(
    req.params.cat,
    req.params.limit,
    req.params.offset
  );
  res.json({ data: response });
  db.closeConnect();
});
module.exports = router;
