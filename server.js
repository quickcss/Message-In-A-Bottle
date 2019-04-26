var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;
var db = require("./models");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
var routes = require("./routes/api-routes.js");
app.use(routes);
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Using Routers method instead
// require("./routes/html-routes.js")(app);
// require("./routes/author-api-routes.js")(app);
// require("./routes/post-api-routes.js")(app);

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
