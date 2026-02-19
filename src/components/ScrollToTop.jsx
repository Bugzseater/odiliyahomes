import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop - Automatically scrolls to top of page on route change
 * This component should be placed inside the Router component
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Optional: adds smooth scrolling animation
    });
  }, [pathname]);

  return null; // This component doesn't render anything
}
