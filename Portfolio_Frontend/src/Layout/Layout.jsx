import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Intro from "@/pages/Intro";
import About from "@/pages/About";
import Experience from "@/pages/Experience";
import Footer from "@/pages/Footer";

const Layout = () => {
  return (
    <>
      <div className="bg-[#020c1b] ">
        {" "}
        <Header />
        <div id="home">
          <Intro />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="experience">
          <Experience />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
