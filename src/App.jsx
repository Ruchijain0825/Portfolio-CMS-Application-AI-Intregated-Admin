import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import About from "./components/pages/About";
import Skills from "./components/pages/Skills";
import Experience from "./components/pages/Experience";
import Project from "./components/pages/Project";
import Education from "./components/pages/Education";
import Blog from "./components/pages/Blog";
import Messages from "./components/pages/Message";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<Dashboard />}>
       
          <Route path="about" element={<About />} />
          <Route path="skills" element={<Skills />} />
          <Route path="project" element={<Project/>} />
          <Route path="education" element={<Education/>} />
          <Route path="experience" element={<Experience />} />
          <Route path="blog" element={<Blog />} />
          <Route path = "messages" element ={<Messages/>}/>
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;