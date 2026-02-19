import { Outlet } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";

/**
 * Layout - Root layout component for all pages
 * Includes ScrollToTop functionality for automatic scroll on navigation
 */
export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}
