import { useContext } from "react";
import { CoursesContext } from "@/context/ContextProvider";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

export default function DropDown({
  course,
}: {
  course: { _id: string; isActive: boolean };
}) {
  const { handleUpdateStatus } = useContext(CoursesContext);

  const handleStatusChange = (newStatus: boolean) => {
    handleUpdateStatus(course._id, newStatus);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={course.isActive ? "default" : "secondary"}
          className={
            course.isActive
              ? "bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
              : "bg-muted text-muted-foreground cursor-pointer"
          }
        >
          {course.isActive ? "Active" : "Archived"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleStatusChange(true)}>
            Active
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusChange(false)}>
            Archived
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
