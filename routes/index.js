const express = require("express");

const connect = require("../config/db");

const router = express.Router();

//GET
//Redirect newURL to originalUrl
router.get("/:urlCode", async (req, res) => {
  const query = "SELECT * FROM urls WHERE urlCode = ?";
  connect.query(query, [req.params.urlCode], (error, results) => {
    if (error) {
      return res.json({ status: "error", reason: error.code });
    }
    res.redirect(results[0].originalURL);
  });
});

module.exports = router;
