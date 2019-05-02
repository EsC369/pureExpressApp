const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser")
const exphbs = require("express-handlebars");
const members = require("./Members");

// Handlebars middleware:
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Initialize middleware:
// app.use(logger);

// Call body parser in json:
app.use(express.json());
// To handle url encoded data:
app.use(express.urlencoded({ extended: false}));

// Set static folder:
app.use(express.static(path.join(__dirname, "public")));

// Home page route:
app.get("/", (req, res) => res.render("index", {
    title: "Member App",
    members
}));

// Members Api Routes modules:
app.use("/api/members", require("./routes/api/members"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server running on port: ", port));