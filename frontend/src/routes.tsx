import { Routes, Route } from "react-router"
import Home from "./pages/index.tsx"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}