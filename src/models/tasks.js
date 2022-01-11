const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    deadline: {
      type: String,
      trim: true,
    },
    priorotize: {
      type: Boolean,
      default: false,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.pre("save", async function (next) {
  const task = this;
  // if (user.isModified("password")) {
  //   user.password = await bcrypt.hash(user.password, 8);
  // }
  // console.log(task);
  next();
});

const tasks = mongoose.model("tasks", taskSchema);

module.exports = tasks;
