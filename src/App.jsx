import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import About from "./components/pages/About";
import Skills from "./components/pages/Skills";
import Projects from "./components/pages/Projects";

function App() {
  return (
    <BrowserRouter>
     <Toaster position="top-right" />
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<Dashboard />} />

        <Route path="/admin/about" element={<About />} />

        <Route path="/admin/skills" element={<Skills />} />

        <Route path="/admin/projects" element={<Projects />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;