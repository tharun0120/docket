const express = require("express");
const Task = require("../models/tasks");
const router = new express.Router();
const auth = require("../middleware/auth");

//create task
router.post("/api/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    user_id: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send({ tasks: task, message: "Docket Added Successfully" });
  } catch (error) {
    res.status(400).send({ error: error, message: "Oops an Error Occured" });
  }
});

//get tasks

//get api/tasks?completed=true
//get api/tasks?limit=10&skip=0
//get api/tasks?sortBy=createdAt_asc/desc
//get api/tasks?priorotize=true
router.get("/api/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  if (req.query.priorotize) {
    match.priorotize = req.query.priorotize === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    const tasks = req.user.tasks;
    let tmpRes = {};

    for (let i = 0; i < tasks.length; i++) {
      const date = tasks[i].deadline.slice(0, 10);
      if (!tmpRes.hasOwnProperty(date)) {
        tmpRes[date] = [tasks[i]];
      } else {
        tmpRes[date].push(tasks[i]);
      }
    }
    res
      .status(200)
      .send({ tasks: tmpRes, message: "Dockets Fetched Successfully" });
  } catch (error) {
    res.status(500).send({ error: error, message: "Oops an Error Occurred" });
  }
});

//search
router.get("/api/tasks/search", auth, async (req, res) => {
  try {
    let result = await Task.aggregate([
      {
        $search: {
          index: "titleIndex",
          autocomplete: {
            query: `${req.query.query}`,
            path: "title",
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3,
            },
          },
        },
      },
      { $limit: 5 },
      { $project: { _id: 1, title: 1 } },
    ]);
    // console.log(result);
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: e.message, message: "Oops an Error Occurred" });
  }
});

//get a single task
router.get("/api/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  let tempRes = {};

  try {
    const task = await Task.findOne({ _id, user_id: req.user._id });
    if (!task) return res.status(404).send({ error: "No such Docket Found" });

    const date = task.deadline.slice(0, 10);
    tempRes[date] = [task];

    res
      .status(200)
      .send({ tasks: tempRes, message: "Docket Fetched Successfully" });
  } catch (error) {
    res.status(500).send({ error: error, message: "Oops an Error Occurred" });
  }
});

//update a task
router.patch("/api/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed", "priorotize"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid update!" });

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user_id: req.user._id,
    });

    if (!task) return res.status(404).send({ error: "No such Docket Found" });

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res
      .status(200)
      .send({ tasks: task, message: "Docket Updated Successfully" });
  } catch (error) {
    res.status(400).send({ error: error, message: "Oops an Error Occurred" });
  }
});

//delete a task
router.delete("/api/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user._id,
    });

    if (!task) return res.status(404).send({ error: "No such Docket Found" });

    res
      .status(200)
      .send({ tasks: task, message: "Dockets Deleted Successfully" });
  } catch (error) {
    res.status(500).send({ error: error, message: "Oops an Error Occurred" });
  }
});

module.exports = router;
