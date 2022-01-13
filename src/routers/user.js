const express = require("express");
const User = require("../models/users");
const sharp = require("sharp");
const router = new express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");

//register user
router.post("/api/users/register", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();

    const token = await user.generateAuthToken();
    res
      .status(201)
      .send({ user, token, message: "User Registered Successfully" });
  } catch (error) {
    res.status(400).send({ error: error, message: "Oops an Error Occurred" });
  }
});

//login user
router.post("/api/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res
      .status(200)
      .send({ user, token, message: "User Logged in Successfully" });
  } catch (error) {
    res.status(400).send({ message: "Invalid Credentials" });
  }
});

//user logout
router.post("/api/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.status(200).send({ message: "User Logged Out Successfully" });
  } catch (error) {
    res.status(500).send({ error: error, message: "Oops an Error Occurred" });
  }
});

//Logout from all the devices
router.post("/api/users/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send({ message: "User Logged Out Successfully" });
  } catch (error) {
    res.status(500).send({ error: error, message: "Oops an Error Occurred" });
  }
});

//get user
router.get("/api/users/me", auth, async (req, res) => {
  res
    .status(200)
    .send({ user: req.user, message: "User Fetched Successfully" });
});

//update user
router.patch("/api/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "displayName",
    "email",
    "password",
    "streak",
    "total_tasks",
    "priority_tasks",
    "completed_tasks",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ message: "Invalid update!" });

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    if (!req.user) return res.status(404).send({ message: "User Not Found" });

    res
      .status(200)
      .send({ user: req.user, message: "User Updated Successfully" });
  } catch (error) {
    res.status(400).send({ error: error, message: "Oops an Error Occurred" });
  }
});

//delete user
router.delete("/api/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a valid image"));
    }
    cb(undefined, true);
  },
});

//upload avatar
router.post(
  "/api/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avatar = buffer;
    await req.user.save();
    res
      .status(200)
      .send({ avatar: req.user.avatar, message: "Avatar added successfully" });
  },
  (error, req, res, next) => {
    res
      .status(400)
      .send({ error: error.message, message: "Oops an Error Occurred" });
  }
);

//delete avatar
router.delete("/api/users/me/avatar", auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.status(200).send({ message: "Avatar delete Successfully" });
  } catch (error) {
    res.status(500).send({ error: error, message: "Oops an Error Occurred" });
  }
});

//get avatar
router.get("/api/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.status(200).send(user.avatar);
  } catch (error) {
    res.status(404).send({ error: error, message: "Oops an Error Occurred" });
  }
});

module.exports = router;
