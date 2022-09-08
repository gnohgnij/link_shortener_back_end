const express = require("express");
const validUrl = require("valid-url");
const shortid = require("shortid");

const connect = require("../config/db");

const router = express.Router();

//POST
//create short url
router.post("/shorten", async (req, res) => {
  const originalURL = req.body.originalURL;
  const baseUrl = "https://shawwty.herokuapp.com";

  //Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }

  //Create url code
  const urlCode = shortid.generate();

  //Check originalURL
  if (validUrl.isUri(originalURL)) {
    const query = "SELECT * FROM urls WHERE originalURL = ?";
    connect.query(query, [originalURL], (error, results) => {
      if (error) {
        return res.json({ status: "error", reason: error.code });
      }

      if (results[0]) {
        res.json({ url: results[0] });
      } else {
        const newURL = baseUrl + "/" + urlCode;
        const data = {
          urlCode: urlCode,
          originalURL: originalURL,
          newURL: newURL,
        };
        connect.query(
          "INSERT INTO urls VALUES (?, ?, ?)",
          Object.values(data),

          (error, results) => {
            if (error) {
              return res.json({ status: "error", reason: error.code });
            } else {
              res.json({ url: data });
            }
          }
        );
      }
    });
  } else {
    res.json(`invalid original url`);
  }
});

module.exports = router;
