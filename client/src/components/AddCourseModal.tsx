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

interface AddCourseModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function AddCourseModal({
  isOpen,
  onCancel,
}: AddCourseModalProps) {
  const { newCourse, handleConfirmAdd } = useContext(CoursesContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lessons, setLessons] = useState(0);
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleConfirmAdd({
      name,
      description,
      lessons,
      image,
    });
  };

  useEffect(() => {
    if (newCourse) {
      setName(newCourse.name);
      setDescription(newCourse.description);
      setLessons(newCourse.lessons);
      setImage(newCourse.image);
    }
  }, [newCourse]);

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setDescription("");
      setLessons(0);
      setImage("");
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Course</DialogTitle>
          <DialogDescription>Add your courses.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Course name</Label>
              <Input
                placeholder="Course Name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description-1">Description</Label>
              <Input
                placeholder="Description"
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="lessons-1">Lessons</Label>
              <Input
                placeholder="Lessons"
                required
                onChange={(e) => {
                  setLessons(Number(e.target.value));
                  const value = parseInt(e.target.value, 0);
                  setLessons(isNaN(value) ? 0 : value);
                }}
                type="number"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="image-1">Image</Label>
              <Input
                placeholder="Image"
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
