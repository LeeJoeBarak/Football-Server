var express = require("express");
var router = express.Router();
const DButils = require("../routes/utils/DButils");
const bcrypt = require("bcryptjs");
//const { createWebToken } = require("../auth/auth.service");



/**
 * This path returns the favorites games that were saved by the logged-in user
 * @route POST /auth/register
 * @group auth - authentication operations
 * @returns {string} 200 - user created
 * @returns {Error}  default - Unexpected error
 * @returns {Error} 409 - Username Taken
 */
router.post("/register", async (req, res, next) => {
  try {
    // parameters exists
    // valid parameters
    // username exists
    const users = await DButils.execQuery(
      "SELECT username FROM dbo.Users"
    );

    if (users.find((x) => x.username === req.body.username))
      throw { status: 409, message: "Username taken" };

    //hash the password
    let hash_password = bcrypt.hashSync(
      req.body.password,
      parseInt(process.env.bcrypt_saltRounds)
    );
    req.body.password = hash_password;

    // add the new username
    await DButils.execQuery(
      `INSERT INTO dbo.Users (username, password, is_admin, 
          first_name, last_name, country, email, image_url) VALUES ('${req.body.username}', '${hash_password}', 'FALSE', '${req.body.firstname}', '${req.body.lastname}', '${req.body.country}', '${req.body.email}', '${req.body['image-url']}')`
    );
    res.status(200).send("user created");
  } catch (error) {
    next(error);
  }
});


/**
 * This path returns the favorites games that were saved by the logged-in user
 * @route POST /auth/login
 * @group auth - authentication operations 
 * @returns {string} 200 - login succeeded
 * @returns {Error}  default - Unexpected error
 * @returns {Error} 401 - Username or Password incorrect
 */
router.post("/login", async (req, res, next) => {
  try {
    const user = (
      await DButils.execQuery(
        `SELECT * FROM dbo.Users WHERE username = '${req.body.username}'`
      )
    )[0];
    // user = user[0];
    console.log(user);

    // check that username exists & the password is correct
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      throw { status: 401, message: "Username or Password incorrect" };
    }

    // Set cookie
    req.session.user_id = user.id;

    // return cookie
    res.status(200).send("login succeeded");
  } catch (error) {
    next(error);
  }
});


/**
 * This path returns the favorites games that were saved by the logged-in user
 * @route POST /auth/logout
 * @group auth - authentication operations 
 * @returns {object} 200 - An object: { success: true, message: "logout succeeded" }
 * @returns {Error}  default - Unexpected error
 */
router.post("/logout", function (req, res) {
  req.session.reset(); // reset the session info --> send cookie when  req.session == undefined!!
  res.status(200).send({ success: true, message: "logout succeeded" });
});

module.exports = router;