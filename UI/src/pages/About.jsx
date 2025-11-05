import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import my from "../assets/Logo/Nilesh.jpeg";
import resume from "../assets/Logo/Nilesh_Resume.pdf";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const oneDesc = (
    <motion.p
      className="text-slate-400 text-base sm:text-lg leading-relaxed"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      I am currently a Software Developer at AventIQ, working in Website
      Development and Robotic Process Automation.
    </motion.p>
  );

  const twoDesc = (
    <motion.p
      className="text-slate-400 text-base sm:text-lg mt-4 leading-relaxed"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      Outside of work, I’m interested in following developments in science.
      I also enjoy gaming and creating short videos.
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

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
    <section
      id="about"
      className="w-full bg-[#020c1b] font-ntr px-6 sm:px-10 md:px-16 lg:px-28 py-24 sm:py-32"
    >
      <div
        className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-20"
        ref={ref}
      >
        {/* Text Content */}
        <div className="flex-1 text-slate-400 max-w-2xl text-center md:text-left">
          <motion.h1
            className="text-white text-4xl sm:text-5xl md:text-6xl font-bold pb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            / about me
          </motion.h1>

          {oneDesc}

          <motion.p
            className="font-semibold mt-6 text-lg sm:text-xl text-green-400"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Technologies I’ve been working with:
          </motion.p>

          <motion.ul
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-left"
            variants={listVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {techStack.map((tech_item, index) => (
              <motion.li
                key={index}
                className="relative pl-6 text-slate-300 text-sm sm:text-base before:content-['▹'] before:text-green-500 before:absolute before:left-0 before:top-1"
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
            className="inline-block mt-8 px-6 py-3 bg-green-400 hover:bg-green-500 text-[#020c1b] font-bold text-lg rounded-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Resume +
          </motion.a>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center md:justify-end">
          <motion.img
            src={my}
            alt="Nilesh"
            className="w-56 sm:w-64 md:w-72 lg:w-80 h-auto rounded-2xl shadow-lg border-2 border-green-500/20 hover:border-green-400/60 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
