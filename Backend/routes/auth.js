const express = require("express");
const router = express.Router();
const User = require("../modules/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET_SIGN = "Sirman@#";

// ROUTE 1 : Creating new user through post request : LOGIN NOT REQUIRED
router.post(
  "/createuser",
  [
    body("email", "Enter valid email id").isEmail(),
    body("password", "Password must be lenght 5").isLength({ min: 5 }),
    body("name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    //for user
    let success = false;

    // Handling validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
      // Checking Duplication - Already exits email id
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry a user with email id already exists." });
      }

      // Hashing password using bcryptjs with salt
      const salt = bcrypt.genSaltSync(10);
      const SecPass = bcrypt.hashSync(req.body.password, salt);

      // To create new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: SecPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET_SIGN);
      // console.log(authToken);
      success=true;
      res.send({success, authToken });
      // res.send(req.body);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal server error occured");
    }
  }
);

// ROUTE 2 : lgoin user through post request : LOGIN NOT REQUIRED

router.post(
  "/login",
  [
    body("email", "Please enter valid email id").isEmail(),
    body("password", "Please enter valid Password").exists(),
  ],
  async (req, res) => {
    //for user
    let success = false;

    // Handling validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({
            success,
            error: "Please try to login with correct credentials",
          });
      }
      const ComparePassword = await bcrypt.compare(password, user.password);
      if (!ComparePassword) {
        return res
          .status(400)
          .json({
            success,
            error: "Please try to login with correct credentials",
          });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET_SIGN);
      success = true;
      res.send({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal server error occured");
    }
  }
);

// ROUTE 3 : get user details throught user id : post request : LOGIN REQUIRED

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    //FETCHING USER ID FROM REQUEST
    const userId = req.user.id;
    //FETCH USER THROUGH USER ID - NO PASSWORD
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error occured");
  }
});

module.exports = router;
