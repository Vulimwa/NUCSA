import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import nucsaLogo from "@/images/nucsa-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Membership", href: "/membership" },
    { name: "Events", href: "/events" },
    { name: "Blog", href: "/blog" },
    { name: "Gallery", href: "/gallery" },
    { name: "Leadership", href: "/leadership" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={nucsaLogo}
                alt="NUCSA Logo"
                className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
                style={{ minWidth: "1.5rem" }}
              />
              <span className="font-bold text-lg sm:text-xl text-gray-900">
                NUCSA
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item) =>
              item.name === "Leadership" ? (
                <div className="relative group" key={item.name}>
                  <button
                    className={`text-sm font-medium transition-colors flex items-center gap-1 focus:outline-none ${
                      isActive(item.href)
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    } py-2 bg-transparent border-0`}
                    tabIndex={0}
                  >
                    <span className="inline-flex items-center gap-1">
                      Leadership
                      <svg
                        className="w-4 h-4 ml-1 text-blue-500 group-hover:rotate-180 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </button>
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-blue-100 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-all z-50 scale-95 group-hover:scale-100 group-focus-within:scale-100">
                    <div className="p-4 flex flex-col gap-2">
                      <Link
                        to="/leadership"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition cursor-pointer text-gray-800 font-semibold text-base hover:text-blue-700"
                        tabIndex={0}
                      >
                        <svg
                          className="w-5 h-5 text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16 7a4 4 0 01-8 0"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 14v7m-4-4h8"
                          />
                        </svg>
                        View Leadership
                      </Link>
                      <Link
                        to="/ward-representative"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition cursor-pointer text-gray-800 font-semibold text-base hover:text-green-700"
                        tabIndex={0}
                      >
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 7v4a1 1 0 001 1h3m10-5v4a1 1 0 01-1 1h-3m-4 0v4a1 1 0 001 1h3m-4 0v4a1 1 0 001 1h3m-4 0v4a1 1 0 001 1h3"
                          />
                        </svg>
                        Ward Reps
                      </Link>
                      <div className="px-3 pt-2 pb-1 text-xs text-gray-500">
                        Choose to view the executive leadership or your local ward
                        representative.
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  } py-2`}
                >
                  {item.name}
                </Link>
              )
            )}
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-sm px-4 py-2"
            >
              <Link to="/membership">Join NUCSA</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 w-full"
              >
                <Link to="/membership" onClick={() => setIsOpen(false)}>
                  Join NUCSA
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
