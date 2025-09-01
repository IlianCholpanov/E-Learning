import { Router } from "express";
import {
  addCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from "../controllers/coursesController.js";

const router = Router();

router.get("/", getCourses);
router.post("/", addCourse);
router.patch("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
