const mongoose = require("mongoose");

const connecDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
    });

    console.log(`connected to mongodb`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connecDB;
