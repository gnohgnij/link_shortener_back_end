const express = require("express");
const connecDB = require("./config/db");

const app = express();

//connect to db
connecDB();

//allows accepting of json data
app.use(express.json({ extended: false }));

app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
