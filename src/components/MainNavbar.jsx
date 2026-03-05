import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/odiliyalogo.png";
import PhoneDropdown from "./PhoneDropdown";
import "@/styles/MainNavbar.css";

export default function MainNavbar() {
  const { pathname } = useLocation();
  const [isSpecialPage, setIsSpecialPage] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setIsSpecialPage(
      pathname === "/" ||
        pathname === "/residence" ||
        pathname === "/lands" ||
        pathname === "/icon"
    );
  }, [pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsAboutDropdownOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Handle scroll to show/hide navbar
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show navbar at the top of the page
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up - show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/icon", label: "ICON" },
    { path: "/residence", label: "Residencies" },
    { path: "/lands", label: "Lands" },
    {
      path: "/about",
      label: "About Us",
      dropdown: [
        { path: "/about", label: "Overview" },
        { path: "/about/leaderboard", label: "Leaderboard" },
      ],
    },
    { path: "/news", label: "News" },
    { path: "/contact", label: "Contact Us" },
  ];

  // Check if current path is within about section
  const isAboutActive = pathname.startsWith("/about");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleAboutDropdown = () => {
    setIsAboutDropdownOpen(!isAboutDropdownOpen);
  };

  return (
    <nav
      className={`main-navbar${isSpecialPage ? " main-navbar--residence" : ""}${
        !isVisible ? " navbar-hidden" : ""
      }`}
    >
      <div className="navbar-logo">
        <a href="/">
          <img src={logo} alt="Odiliya Logo" height={40} />
        </a>
      </div>

      {/* Navigation and Phone Numbers Container */}
      <div className="navbar-content">
        {/* Navigation Links */}
        <ul className={`navbar-links ${isMobileMenuOpen ? "mobile-open" : ""}`}>
          {navItems.map((item) => (
            <li
              key={item.path}
              className={item.dropdown ? "navbar-item--dropdown" : ""}
              onMouseEnter={() =>
                item.dropdown &&
                window.innerWidth > 768 &&
                setIsAboutDropdownOpen(true)
              }
              onMouseLeave={() =>
                item.dropdown &&
                window.innerWidth > 768 &&
                setIsAboutDropdownOpen(false)
              }
            >
              {item.dropdown ? (
                <div className="navbar-dropdown">
                  <div className="dropdown-trigger">
                    <Link
                      to={item.path}
                      className={isAboutActive ? "active" : ""}
                    >
                      {item.label}
                      <svg
                        className={`dropdown-arrow desktop-arrow ${
                          isAboutDropdownOpen ? "open" : ""
                        }`}
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                      >
                        <path
                          d="M1 1L6 6L11 1"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                    <button
                      className="mobile-dropdown-toggle"
                      onClick={toggleAboutDropdown}
                      aria-label="Toggle About dropdown"
                    >
                      <svg
                        className={`dropdown-arrow ${
                          isAboutDropdownOpen ? "open" : ""
                        }`}
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                      >
                        <path
                          d="M1 1L6 6L11 1"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <ul
                    className={`dropdown-menu ${
                      isAboutDropdownOpen ? "open" : ""
                    }`}
                  >
                    {item.dropdown.map((dropdownItem) => (
                      <li key={dropdownItem.path}>
                        <Link
                          to={dropdownItem.path}
                          className={
                            pathname === dropdownItem.path ? "active" : ""
                          }
                        >
                          {dropdownItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={pathname === item.path ? "active" : ""}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Phone Numbers */}
        <PhoneDropdown />
      </div>

      {/* Hamburger Menu Button */}
      <button
        className={`hamburger-menu ${isMobileMenuOpen ? "open" : ""}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div className="navbar-overlay" onClick={toggleMobileMenu}></div>
      )}
    </nav>
  );
}
