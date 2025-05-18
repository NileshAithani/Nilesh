import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { Link as ScrollLink } from "react-scroll"; // Importing from react-scroll
import logonileshaithani from "../assets/Logo/logo-nilesh-aithani.png"

const Header = () => {
  return (
    <nav className=" fixed z-10 flex justify-evenly w-full p-3 text-lg shadow-lg  bg-[#020c1b] text-white">
      <div>
        <ScrollLink to="home" smooth={true} duration={500} aria-label="Home">
          <div className="font-mullish font-bold text-2xl">
          <img src={logonileshaithani} />
           </div>
        </ScrollLink>
      </div>

      {/* Navigation Items */}
      <ul className="flex justify-between items-center gap-9 font-mullish font-bold transition-all duration-200 ">
        <li>
          <ScrollLink
            to="home"
            className="text-white hover:text-green-300"
            smooth={true}
            duration={500}
            aria-label="Home"
          >
            Home
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            to="about"
            className="text-white hover:text-green-300"
            smooth={true}
            duration={500}
            aria-label="About"
          >
            About
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            to="experience"
            className="text-white hover:text-green-300"
            smooth={true}
            duration={500}
            aria-label="Experience"
          >
            Experience
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            to="projects"
            className="text-white hover:text-green-300"
            smooth={true}
            duration={500}
            aria-label="Projects"
          >
            Projects
          </ScrollLink>
        </li>
      </ul>

      <div className="flex gap-3 justify-center items-center text-xl">
        <a
          href="https://github.com/NileshAithani"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-green-300"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/nilesh-aithani-7349a81b1/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:text-green-300"
        >
          <FaLinkedin />
        </a>
        <a
          href="mailto:nileshaithani007@gmail.com"
          aria-label="Email"
          className="hover:text-green-300"
        >
          <IoMdMail />
        </a>
      </div>
    </nav>
  );
};

export default Header;
