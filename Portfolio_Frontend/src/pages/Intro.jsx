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
    <section className="flex flex-col items-center space-y-6 pt-72 pl-48 pr-48 pb-20 bg-[#020c1b] ">
      <header className="text-center text-8xl font-ntr text-white pt-32">
        hi, <span className="text-green-400 font-bold">nilesh</span> here.
      </header>

      <p className="text-4xl text-gray-400 text-center font-ntr">
        I’m a <span className="font-bold">{description} Developer</span>
      </p>

      <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed text-start font-ntr ">
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
        <IoMdMail className="mr-2 text-2xl" />
        <span className="text-2xl font-bold font-ntr">Say hi!</span>
      </a>
    </section>
  );
};

export default Intro;
