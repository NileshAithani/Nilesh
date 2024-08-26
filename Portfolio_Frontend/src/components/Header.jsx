import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="flex justify-evenly w-full p-3 text-lg shadow-lg  bg-[#020c1b] text-white">
      <div>
        <Link to={"/home"} aria-label="Home">
          <div className="font-mullish font-bold text-2xl">Nilesh Aithani</div>
        </Link>
      </div>

      {/* Navigation Items */}
      <ul className="flex justify-between items-center gap-9 font-mullish font-bold transition-all duration-200 ">
        <li>
          <Link
            to={"/home"}
            className="text-white hover:text-green-300"
            aria-label="Home"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to={"/about"}
            className="text-white hover:text-green-300"
            aria-label="About"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to={"/experience"}
            className="text-white hover:text-green-300"
            aria-label="Contact Us"
          >
            Experience
          </Link>
        </li>
        <li>
          <Link
            to={"/projects"}
            className="text-white hover:text-green-300"
            aria-label="Contact Us"
          >
            Projects
          </Link>
        </li>
      </ul>

      {/* Uncomment if needed */}
      <div className="flex justify-between items-center gap-9 font-mullish font-bold transition-all duration-200 ">
        <Link to={"/register"} className="text-white hover:text-green-300">
          Sign Up
        </Link>
      </div>

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
