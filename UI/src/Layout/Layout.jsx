import Header from "@/components/Header";
import About from "@/pages/About";
import Experience from "@/pages/Experience";
import Footer from "@/pages/Footer";
import Intro from "@/pages/Intro";

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
