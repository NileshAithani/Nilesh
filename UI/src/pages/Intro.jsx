import { useState, useEffect, useRef } from "react";
import { IoMdMail } from "react-icons/io";
import { motion, useInView } from "framer-motion";

const descriptions = ["Full Stack", "RPA"];

const Intro = () => {
  const [description, setDescription] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  useEffect(() => {
    const updateDescription = () => {
      const randomIndex = Math.floor(Math.random() * descriptions.length);
      setDescription(descriptions[randomIndex]);
    };

    updateDescription();
    const intervalId = setInterval(updateDescription, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="flex flex-col items-center justify-center text-center bg-[#020c1b] px-6 sm:px-12 md:px-24 lg:px-48 pt-32 md:pt-60 pb-24 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Greeting */}
      <motion.h1
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-ntr text-white font-semibold"
        variants={childVariants}
      >
        hi, <span className="text-green-400 font-bold">nilesh</span> here.
      </motion.h1>

      {/* Dynamic Title */}
      <motion.p
        className="text-2xl sm:text-3xl md:text-4xl text-gray-400 font-ntr"
        variants={childVariants}
      >
        I’m a <span className="font-bold text-green-400">{description} Developer</span>
      </motion.p>

      {/* Bio / Description */}
      <motion.p
        className="text-base sm:text-lg md:text-xl text-gray-400 font-ntr leading-relaxed text-center md:text-justify max-w-5xl"
        variants={childVariants}
      >
        I'm a software engineer based in Delhi, India, passionate about building
        scalable and impactful digital solutions. I specialize in developing
        modern web applications using React, Node.js, and MongoDB. With hands-on
        experience in AWS services—including serverless architectures with
        Lambda, Cognito for authentication, and S3 for storage—I design and
        deploy secure, high-performance systems. I also bring expertise in
        Robotic Process Automation (RPA), automating workflows across platforms
        like the web and Excel.
      </motion.p>

      {/* Contact Button */}
      <motion.a
        href="mailto:nileshaithani007@gmail.com"
        aria-label="Send an email to Nilesh"
        variants={childVariants}
        className="flex items-center justify-center gap-2 mt-4 border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-[#020c1b] transition-all duration-300 px-6 py-3 rounded-xl text-lg sm:text-xl font-ntr font-bold"
      >
        <IoMdMail className="text-2xl" />
        <span>Say hi!</span>
      </motion.a>
    </motion.section>
  );
};

export default Intro;
