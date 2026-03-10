const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/firebase");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user already exists  ← this is in the right place now
    const existing = await db.collection("users")
      .where("email", "==", email).get();

    if (!existing.empty) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRef = await db.collection("users").add({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    });

    res.status(201).json({ success: true, message: "Account created successfully", userId: userRef.id });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const snapshot = await db.collection("users")
      .where("email", "==", email).get();

    if (snapshot.empty) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const userDoc = snapshot.docs[0];
    const user = userDoc.data();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: userDoc.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // frontend needs token + user object  ← this was missing before
    res.json({
      success: true,
      message: "Login successful",
      token,
      user: { id: userDoc.id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in" });
  }
});

module.exports = router;