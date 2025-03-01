import React from "react";
import logo from "../assets/logo.png";
const Footer = () => {
  return (
    <footer className="bg-black/90 py-12 text-gray-300">
      <div className="mx-auto w-11/12 md:w-10/12">
        <div className="mx-auto px-4 container">
          {/* Grid Layout */}
          <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
            {/* Brand Section */}
            <div>
              <h1 className="flex items-center gap-2 font-bold text-white text-2xl">
                <img className="w-6 h-6" src={logo} /> Tutorly
              </h1>
              <p className="mt-4 text-sm">
                Connecting learners with expert tutors worldwide. Join us to
                make learning easy, accessible, and personalized.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h2 className="font-semibold text-white text-xl">Quick Links</h2>
              <ul className="space-y-2 mt-4">
                <li>
                  <a href="/" className="hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/tutors" className="hover:text-white">
                    Find Tutors
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media & Newsletter */}
            <div>
              <h2 className="font-semibold text-white text-xl">
                Stay Connected
              </h2>
              <p className="mt-4 text-sm">
                Follow us on social media and subscribe to our newsletter for
                updates and offers.
              </p>
              {/* Social Icons */}
              <div className="flex space-x-4 mt-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                  aria-label="Facebook"
                >
                  <i className="fa-facebook-f fab"></i>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                  aria-label="Twitter"
                >
                  <i className="fa-twitter fab"></i>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                  aria-label="Instagram"
                >
                  <i className="fa-instagram fab"></i>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                  aria-label="LinkedIn"
                >
                  <i className="fa-linkedin-in fab"></i>
                </a>
              </div>
              {/* Newsletter */}
              <form className="mt-6">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="flex items-center">
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="px-4 py-2 rounded-l-md focus:outline-none w-full text-gray-900"
                  />
                  <button
                    type="submit"
                    className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-r-md text-white"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-12 pt-6 border-gray-700 border-t text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Tutorly. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
