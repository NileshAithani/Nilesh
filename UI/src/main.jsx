import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import Layout from "./Layout/Layout";
import PrivateLayout from "./Layout/PrivateLayout";
import Error from "./pages/error.jsx";

// Lazy loading components to improve performance
const About = lazy(() => import("./pages/About"));
// const RegisterUser = lazy(() =>
//   import("./components/User Master/RegisterUser")
// );
const LoginUser = lazy(() => import("./components/User Master/LoginUser"));
const Experience = lazy(() => import("./pages/Experience"));
const Projects = lazy(() => import("./pages/Projects"));
const Intro = lazy(() => import("./pages/Intro"));

import { Provider } from "react-redux";
import { store } from "./redux/store";
import RegisterUser from "./components/User Master/RegisterUser";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {" "}
      {/* Public Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Intro />} />
        <Route path="home" element={<Intro />} />
        <Route path="about" element={<About />} />
        <Route path="experience" element={<Experience />} />
        <Route path="projects" element={<Projects />} />
        <Route path="login" element={<LoginUser />} />
        <Route path="register" element={<RegisterUser />} />
      </Route>
      {/* Private Routes */}
      <Route element={<PrivateLayout />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Route>
      {/* Error Handling */}
      <Route path="*" element={<Error />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="405109047558-chmou5iqslienihkj07fpvvea1o8612i.apps.googleusercontent.com">
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
        <ToastContainer />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
