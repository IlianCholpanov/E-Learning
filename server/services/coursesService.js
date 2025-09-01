import CourseModel from "../models/coursesModel.js";

async function findCourseByIdAndUpdate(id, updateData) {
  return await CourseModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
}

async function createCourse(courseData) {
  const course = new CourseModel(courseData);
  return await course.save();
}

async function softDeleteCourse(id) {
  return await CourseModel.findByIdAndUpdate(
    id,
    { $set: { _isDeleted: true } },
    {
      new: true,
      runValidators: true,
    }
  );
}

async function findAllCourses() {
  return await CourseModel.find({ _isDeleted: false });
}

export {
  findCourseByIdAndUpdate,
  createCourse,
  softDeleteCourse,
  findAllCourses,
};
