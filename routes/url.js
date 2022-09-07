const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");

const Url = require("../models/url");

//POST
//create short url
router.post("/shorten", async (req, res) => {
  const originalURL = req.body.originalURL;
  const baseUrl = "http://localhost:3000";

  //Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }

  //Create url code
  const urlCode = shortid.generate();

  //Check long url
  if (validUrl.isUri(originalURL)) {
    try {
      let url = await Url.findOne({ originalURL: originalURL });

      if (url) {
        res.json(url);
      } else {
        const newURL = baseUrl + "/" + urlCode;

        url = new Url({
          urlCode: urlCode,
          originalURL: originalURL,
          newURL: newURL,
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(`server error`);
    }
  } else {
    res.status(401).json(`invalid original url`);
  }
});

module.exports = router;
