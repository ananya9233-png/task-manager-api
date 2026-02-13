const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/firebase");
const verifyToken = require("../middleware/authMiddleware");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password required");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection("users").add({
      email,
      password: hashedPassword,
      createdAt: new Date()
    });

    res.send("User registered successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error registering user");
  }
  const existingUser = await db.collection("users")
  .where("email", "==", email)
  .get();

if (!existingUser.empty) {
  return res.status(400).json({
    success: false,
    message: "User already exists"
  });
}

});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const snapshot = await db.collection("users")
      .where("email", "==", email)
      .get();

    if (snapshot.empty) {
      return res.status(400).send("User not found");
    }

    const user = snapshot.docs[0].data();

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send("Invalid password");
    }

    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });

  } catch (error) {
    console.log(error);
    res.status(500).send("Error logging in");
  }
});

// PROTECTED
router.get("/", verifyToken, (req, res) => {
  res.send(`Welcome ${req.user.email}, this is protected data.`);
});

module.exports = router;
