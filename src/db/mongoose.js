const mongoose = require("mongoose");
//local mongo db instance
//MONGODB_URL='//mongodb://127.0.0.1:27017/task-manager-api'
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // if (process.env.NODE_ENV === "Development")
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
