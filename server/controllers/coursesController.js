import {
  findCourseByIdAndUpdate,
  createCourse,
  softDeleteCourse,
  findAllCourses,
} from "../services/coursesService.js";

async function updateCourse(req, res) {
  const { id } = req.params;

  try {
    const updatedCourse = await findCourseByIdAndUpdate(id, { $set: req.body });

    if (!updatedCourse)
      return res.status(404).json({ error: "Course not found" });

    res.status(200).json({
      id: updatedCourse._id,
      name: updatedCourse.name,
      description: updatedCourse.description,
      lessons: updatedCourse.lessons,
      isActive: updatedCourse.isActive,
      image: updatedCourse.image,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function addCourse(req, res) {
  try {
    const course = await createCourse({
      ...req.body,
      dateAdded: new Date(),
    });

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteCourse(req, res) {
  const { id } = req.params;

  try {
    const courseDelete = await softDeleteCourse(id);

    if (!courseDelete) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted", courseDelete });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCourses(req, res) {
  try {
    const courses = await findAllCourses();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export { updateCourse, addCourse, deleteCourse, getCourses };
