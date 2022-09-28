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

      if (!results[0]) {
        return res.json({ status: "error", reason: "no records returned" });
      }

      if (results[0].clicks === results[0].threshold) {
        return res.json({
          status: "error",
          reason: "Number of clicks hit threshold",
        });
      } else {
        const updatedValue = results[0].clicks + 1;
        const link = results[0].originalURL;
        connection.query(
          "UPDATE urls set clicks = ? WHERE urlcode = ?",
          [updatedValue, req.params.urlCode],
          (error, results) => {
            if (error) {
              connection.release();
              return res.json({ status: "error", reason: error.code });
            } else {
              res.redirect(link);
            }
          }
        );
      }
    });

    connection.release();
  });
});

module.exports = router;
