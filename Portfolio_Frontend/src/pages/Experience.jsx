import JobList from "./JobList";

const Experience = () => {
  return (
    <div className="w-full pt-6 md:pt-2 md:px-10 bg-[#020c1b] ">
      <div className="flex justify-center items-center pt-32">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          <article className="flex-1 text-slate-400 text-base md:text-lg px-4 md:px-0 max-w-5xl">
            <h1 className="text-white text-6xl pb-7 font-bold">/experience</h1>
            <p className="mb-4 text-slate-400">
              Explore my professional journey and the skills I have developed
              through various roles.
            </p>
            <JobList />
          </article>
        </div>
      </div>
    </div>
  );
};

export default Experience;
