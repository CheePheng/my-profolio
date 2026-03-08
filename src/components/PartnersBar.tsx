const techStack = ["TypeScript", "React", "Java", "C#", "Cloud"];

const PartnersBar = () => {
  return (
    <div className="flex flex-col items-center gap-4 pb-8">
      <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-foreground font-body">
        Tech Stack
      </span>
      <div className="flex items-center gap-8 md:gap-16 flex-wrap justify-center">
        {techStack.map((name) => (
          <span
            key={name}
            className="text-2xl md:text-3xl font-heading italic text-foreground tracking-tight"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PartnersBar;
