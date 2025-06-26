const Footer = () => {
  return (
    <div className="w-full mt-2  pt-6 md:pt-2 md:px-10 bg-[#020c1b] font-ntr">
      <div className="flex justify-center items-center pt-32">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          <div className="flex-1  text-slate-400 text-base md:text-lg px-4 md:px-0 max-w-2xl">
            <p className="text-white text-sm m-2 flex flex-col">
              <span>Built and designed by Nilesh Aithani.</span>
              <span className="text-center">All rights reserved. ©</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
