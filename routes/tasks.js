const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const db = require("../config/firebase");

router.post("/", verifyToken, async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).send("Task title required");
    }

    await db.collection("tasks").add({
      title,
      completed: false,
      user: req.user.email,
      createdAt: new Date()
    });

    res.send("Task created successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating task");
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const snapshot = await db.collection("tasks")
      .where("user", "==", req.user.email)
      .get();

    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching tasks");
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, completed } = req.body;

    const taskRef = db.collection("tasks").doc(taskId);
    const taskDoc = await taskRef.get();

    if (!taskDoc.exists) {
      return res.status(404).send("Task not found");
    }

    await taskRef.update({
      ...(title !== undefined && { title }),
      ...(completed !== undefined && { completed })
    });

    res.send("Task updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating task");
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const taskId = req.params.id;

    const taskRef = db.collection("tasks").doc(taskId);
    const taskDoc = await taskRef.get();

    if (!taskDoc.exists) {
      return res.status(404).send("Task not found");
    }

    await taskRef.delete();

    res.send("Task deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting task");
  }
});

module.exports = router;
