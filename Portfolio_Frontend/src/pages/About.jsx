import my from "../assets/Logo/Nilesh.jpeg";
import resume from "../assets/Logo/Nilesh_Resume.pdf";

const About = () => {
  const oneDesc = (
    <p className="text-slate-400 text-md md:text-lg ">
      I am currently a Software Development Engineer at MSL Tech, working in the
      Website Development and Robotic Process Automation.
    </p>
  );

  const twoDesc = (
    <p className="text-slate-400 text-md md:text-lg mt-4">
      Outside of work, I am interested in following the developments of science.
      I also play a lot of video games and make short videos.
    </p>
  );

  const techStack = [
    "Javascript ES6+",
    "React.js",
    "Java",
    "Node.js",
    "SQL",
    "Power Automate",
    "AWS",
    "DynamoDB",
  ];

  return (
    <div className="w-full  pt-6 md:pt-2 md:px-10 bg-[#020c1b] ">
      <div className="flex justify-center items-center pt-32">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          <div className="flex-1  text-slate-400 text-base md:text-lg px-4 md:px-0 max-w-2xl">
            <h1 className="text-white text-6xl pb-7 font-bold ">/about me</h1>
            {oneDesc}
            <p className="font-semibold mt-4 text-lg md:text-xl">
              Here are some technologies I have been working with:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none mt-4">
              {techStack.map((tech_item, index) => (
                <li
                  key={index}
                  className="relative pl-6 text-base text-slate-400 before:content-['▹'] before:text-green-500 before:absolute before:left-0 before:top-1"
                >
                  {tech_item}
                </li>
              ))}
            </ul>
            {twoDesc}
            <a
              href={resume}
              download="Nilesh_Resume.pdf"
              className="inline-block text-xl border-green p-2 rounded-md bg-green-400 mt-10 text-white font-bold"
            >
              Resume +
            </a>
          </div>
          <div className="flex-1 text-center md:text-left max-w-sm">
            <img
              src={my}
              alt="Nilesh"
              className="max-w-[300px] h-auto rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
