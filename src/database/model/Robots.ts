import { model, Schema } from "mongoose";

const RobotSchema = new Schema({
  name: String,
  image: String,
  stats: {
    speed: Number,
    endurance: Number,
    creationDate: String,
  },
});

const Robot = model("Robot", RobotSchema, "robots");

export default Robot;
