import { Schema, model } from "mongoose";

const courseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  lessons: { type: Number, required: true },
  isActive: { type: Boolean, required: true, default: true },
  dateAdded: { type: Date, default: Date.now },
  image: { type: String, required: false },
  _isDeleted: { type: Boolean, default: false },
});

const Course = model("Course", courseSchema);

export default Course;
