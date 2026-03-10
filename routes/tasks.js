const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const db = require("../config/firebase");

// CREATE
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Task title required" });
    }

    await db.collection("tasks").add({
      title,
      description: description || "",
      priority: priority || "medium",
      dueDate: dueDate ? new Date(dueDate) : null,
      completed: false,
      userId: req.user.id,       // ← changed from user: email
      userEmail: req.user.email,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json({ success: true, message: "Task created successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating task" });
  }
});

// GET ALL
router.get("/", verifyToken, async (req, res) => {
  try {
    const snapshot = await db.collection("tasks")
      .where("userId", "==", req.user.id)   // ← changed from user: email
      .get();

    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json({ success: true, tasks });      // ← frontend expects { tasks: [] }

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// GET ONE
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const taskDoc = await db.collection("tasks").doc(req.params.id).get();

    if (!taskDoc.exists) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ success: true, task: { id: taskDoc.id, ...taskDoc.data() } });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching task" });
  }
});

// UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const taskRef = db.collection("tasks").doc(req.params.id);
    const taskDoc = await taskRef.get();

    if (!taskDoc.exists) {
      return res.status(404).json({ message: "Task not found" });
    }

    const { title, description, completed, priority, dueDate } = req.body;

    const updates = { updatedAt: new Date() };
    if (title !== undefined)       updates.title = title;
    if (description !== undefined) updates.description = description;
    if (completed !== undefined)   updates.completed = completed;
    if (priority !== undefined)    updates.priority = priority;
    if (dueDate !== undefined)     updates.dueDate = dueDate ? new Date(dueDate) : null;

    await taskRef.update(updates);
    res.json({ success: true, message: "Task updated successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating task" });
  }
});

// DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const taskRef = db.collection("tasks").doc(req.params.id);
    const taskDoc = await taskRef.get();

    if (!taskDoc.exists) {
      return res.status(404).json({ message: "Task not found" });
    }

    await taskRef.delete();
    res.json({ success: true, message: "Task deleted successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting task" });
  }
});

module.exports = router;