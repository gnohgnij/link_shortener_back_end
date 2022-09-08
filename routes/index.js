const express = require("express");

const pool = require("../config/pool");

const router = express.Router();

//GET
//Redirect newURL to originalUrl
router.get("/:urlCode", async (req, res) => {
  const query = "SELECT * FROM urls WHERE urlCode = ?";
  pool.query(query, [req.params.urlCode], (error, results) => {
    if (error) {
      res.json({ status: "error", reason: error.code });
    }
    if (!results[0]) {
      res.json({ status: `urlCode not found` });
    } else {
      res.redirect(results[0].originalURL);
    }
  });
});

module.exports = router;
