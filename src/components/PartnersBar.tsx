const techStack = ["TypeScript", "React", "Java", "C#", "Cloud"];

const PartnersBar = () => {
  return (
    <div className="flex flex-col items-center gap-4 pb-8">
      <span
        className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body"
        style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
      >
        Tech Stack
      </span>
      <div className="flex items-center gap-8 md:gap-16 flex-wrap justify-center">
        {techStack.map((name) => (
          <span
            key={name}
            className="text-2xl md:text-3xl font-heading italic text-white tracking-tight"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5), 0 4px 24px rgba(0,0,0,0.3)" }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PartnersBar;
