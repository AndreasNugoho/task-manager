import express from "express";

const router = express.Router();

router.post("task/create", (req, res) => {
  //tes
  res.send("Task created");
});

export default router;
