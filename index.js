const express = require("express");
const morgan = require("morgan");
const path = require("path");
const hpp = require("hpp");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
// files
const connectDB = require("./config/connectDB");
const errorHandler = require("./middlewares/errorHandler");
const limiter = require("./middlewares/limiter");

// initilize express
const app = express();

// configuration for development mode
if (process.env.ENVIRONMENT !== "production") {
  require("dotenv").config({ path: "./config/.env" });
  app.use(morgan("dev"));
}

// connect database
connectDB();

// middlewares
// json and body parser's
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// setup public folder for static assets
app.use(express.static(path.join(__dirname, "public")));
// security middlewares
// middleware to protect against HTTP Parameter Pollution attacks
app.use(hpp());
// rate limiter
app.use(limiter);
// add security headers to response headers
app.use(helmet());
// prevent cross side scripting
app.use(xss());
// prevent mongo injections
app.use(mongoSanitize());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/api/users", require("./routes/user.router"));
app.use("/api/plans", require("./routes/plan.router"));
app.use("/api/reviews", require("./routes/review.router"));
app.use("/api/music", require("./routes/music.router"));
// handle out of scope URL's
app.all("*", (req, res) => {
  res.status(404).json({ success: false, message: `path not found` });
});
// error handling middleware
app.use(errorHandler);

// start server
app.listen(process.env.PORT, () => {
  console.log(`server started, ${process.env.PORT}`);
});
