import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Layout() {
  return (
    <div className="container mx-auto px-10">
      <Header />
      <Outlet />
    </div>
  );
}
