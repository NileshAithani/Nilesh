import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "../index.css"; // Import your CSS file

const experienceItems = {
  AventIQ: {
    jobTitle: "Software Developer @",
    duration: "MAY 2023 - PRESENT",
    desc: [
      "Designed and developed automation bots across various business processes, enhancing operational efficiency and reducing manual effort.",
      "Implemented RPA solutions that processed large volumes of data, ensuring accuracy and consistency in task execution.",
      "Collaborated with cross-functional teams to identify automation opportunities and optimize workflows, resulting in a significant reduction in turnaround times.",
    ],
  },
  "TCS iON": {
    jobTitle: "Software Development Intern @",
    duration: "JUL 2022 - SEP 2022",
    desc: [
      "Led the development of a comprehensive tourism and hospitality website, integrating user-friendly features to enhance the travel planning experience. This initiative streamlined the booking process and improved accessibility for users.",
      "Implemented a responsive design and optimized the website's performance, resulting in an engaging user experience that caters to travelers worldwide.",
    ],
  },

  "Amity University": {
    jobTitle: "Research Engineer @",
    duration: "MAY 2021 - SEPT 2021",
    desc: [
      "Developed and researched an NLP-based framework using state-of-the-art tools like Spacy and Stanza to facilitate the derivation of requirements from health data by leveraging syntactic dependencies, entity-recognition, and rule-based match-making.",
      'Application selected for DCS Research Award ($4,000) as part of the "Visualizing Privacy Analysis Results" project led by Professor Marsha Chechik.',
    ],
  },
};

const JobList = () => {
  const [visibleCompany, setVisibleCompany] = useState(
    Object.keys(experienceItems)[0]
  );

  useEffect(() => {
    // Set the active tab on mount
    setVisibleCompany(Object.keys(experienceItems)[0]);
  }, []);

  return (
    <Tabs
      defaultValue={Object.keys(experienceItems)[0]}
      className="w-full mx-auto py-6 px-4 flex flex-col md:flex-row"
      onValueChange={(value) => setVisibleCompany(value)} // Update state on tab change
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
                ? "border-gray-300 text-green-300 bg-gray-700 "
                : ""
            }`}
          >
            {company}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Tabs Content */}
      <div className="w-full md:w-3/4 ml-6 space-y-4">
        {Object.entries(experienceItems).map(
          ([company, { jobTitle, duration, desc }]) => (
            <TabsContent key={company} value={company} className="w-[1000px]">
              <div className="px-6  shadow-lg rounded-lg transition-all duration-200 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-300 mb-2">
                  {jobTitle} <span className="text-green-600"> {company}</span>
                </h3>
                <p className="text-gray-500 text-sm mb-4">{duration}</p>
                <ul
                  className={`list-disc list-inside text-gray-700 space-y-2 fade-in ${
                    visibleCompany === company ? "fade-in-visible" : ""
                  }`}
                >
                  {desc.map((item, index) => (
                    <li key={index} className="pl-1  text-gray-500 text-md w-[700px]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          )
        )}
      </div>
    </Tabs>
  );
};

export default JobList;
