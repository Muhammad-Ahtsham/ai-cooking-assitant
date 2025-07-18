const express = require("express");
const cors = require("cors");
require("dotenv").config({
  path: "./config/.env",
});
const dbConnection = require("./config/db");
const userRoutes = require("./routers/user");
const historyRoutes = require("./routers/history");
const messageRoutes = require("./routers/message");
const genaiRoutes = require("./routers/genai");
const libraryRoutes = require("./routers/library");
const cookieParser = require("cookie-parser");

const app = express();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection();


app.use("/api/v1/user", userRoutes);
app.use("/api/v1/history", historyRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/genai", genaiRoutes);
app.use("/api/v1/library", libraryRoutes);


app.listen(process.env.PORT_KEY, () => {
  console.log("Server is running on port 5000");
});
