import React, { useState } from "react";
import "@/styles/SearchBar.css";

export default function SearchBar() {
  const [searchData, setSearchData] = useState({
    field1: "",
    field2: "",
    field3: "",
  });

  const handleInputChange = (field, value) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    console.log("Search data:", searchData);
    // Add search logic here
  };

  return (
    <div className="search-bar">
      <div className="search-inputs">
        <input
          type="text"
          placeholder="Type Here..."
          value={searchData.field1}
          onChange={(e) => handleInputChange("field1", e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Type Here..."
          value={searchData.field2}
          onChange={(e) => handleInputChange("field2", e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Type Here..."
          value={searchData.field3}
          onChange={(e) => handleInputChange("field3", e.target.value)}
          className="search-input"
        />
      </div>
      <button className="search-button" onClick={handleSearch}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </button>
    </div>
  );
}
