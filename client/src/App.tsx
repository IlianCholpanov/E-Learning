import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import LearningsPage from "./pages/LearningsPage";
import { CoursesProvider } from "./context/ContextProvider";
import AppLayout from "./components/AppLayout";
import { Toaster } from "sonner";

export default function LearningDashboard() {
  return (
    <CoursesProvider>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/learning" element={<LearningsPage />} />
          </Route>
        </Routes>

        <Toaster position="top-center" />
      </div>
    </CoursesProvider>
  );
}
