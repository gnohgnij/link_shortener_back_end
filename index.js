const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();

//allows accepting of json data
app.use(express.json({ extended: false }));

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true }, () => {
  console.log(`connected to DB`);
});

app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
