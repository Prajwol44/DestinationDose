const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

// Database collections
const LogInCollection = require("./mongodb");
const ContactCollection = require("./contactus");

// Set up template path (fix typo: "templates" not "tempelates")
const templatePath = path.join(__dirname, "../templates");

// Middleware
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/sightseeing", (req, res) => {
  res.render("sightseeing");
});

app.get("/eatingout", (req, res) => {
  res.render("eatingout");
});

app.get("/activities", (req, res) => {
  res.render("activities");
});

app.get("/aboutus", (req, res) => {
  res.render("aboutus");
});

app.get("/contactus", (req, res) => {
  res.render("contactus");
});

app.get("/search", (req, res) => {
  res.render("search");
});

// Signup route
app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    id: req.body.id,
    password: req.body.password,
  };

  await LogInCollection.insertMany([data]);
  res.status(201).render("home", { naming: req.body.name });
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const check = await LogInCollection.findOne({ name: req.body.name });

    if (check.password === req.body.password) {
      res.status(201).render("home", { naming: req.body.name });
    } else {
      res.send("Wrong password");
    }
  } catch {
    res.send("Wrong details");
  }
});

// Contact us route
app.post("/contactus", async (req, res) => {
  const data = {
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    feedback: req.body.feedback,
  };

  await ContactCollection.insertMany([data]);
  res.render("home");
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});