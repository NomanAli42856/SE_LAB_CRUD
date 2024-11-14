// const User = require("./User")
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const app = express();
const PORT = 5000;
const mongoURI = "mongodb+srv://noman:noman@cluster0.di58j.mongodb.net/Ecommerce";

app.use(cors());
app.use(express.json());
// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');


app.use("/auth", authRoutes);
app.use("/product", productRoutes);

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("Error connecting to MongoDB Atlas:", error));

// Check connection status
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});




app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
