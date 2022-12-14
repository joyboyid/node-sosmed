const express = require("express");
const mysql = require("mysql");
const envi = require("dotenv");
const path = require("path");

envi.config({ path: "./.env" });

const app = express();
const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "hbs");

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("database connected");
  }
});

app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

app.listen(5000, () => {
  console.log("server runin on port 5000");
});
