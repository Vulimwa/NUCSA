import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Calendar, Book, Contact } from "lucide-react";
import nucsaLogo from "@/images/nucsa-logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src={nucsaLogo} alt="NUCSA Logo" className="h-8 w-8" />
              <span className="font-bold text-xl">NUCSA</span>
            </div>
            <p className="text-gray-300 max-w-md">
              Nairobi Universities Colleges and Students Association - A registered
              Community-Based Organization uniting all college and university students
              within Nairobi County.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About NUCSA
                </Link>
              </li>
              <li>
                <Link to="/membership" className="text-gray-300 hover:text-white transition-colors">
                  Join Us
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/leadership" className="text-gray-300 hover:text-white transition-colors">
                  Leadership
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-300">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=nairobistudentsassociation@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                title="Send Email via Gmail"
              >
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="sr-only">Email:</span>
                nairobistudentsassociation@gmail.com
              </a>
              <p className="flex items-center gap-2"><Phone className="h-5 w-5 text-green-400" /> +254 112428539</p>
              <p className="flex items-center gap-2"><MapPin className="h-5 w-5 text-yellow-400" /> Nairobi, Kenya</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 NUCSA - Nairobi Universities Colleges and Students Association.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
