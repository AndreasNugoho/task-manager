import asyncHandler from "express-async-handler";
import TaskModel from "../../models/tasks/TaskModel.js";

export const createTask = asyncHandler(async (req, res) => {
  try {
    const { title, description, dueDate, status, priority } = req.body;

    if (!title || title.trim() === "") {
      res.status(400).json({ message: "Title is required" });
    }

    if (!description || description.trim() === "") {
      res.status(400).json({ message: "Description is required" });
    }

    const task = new TaskModel({
      title,
      description,
      dueDate,
      priority,
      status,
      user: req.user._id,
    });

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.log("error in createTask", error.nessage);
    res.status(500).json({ message: error.nessage });
  }
});

export const getTasks = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      res.status(400).json({ message: "User not found!" });
    }

    const tasks = await TaskModel.find({ user: userId });

    res.status(200).json({
      length: tasks.length,
      tasks,
    });
  } catch (error) {
    console.log("error in createTask", error.nessage);
    res.status(500).json({ message: error.nessage });
  }
});

export const getTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Please provide a task id!" });
    }

    const task = await TaskModel.findById(id);

    if (!task) {
      res.status(404).json({ message: "Task not found!" });
    }

    if (!task.user.equals(userId)) {
      res
        .status(401)
        .json({ message: "You are not authorized to view this task!" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.log("Error in getTask", error.message);
    res.status(500).json({ message: error.message });
  }
});

export const updateTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const { id } = req.params;
    const { title, description, dueDate, status, priority, completed } =
      req.body;

    if (!id) {
      res.status(400).json({ message: "Please provide a task id!" });
    }

    const task = await TaskModel.findById(id);

    if (!task) {
      res.status(404).json({ message: "Task not found!" });
    }

    if (!task.user.equals(userId)) {
      res
        .status(401)
        .json({ message: "You are not authorized to update this task!" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.completed = completed || task.completed;

    await task.save();

    return res.status(200).json(task);
  } catch (error) {}
});

export const deleteTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const task = await TaskModel.findById(id);

    if (!task) {
      res.status(404).json({ message: "Task not found!" });
    }

    if (!task.user.equals(userId)) {
      res
        .status(401)
        .json({ message: "You are not authorized to delete this task!" });
    }

    await TaskModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "Task deleted successfully!" }); 
  } catch (error) {
    console.log("Error in deleteTask", error.message);
    res.status(500).json({ message: error.message });
  }
});
