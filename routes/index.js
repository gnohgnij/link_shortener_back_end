const express = require("express");

const pool = require("../config/db");

const router = express.Router();

//GET
//Redirect newURL to originalUrl
router.get("/:urlCode", async (req, res) => {
  const query = "SELECT * FROM urls WHERE urlCode = ?";

  pool.getConnection((err, connection) => {
    //not connected
    if (err) throw err;

    connection.query(query, [req.params.urlCode], (error, results) => {
      if (error) {
        return res.json({ status: "error", reason: error.code });
      }
      res.redirect(results[0].originalURL);
    });

    connection.release();
  });
});

module.exports = router;
