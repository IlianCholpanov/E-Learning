import { Outlet } from "react-router";
import Navigation from "./Navigation";

export default function AppLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
