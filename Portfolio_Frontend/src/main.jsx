import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./Layout";
import About from "./components/About";
import HomeDashboard from "./components/HomeDashboard";
import RegisterUser from "./components/User Master/RegisterUser";
import LoginUser from "./components/User Master/LoginUser";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Intro from "./components/Intro";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Intro />} />
      <Route path="/home" element={<Intro />} />
      <Route path="/about" element={<About />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/register" element={<RegisterUser />} />
      <Route path="/login" element={<LoginUser />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);
