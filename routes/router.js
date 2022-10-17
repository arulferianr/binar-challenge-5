const express = require("express");
const router = express.Router();
let users = require("../database/user.json");

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

// Routing
router.get("/", (req, res) => {
  res.render("home");
});
router.get("/play", (req, res) => {
  res.render("play");
});
router.get("/login", (req, res) => {
  res.render("login");
});

// Auth
router.post("/login", (req, res) => {
  let request = req.body;
  let usersData = users;
  for (let i = 0; i < usersData.length; i++) {
    const user = usersData[i];
    if (request.username == user.username && request.password == user.password) {
      res.status(200);
      res.redirect("/play");
    } else {
      res.status(401);
      res.send("Username/password salah, silakan coba lagi.");
    }
  }
});

// API User Data
router.get("/api/v1/users", (req, res) => {
  res.status(200).json(users);
});

router.get("/api/v1/users/:id", (req, res) => {
  const user = users.find((i) => i.id === +req.params.id);
  res.status(200).json(user);
});

router.post("/api/v1/users/", (req, res) => {
  // Destruct req.body
  const { username, password, fullname } = req.body;
  // Get ID
  const id = users[users.length - 1].id + 1;
  const user = {
    id,
    username,
    password,
    fullname,
  };
  // Simpan ke users array
  users.push(user);
  res.status(201).json(user);
});

router.put("/api/v1/users/:id", (req, res) => {
  let user = users.find((i) => i.id === +req.params.id);
  const params = {
    username: req.body.username,
    password: req.body.password,
    fullname: req.body.fullname,
  };
  user = { ...user, ...params };
  users = users.map((i) => (i.id === user.id ? user : i));
  res.status(200).json(user);
});

router.delete("/api/v1/users/:id", (req, res) => {
  users = users.filter((i) => i.id !== +req.params.id);
  res.status(200).json({
    message: `User dengan id ${req.params.id} sudah berhasil dihapus`,
  });
});

module.exports = router;
