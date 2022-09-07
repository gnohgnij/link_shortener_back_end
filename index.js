const express = require("express");
const mongoose = require("mongoose");

const app = express();

//allows accepting of json data
app.use(express.json({ extended: false }));

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true }, () => {
  console.log(`connected to DB`);
});

app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
