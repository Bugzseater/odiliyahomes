import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Icon from "@/pages/Icon";
import Residence from "@/pages/Residence";
import Lands from "@/pages/Lands";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import News from "@/pages/News";
import Leaderboard from "@/pages/Leaderboard";
import ProjectDetails from "@/pages/ProjectDetails";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsAndConditions from "@/pages/TermsAndConditions";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "icon",
        element: <Icon />,
      },
      {
        path: "residence",
        element: <Residence />,
      },
      {
        path: "lands",
        element: <Lands />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "about/leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "terms",
        element: <TermsAndConditions />,
      },
      {
        path: "project-details/:projectId",
        element: <ProjectDetails />,
      },
    ],
  },
]);
