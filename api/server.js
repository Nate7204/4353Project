const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authroutes = require("./routes/auth.routes")
const userroutes = require("./routes/user.routes")

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", authroutes)
app.use("/", userroutes)

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
