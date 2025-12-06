import { Link, useLocation } from "@tanstack/react-router";

const Footer = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Freelancers", path: "/" },
    { name: "Jobs", path: "/searchjobs" },
    { name: "Messages", path: "/messages" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-3 shadow-lg z-50">
      <nav className="flex items-center justify-center gap-2 px-4">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`px-4 py-2 rounded-full font-medium text-sm transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "border border-slate-300 text-slate-600 bg-white hover:border-indigo-500 hover:text-indigo-600"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </footer>
  );
};

export default Footer;
