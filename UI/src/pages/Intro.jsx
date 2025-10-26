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

  // Animation variants for staggered effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each child animation
      },
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
      className="flex flex-col items-center space-y-6 pt-72 pl-48 pr-48 pb-24 bg-[#020c1b]"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      ref={ref}
    >
      <motion.header
        className="text-center text-8xl font-ntr text-white pt-32"
        variants={childVariants}
      >
        hi, <span className="text-green-400 font-bold">nilesh</span> here.
      </motion.header>

      <motion.p
        className="text-4xl text-gray-400 text-center font-ntr"
        variants={childVariants}
      >
        I’m a <span className="font-bold">{description} Developer</span>
      </motion.p>

      <motion.p
        className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed text-start font-ntr"
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

      <motion.a
        href="mailto:nileshaithani007@gmail.com"
        className="flex items-center text-green-400 hover:text-green-600 transition-colors duration-300 border p-4 rounded-md"
        aria-label="Send an email to Nilesh"
        variants={childVariants}
      >
        <IoMdMail className="mr-2 text-2xl" />
        <span className="text-2xl font-bold font-ntr">Say hi!</span>
      </motion.a>
    </motion.section>
  );
};

export default Intro;
