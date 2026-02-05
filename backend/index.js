const express = require("express");
const app = express();

const Client = require("./db");
const dotenv = require("dotenv");
dotenv.config();


Client();


const cors = require("cors");
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://food-stack-mern-7ndo1q3fa-saurabh-singhs-projects-4cbb1c3b.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


app.use(express.json());
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/products"));
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});