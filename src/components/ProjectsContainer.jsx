import React, { useState } from "react";
import CountersPanel from "@/components/CountersPanel";
import FeaturedProjects from "@/components/FeaturedProjects";

/**
 * Enterprise-level container component that manages state between
 * CountersPanel and FeaturedProjects components
 *
 * This follows the principle of lifting state up for better maintainability
 * and ensures both components stay synchronized
 *
 * @component ProjectsContainer
 * @author j
 * @version 1.0.0
 */
const ProjectsContainer = () => {
  const [activeFilter, setActiveFilter] = useState("ROI Projects");

  const handleFilterChange = (newFilter) => {
    setActiveFilter(newFilter);
  };

  // Manual counter values for each category
  const countersByCategory = {
    "ROI Projects": {
      completedProjects: 2,
      awards: 2,
      completedUnits: 53,
      cities: 2,
    },
    Apartments: {
      completedProjects: 15,
      awards: 2,
      completedUnits: 150,
      cities: 8,
    },
    Residencies: {
      completedProjects: 25,
      awards: 2,
      completedUnits: 100,
      cities: 12,
    },
    Lands: {
      completedProjects: 30,
      awards: 2,
      completedUnits: 200,
      cities: 15,
    },
  };

  // Get counters for the active filter
  const currentCounters = countersByCategory[activeFilter] || {
    completedProjects: 0,
    awards: 0,
    completedUnits: 0,
    cities: 0,
  };

  return (
    <>
      <CountersPanel
        completedProjects={currentCounters.completedProjects}
        awards={currentCounters.awards}
        completedUnits={currentCounters.completedUnits}
        cities={currentCounters.cities}
      />
      <FeaturedProjects
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />
    </>
  );
};

export default ProjectsContainer;
