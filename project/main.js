//--- Libraries Importing
//#region global imports
const DButils = require("./routes/utils/DButils");
const axios = require("axios");
const bcrypt = require("bcryptjs");
require("dotenv").config();
//#endregion
//#region express configurations
var express = require("express");

var path = require("path");
const session = require("client-sessions");
var logger = require("morgan");
var cors = require("cors");
//#endregion
const port = process.env.PORT || "3000";
//--- Routers Importing
const auth = require("./routes/auth");
const users = require("./routes/users");
const league = require("./routes/league");
const teams = require("./routes/teams");
const players = require("./routes/player");
//#endregion

//--- App settings and config
var app = express();
/*EXLANATION app.use(...):
To setup your *middleware*, you can invoke app.use(<specific_middleware_layer_here>) */
app.use(logger("dev")); //logger
app.use(express.json()); // parse application/json
app.use(
  session({
    cookieName: "session", // the cookie key name
    secret: process.env.COOKIE_SECRET, // the encryption key
    duration: 24 * 60 * 60 * 1000, // expired after 20 sec
    activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration,
    cookie: {
      httpOnly: false,
    },
    //the session will be extended by activeDuration milliseconds
  })
);

app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public"))); //To serve static files such as images, CSS files, and JavaScript files

// middleware to serve all the needed static files under the dist directory - loaded from the index.html file
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("dist"));

app.get("/api", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

//#region cookie middleware
app.use(function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT id FROM Users")
      .then((users) => {
        if (users.find((x) => x.user_id === req.session.user_id)) {
          req.user_id = req.session.user_id;
        }
        next();
      })
      .catch((error) => next());
  } else {
    next();
  }
});
// #endregion

// ----> For cheking that our server is alive
app.get("/alive", (req, res) => res.send("I'm alive"));

// Route any request that starts with "/users" to the router <users> 
app.use("/users", users);
app.use("/league", league);
app.use("/teams", teams);
app.use("/players", players);
app.use("/auth", auth); //ANY URI is routed to auth.js ????

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).send(err.message);
});


// ##### SWAGGER GENERATOR #####
const expressSwagger = require('express-swagger-generator')(app);
let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options)
// ##### END SWAGGER GENERATOR #####

const server = app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

// process.on("SIGINT", function () {
//   if (server) {
//     server.close(() => console.log("server closed"));
//   }
// });
