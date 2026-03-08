import { ArrowUpRight, Menu, Sun, Moon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import { useTheme } from "next-themes";

const navLinks = ["Home", "About", "Projects", "Resume", "Contact"];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-8 lg:px-16">
      <div className="flex items-center justify-between">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="h-12 w-12"
          style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))" }}
        />

        {/* Center nav - desktop */}
        <div
          className="hidden md:flex items-center liquid-glass rounded-full px-2 py-1.5 gap-1"
          style={{
            background: "rgba(0,0,0,0.25)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition-colors"
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="px-3.5 py-1.5 text-sm font-medium font-body rounded-full flex items-center gap-1.5 bg-white text-black"
          >
            Contact Me
            <ArrowUpRight className="h-4 w-4" />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 transition-colors ml-1"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4 text-white" /> : <Moon className="h-4 w-4 text-white" />}
          </button>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="liquid-glass rounded-full p-2.5"
            style={{ background: "rgba(0,0,0,0.25)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5 text-white" />}
          </button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="liquid-glass rounded-full p-2.5"
                style={{ background: "rgba(0,0,0,0.25)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
              >
                <Menu className="h-5 w-5 text-white" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-gray-950 border-gray-800">
              <SheetTitle className="text-foreground font-heading italic text-2xl mb-6">Menu</SheetTitle>
              <div className="flex flex-col gap-4 mt-4">
                {navLinks.map((link) => (
                  <button
                    key={link}
                    onClick={() => { scrollTo(link.toLowerCase()); setOpen(false); }}
                    className="text-left text-lg font-body text-white/90 hover:text-white transition-colors py-2"
                  >
                    {link}
                  </button>
                ))}
                <button
                  onClick={() => { scrollTo("contact"); setOpen(false); }}
                  className="mt-4 px-5 py-2.5 text-sm font-medium font-body rounded-full flex items-center gap-2 w-fit bg-white text-black"
                >
                  Contact Me
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="w-12 hidden md:block" />
      </div>
    </nav>
  );
};

export default Navbar;
