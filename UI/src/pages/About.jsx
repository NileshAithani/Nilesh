import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import my from "../assets/Logo/Nilesh.jpeg";
import resume from "../assets/Logo/Nilesh_Resume.pdf";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const oneDesc = (
    <motion.p
      className="text-slate-400 text-md md:text-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      I am currently a Software Developer at AventIQ, working in the Website
      Development and Robotic Process Automation.
    </motion.p>
  );

  const twoDesc = (
    <motion.p
      className="text-slate-400 text-md md:text-lg mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      Outside of work, I am interested in following the developments of science.
      I also play a lot of video games and make short videos.
    </motion.p>
  );

  const techStack = [
    "JavaScript (ES6+)",
    "React.js",
    "Node.js",
    "Java",
    "SQL",
    "MongoDB",
    "Power Automate",
    "AWS Lambda",
    "API Gateway",
    "AWS Cognito",
    "S3",
    "Step Functions",
    "CloudWatch",
    "CloudFormation",
  ];

  // Animation variants for the tech stack list
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay between each list item
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full pt-6 md:pt-2 md:px-10 bg-[#020c1b] font-ntr">
      <div className="flex justify-center items-center pt-32 text">
        <div
          className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16"
          ref={ref}
        >
          <div className="flex-1 text-slate-400 text-base md:text-lg px-4 md:px-0 max-w-2xl">
            <motion.h1
              className="text-white text-6xl pb-7 font-bold font-ntr"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              / about me
            </motion.h1>
            {oneDesc}
            <motion.p
              className="font-semibold mt-4 text-lg md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Here are some technologies I have been working with:
            </motion.p>
            <motion.ul
              className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none mt-4"
              variants={listVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {techStack.map((tech_item, index) => (
                <motion.li
                  key={index}
                  className="relative pl-6 text-base text-slate-400 before:content-['▹'] before:text-green-500 before:absolute before:left-0 before:top-1"
                  variants={itemVariants}
                >
                  {tech_item}
                </motion.li>
              ))}
            </motion.ul>
            {twoDesc}
            <motion.a
              href={resume}
              download="Nilesh_Resume.pdf"
              className="inline-block text-xl border-green p-2 rounded-md bg-green-400 mt-10 text-white font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Resume +
            </motion.a>
          </div>
          <div className="flex-1 text-center md:text-left max-w-sm">
            <motion.img
              src={my}
              alt="Nilesh"
              className="max-w-[290px] h-auto rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: "easeInOut" } }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;