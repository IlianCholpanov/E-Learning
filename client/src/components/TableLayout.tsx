import { useContext } from "react";
import { CoursesContext } from "@/context/ContextProvider";
import DeleteModal from "./DeleteModal";
import EditCourseModal from "./EditCourseModal";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card } from "@/components/ui/card";
import { BookOpen, Pen, Trash2Icon } from "lucide-react";
import DropDown from "./DropDown";
import { formatDate } from "@/utils/helpers";
import AddButton from "./AddButton";
import AddCourseModal from "./AddCourseModal";

export default function TableLayout() {
  const {
    courses,
    editModalOpen,
    selectedCourse,
    handleEdit,
    handleConfirmEdit,
    handleCancelEdit,
    deleteModalOpen,
    confirmDelete,
    handleConfirmDelete,
    handleCancelDelete,
    addModalOpen,
    handleAdd,
    handleConfirmAdd,
    handleCancelAdd,
  } = useContext(CoursesContext);

  return (
    <>
      <AddButton onAdd={handleAdd} />

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold text-foreground">
                ID
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Course name
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Description
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Lessons(count)
              </TableHead>
              <TableHead className="font-semibold text-foreground pl-6">
                State
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Date added
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Image
              </TableHead>
              <TableHead className="font-semibold text-foreground pl-4">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course: any, _idx: number) => (
              <TableRow
                key={course._id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-medium">{_idx + 1}</TableCell>
                <TableCell className="font-medium text-foreground">
                  {course.name}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {course.description}
                </TableCell>
                <TableCell className="items-center justify-center pl-10">
                  {course.lessons}
                </TableCell>
                <TableCell>
                  <DropDown course={course} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(course.dateAdded)}
                </TableCell>
                <TableCell>
                  <div className="bg-primary/10 p-1 rounded-full inline-flex items-center justify-center">
                    {course.image?.includes("https") ? (
                      <img
                        src={course.image}
                        alt="course"
                        className="h-5 w-6"
                      />
                    ) : (
                      <BookOpen className="h-5 w-6 text-primary" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="rounded-full w-fit flex gap-2">
                    <div className="p-1 cursor-pointer hover:bg-primary/30 rounded-full">
                      <Pen
                        className="h-5 w-6 text-primary "
                        onClick={() => handleEdit(course)}
                      />
                    </div>
                    <div className="p-1 cursor-pointer hover:bg-primary/30 rounded-full">
                      <Trash2Icon
                        className="h-5 w-6 text-primary"
                        onClick={() => confirmDelete(course._id)}
                      />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <DeleteModal
        isOpen={deleteModalOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      <EditCourseModal
        isOpen={editModalOpen}
        onCancel={handleCancelEdit}
        onConfirm={handleConfirmEdit}
        course={selectedCourse}
      />

      <AddCourseModal
        isOpen={addModalOpen}
        onCancel={handleCancelAdd}
        onConfirm={handleConfirmAdd}
      />
    </>
  );
}
