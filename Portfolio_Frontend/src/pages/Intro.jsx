import { useState, useEffect } from "react";
import { IoMdMail } from "react-icons/io";


const descriptions = ["Full Stack", "RPA"];

const Intro = () => {
  const [description, setDescription] = useState("");

  useEffect(() => {
    const updateDescription = () => {
      const randomIndex = Math.floor(Math.random() * descriptions.length);
      setDescription(descriptions[randomIndex]);
    };

    updateDescription();

    const intervalId = setInterval(updateDescription, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="flex flex-col items-center space-y-6 p-8 mx-auto bg-[#020c1b] ">
   
      <header className="text-center text-6xl text-white pt-32">
        hi, <span className="text-green-400 font-bold">nilesh</span> here.
      </header>

      <p
        className="text-4xl text-white text-center"
        style={{ fontFamily: "NTR, sans-serif" }}
      >
        I’m a <span className="font-bold">{description} Developer</span>
      </p>

      <p
        className="text-xl text-gray-300 text-center max-w-3xl mx-auto leading-relaxed text-start "
        style={{ fontFamily: "NTR, sans-serif" }}
      >
        I'm a software engineer from Delhi, India. I'm fascinated by
        large-scale, high-impact products and have contributed to major feature
        launches in industry-leading services also specialize in RPA (Robotic
        Process Automation), where I automate various processes such as web and
        Excel automation.
      </p>

      <a
        href="mailto:nileshaithani007@gmail.com"
        className="flex items-center text-blue-400 hover:text-blue-600 transition-colors duration-300 border p-4 rounded-md"
        aria-label="Send an email to Nilesh"
      >
        <IoMdMail className="mr-2 text-4xl" />
        <span className="text-3xl font-bold ">Say hi!</span>
      </a>
    </section>
  );
};

export default Intro;
