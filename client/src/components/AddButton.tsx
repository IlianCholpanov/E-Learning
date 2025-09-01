import { Button } from "./ui/button";

type AddButtonProps = {
  onAdd: () => void;
};

export default function AddButton({ onAdd }: AddButtonProps) {
  return (
    <div className="flex justify-end items-end gap-4 mb-6">
      <Button
        className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
        onClick={onAdd}
      >
        ADD
      </Button>
    </div>
  );
}
