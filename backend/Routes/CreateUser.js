const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const jwtSecret = "MyNameIsSaurabhThakur@123"


const { body, validationResult } = require("express-validator");

router.post(
  "/createuser",
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),

    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email"),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),

    body("location").notEmpty().withMessage("Location is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    try {
            const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password:hashedPassword,
        location: req.body.location,
      });

      const data = {
  user: { id: user.id }
};

const authToken = jwt.sign(data, jwtSecret);

res.json({
  success: true,
  authToken: authToken
});

    } catch (error) {
      console.log(error); 
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email"),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res)   => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({
          errors: "Try with correct credentials",
        });
      }
      const PasswordCompare = await bcrypt.compare(req.body.password , userData.password)
      if (!PasswordCompare) {
        return res.status(400).json({
          errors: "Try with correct credentials",
        });
      }
       const data = {
        user:{
          id:userData.id
        }
       }
       const authToken = jwt.sign(data , jwtSecret)
      return res.json({ success: true , authToken:authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
