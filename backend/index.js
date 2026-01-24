const express = require("express");
const app = express();

const Client = require("./db");

Client();

const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/products"));
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(5000, console.log("Server started on port 5000"));
