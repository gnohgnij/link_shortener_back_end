const express = require("express");
const router = express.Router();

const Url = require("../models/url");

router.get("/", (req, res) => {
  res.json(`hello world`);
});

//GET
//Redirect shortUrl to originalUrl
router.get("/:urlCode", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.urlCode });

    if (url) {
      return res.redirect(url.originalURL);
    } else {
      return res.status(404).json(`no url found`);
    }
  } catch (err) {
    console.error(error);
    res.status(500).json(`server error`);
  }
});

module.exports = router;
