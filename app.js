const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router = require("./routes/router.js");

app.get("/iniError", (req, res) => {
  iniError;
});

app.use(router);

// 404 Handler
app.use(function (req, res, next) {
  res.status(404).json({
    status: "fail",
    errors: "Halaman tidak ditemukan",
  });
});

// Internal Server Error Handler
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).json({
    status: "fail",
    errors: err.message,
  });
});

app.listen(port, () => console.log(`Arul's Game App listening at http://localhost:${port}`));
