const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07070d]">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-heading italic gradient-text">404</h1>
        <p className="mb-4 text-lg text-white/40 font-body">Page not found</p>
        <a href="/" className="text-violet-400 font-body hover:text-violet-300 transition-colors">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
