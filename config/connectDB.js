const mongoose = require("mongoose");

async function connectDB() {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connect to DB, ${con.connection.host}`);
  } catch (e) {
    console.log(`DB CONNECTION ERR, ${e.message}`);
  }
}

module.exports = connectDB;
