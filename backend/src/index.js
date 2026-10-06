const express = require("express");
const mongoose = require("mongoose");
const connectDb = require("./db/db");
const dotenv = require("dotenv").config();
const authRoutes = require("./routes/user.route");
const jobRoutes = require('./routes/job.route')
const app = express();
app.use(express.json());

connectDb();

app.use("/api/auth", authRoutes);
app.use('/api/jobs',jobRoutes)


app.listen(3000, () => {
  console.log("Server is running");
});
