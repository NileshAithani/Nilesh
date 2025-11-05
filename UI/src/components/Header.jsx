import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { Link as ScrollLink } from "react-scroll";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import logonileshaithani from "../assets/Logo/logo-nilesh-aithani.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="fixed z-50 flex justify-between items-center w-full px-6 py-3 bg-[#020c1b] text-white shadow-lg">
      {/* Logo */}
      <div className="flex items-center">
        <ScrollLink to="home" smooth={true} duration={500} aria-label="Home">
          <img
            src={logonileshaithani}
            alt="Nilesh Aithani Logo"
            className="h-10 cursor-pointer"
          />
        </ScrollLink>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-8 font-ntr font-bold">
        {["home", "about", "experience", "projects"].map((section) => (
          <li key={section}>
            <ScrollLink
              to={section}
              className="text-white hover:text-green-300 transition-all duration-200 cursor-pointer"
              smooth={true}
              duration={500}
              onClick={handleLinkClick}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </ScrollLink>
          </li>
        ))}
      </ul>

      {/* Social Links (Desktop) */}
      <div className="hidden md:flex gap-4 text-xl">
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

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-3xl focus:outline-none"
        onClick={handleMenuToggle}
        aria-label="Toggle menu"
      >
        {menuOpen ? <HiX /> : <HiMenuAlt3 />}
      </button>

      {/* Mobile Dropdown Menu */}
      <div
        className={`absolute top-16 left-0 w-full bg-[#020c1b] text-center flex flex-col items-center gap-6 py-6 transition-all duration-300 md:hidden ${
          menuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        {["home", "about", "experience", "projects"].map((section) => (
          <ScrollLink
            key={section}
            to={section}
            className="text-lg text-white hover:text-green-300 font-ntr font-semibold transition-all duration-200 cursor-pointer"
            smooth={true}
            duration={500}
            onClick={handleLinkClick}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </ScrollLink>
        ))}

        {/* Social Links (Mobile) */}
        <div className="flex gap-6 text-2xl mt-4">
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
      </div>
    </nav>
  );
};

export default Header;
