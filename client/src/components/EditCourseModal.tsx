import { useContext, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CoursesContext } from "@/context/ContextProvider";

interface EditCourseModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  course: [];
}

export default function EditCourseModal({
  isOpen,
  onCancel,
}: EditCourseModalProps) {
  const { selectedCourse, editModalOpen, handleConfirmEdit } =
    useContext(CoursesContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lessons, setLessons] = useState(0);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (selectedCourse) {
      setName(selectedCourse.name);
      setDescription(selectedCourse.description);
      setLessons(selectedCourse.lessons ?? 0);
      setImage(selectedCourse.image);
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (!editModalOpen) {
      setName("");
      setDescription("");
      setLessons(0);
      setImage("");
    }
  }, [editModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;
    handleConfirmEdit({
      ...selectedCourse,
      name,
      description,
      lessons,
      image,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Course name</Label>
              <Input
                placeholder="Course Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Description</Label>
              <Input
                placeholder="Description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="lessons-1">Lessons</Label>
              <Input
                placeholder="Lessons"
                value={lessons}
                required
                type="number"
                onChange={(e) => {
                  setLessons(Number(e.target.value));
                  const value = parseInt(e.target.value, 0);
                  setLessons(isNaN(value) ? 0 : value);
                }}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="image-1">Image</Label>
              <Input
                placeholder="Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="mb-5"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
