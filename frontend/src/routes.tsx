import { Routes, Route } from "react-router"
import DashboardLayout from "@/pages/layout.tsx"
import Home from "@/pages/index.tsx"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}