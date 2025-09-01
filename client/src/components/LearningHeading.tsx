import { Card } from "./ui/card";

import { User } from "lucide-react";

export default function LearningHeading() {
  return (
    <Card className="mb-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">
            Welcome
          </h1>
          <p className="text-muted-foreground">
            {"Manage your courses and track your learning progress"}
          </p>
        </div>
        <div className="bg-primary/10 p-3 rounded-full">
          <User className="h-8 w-8 text-primary" />
        </div>
      </div>
    </Card>
  );
}
