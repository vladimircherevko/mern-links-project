//backend
const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

const router = Router();

// api/auth/registery
router.post(
  "/registery",
  [
    check("email", "Wrong email...").isEmail(),
    check("password", "Minimum length 8 symbols...").isLength({ min: 8 })
  ],
  async (req, res) => {
    try {
      const err = validationResult(req);
      if (!err.isEmpty())
        return res
          .status(400)
          .json({ message: "Validation registery error", errors: err.array() });
      const { email, password } = req.body;

      const candidate = await User.findOne({ email });
      if (candidate)
        return res.status(400).json({ message: `User ${email} exists` });

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: "User created" });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong in registery" });
    }
  }
);

// api/auth/login
router.post(
  "/login",
  [
    check("email", "Enter correct email")
      .normalizeEmail()
      .isEmail(),
    check("password", "Enter correct password").exists()
  ],
  async (req, res) => {
    try {
      const err = validationResult(req);
      if (!err.isEmpty())
        return res
          .status(400)
          .json({ message: "Login validation error", errors: err.array() });

      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) res.status(400).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Wrong password" });

      const token = jwt.sign(
        { userId: user.id }, //что передать в токене
        config.get("jwtKey"), //ключ шифрования токена
        {
          expiresIn: "1h"
        } //время сущ токена
      );
      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong in login" });
    }
  }
);

module.exports = router;
