import { createContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { toast } from "sonner";

interface Course {
  _id: string;
  name: string;
  description: string;
  lessons: number;
  isActive: boolean;
  image: string;
}

interface NewCourseInput {
  name: string;
  description: string;
  lessons: number;
  image: string;
}

interface CoursesContextType {
  courses: Course[];
  loading: boolean;
  error: string | null;
  newCourse: NewCourseInput;
  selectedCourse: Course | null;
  addModalOpen: boolean;
  handleAdd: () => void;
  handleConfirmAdd: () => Promise<void>;
  handleCancelAdd: () => void;
  editModalOpen: boolean;
  handleEdit: () => void;
  handleConfirmEdit: () => Promise<void>;
  handleCancelEdit: () => void;
  handleUpdateStatus: (_id: string,) => Promise<void>;
  deleteModalOpen: boolean;
  handleDeleteCourse: (_id: string) => Promise<void>;
  handleConfirmDelete: () => void;
  handleCancelDelete: () => void;
  confirmDelete: () => void;
  refreshCourses: () => void;
}

export const CoursesContext = createContext<CoursesContextType | any>(
  undefined
);

interface CoursesProviderProps {
  children: ReactNode;
}

export function CoursesProvider({ children }: CoursesProviderProps) {
  const API_URL = import.meta.env.VITE_API_URL;

  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState<NewCourseInput>({
    name: "",
    description: "",
    lessons: 0,
    image: "",
  });
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Course[]>(API_URL);
      setCourses(response.data);
    } catch (err: any) {
      toast.error("Failed to load courses", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshCourses();
  }, [refreshCourses]);

  const handleAdd = async () => {
    setAddModalOpen(true);
  };

  const handleConfirmAdd = async (courseData: NewCourseInput) => {
    try {
      const payload = {
        ...courseData,
        isActive: "true",
      };

      const response = await axios.post(API_URL, payload);

      toast.success("Course has been added!");
      setCourses([...courses, response.data]);
    } catch (error: any) {
      toast.error("Course could not be added", error.message);
    }

    setAddModalOpen(false);
  };

  const handleCancelAdd = () => {
    setNewCourse({
      name: "",
      description: "",
      lessons: 0,
      image: "",
    });
    setAddModalOpen(false);
  };

  const handleEdit = async (updatedCourse: Course) => {
    setSelectedCourse(updatedCourse);
    setEditModalOpen(true);
  };

  const handleConfirmEdit = async (courseToUpdate: Course) => {
    try {
      await axios.patch(`${API_URL}/${courseToUpdate._id}`, courseToUpdate);

      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === courseToUpdate._id
            ? { ...course, ...courseToUpdate }
            : course
        )
      );

      toast.success("Course has been updated!");
    } catch (error: any) {
      toast.error("Course could not be updated", error.message);
    }

    setEditModalOpen(false);
    setSelectedCourse(null);
  };

  const handleCancelEdit = () => {
    setEditModalOpen(false);
    setSelectedCourse(null);
  };

  const handleUpdateStatus = async (_id: string, newStatus: boolean) => {
    try {
      await axios.patch(`${API_URL}/${_id}`, {
        isActive: newStatus,
      });
      setCourses((prev) =>
        prev.map((c) => (c._id === _id ? { ...c, isActive: newStatus } : c))
      );
      toast.success("Status successfully updated!");
    } catch (error: any) {
      toast.error("Status could not be updated", error.message);
    }
  };

  const confirmDelete = (courseId: string) => {
    setSelectedCourseId(courseId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedCourseId) await handleDeleteCourse(selectedCourseId);

    setDeleteModalOpen(false);
    setSelectedCourseId(null);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setSelectedCourseId(null);
  };

  const handleDeleteCourse = async (_id: string) => {
    try {
      await axios.delete(`${API_URL}/${_id}`);
      setCourses(courses.filter((c) => c._id !== _id));
      toast.success("Course has been deleted!");
    } catch (error: any) {
      toast.error("Course could not be deleted", error.message);
    }
  };

  return (
    <CoursesContext.Provider
      value={{
        courses,
        newCourse,
        loading,
        error,
        selectedCourse,
        editModalOpen,
        handleEdit,
        handleConfirmEdit,
        handleCancelEdit,
        deleteModalOpen,
        confirmDelete,
        handleConfirmDelete,
        handleCancelDelete,
        handleDeleteCourse,
        addModalOpen,
        handleAdd,
        handleConfirmAdd,
        handleCancelAdd,
        handleUpdateStatus,
        refreshCourses,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
}
