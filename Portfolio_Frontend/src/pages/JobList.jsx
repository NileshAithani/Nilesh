import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "../index.css"; // Import your CSS file

const experienceItems = {
  AventIQ: {
    jobTitle: "Software Developer @",
    duration: "MAY 2023 - PRESENT",
    desc: [
      "Led the development of a multi-tenant SaaS project management platform, leveraging AWS serverless architecture to ensure high scalability, availability, and cost-efficiency.",
      "Implemented backend workflows using AWS Lambda, API Gateway, and MongoDB to support modular, event-driven services such as task tracking, user activity logging, and workspace analytics.",
      "Integrated AWS Cognito for secure, multi-workspace authentication and fine-grained role-based access control, enabling seamless onboarding and workspace switching.",
      "Built secure file handling and versioning mechanisms using Amazon S3 with signed URLs and metadata tagging for real-time document collaboration features.",
      "Automated notifications and status pipelines using Step Functions and EventBridge, facilitating dynamic activity feeds and real-time workflow updates.",
      "Implemented monitoring, alerting, and debugging pipelines with AWS CloudWatch and X-Ray to track usage patterns and system health metrics across tenants.",
      "Enhanced platform automation by building RPA bots for report generation, data validation, and external API integrations using Power Automate.",
      "Collaborated closely with UI/UX and DevOps teams to ensure a seamless developer experience, CI/CD automation, and optimized cloud resource provisioning.",
    ],
  },
  "TCS iON": {
    jobTitle: "Software Development Intern @",
    duration: "JUL 2022 - SEP 2022",
    desc: [
      "Developed a full-stack food ordering application using React for the frontend, Node.js for the backend, and SQL for structured data management.",
      "Designed and implemented user-friendly features including dynamic menus, cart management, and order tracking to streamline the food ordering experience.",
      "Built a responsive UI with React and Tailwind CSS, ensuring seamless user experience across devices and optimizing performance for high user engagement.",
      "Created RESTful APIs in Node.js and integrated SQL queries to enable real-time data access, secure user authentication, and efficient order processing.",
    ],
  },
  "Amity University": {
    jobTitle: "Research Engineer @",
    duration: "MAY 2021 - SEPT 2021",
    desc: [
      "Conducted research and development on machine learning models to optimize data processing pipelines, leveraging coursework in algorithms and data structures.",
      "Collaborated with faculty and peers on a computer vision project, applying Python and TensorFlow to analyze and classify image datasets.",
      "Designed and implemented software solutions for experimental simulations, utilizing knowledge from computer science coursework in programming and system design.",
      "Contributed to technical reports and presentations, enhancing communication skills and translating complex concepts for interdisciplinary teams.",
    ],
  },
};

const JobList = () => {
  const [visibleCompany, setVisibleCompany] = useState(
    Object.keys(experienceItems)[0]
  );
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });

  useEffect(() => {
    setVisibleCompany(Object.keys(experienceItems)[0]);
  }, []);

  // Animation variants for the list and list items
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <Tabs
      defaultValue={Object.keys(experienceItems)[0]}
      className="w-full mx-auto py-6 px-4 flex flex-col md:flex-row"
      onValueChange={(value) => setVisibleCompany(value)}
    >
      {/* Tabs List */}
      <TabsList
        role="tablist"
        className="flex flex-col justify-start space-y-4 mb-6 border-green-200 w-full md:w-1/4"
      >
        {Object.keys(experienceItems).map((company) => (
          <TabsTrigger
            key={company}
            value={company}
            role="tab"
            className={`flex px-6 py-2 text-base font-semibold text-gray-300 hover:text-green-300 transition-all duration-200 ease-in-out border-l-4 border-transparent hover:text-green-300 ${
              visibleCompany === company
                ? "border-gray-300 text-green-300 bg-gray-700"
                : ""
            }`}
          >
            {company}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Tabs Content */}
      <div className="w-full md:w-3/4 ml-6 space-y-4" ref={ref}>
        <AnimatePresence mode="wait">
          {Object.entries(experienceItems).map(
            ([company, { jobTitle, duration, desc }]) => (
              <TabsContent key={company} value={company} className="w-[1000px]">
                <motion.div
                  className="px-6 shadow-lg rounded-lg transition-all duration-200 hover:shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-gray-300 mb-2">
                    {jobTitle} <span className="text-green-600">{company}</span>
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">{duration}</p>
                  <motion.ul
                    className="list-disc list-inside text-gray-700 space-y-2"
                    variants={listVariants}
                    initial="hidden"
                    animate={
                      inView && visibleCompany === company
                        ? "visible"
                        : "hidden"
                    }
                  >
                    {desc.map((item, index) => (
                      <motion.li
                        key={index}
                        className="pl-1 text-gray-500 text-md w-[700px]"
                        variants={itemVariants}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </TabsContent>
            )
          )}
        </AnimatePresence>
      </div>
    </Tabs>
  );
};

export default JobList;
