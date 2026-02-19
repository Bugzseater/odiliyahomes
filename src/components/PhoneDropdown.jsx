import React from "react";
import PropTypes from "prop-types";
import "flag-icons/css/flag-icons.min.css";
import "@/styles/PhoneDropdown.css";

/**
 * PhoneDropdown - International phone number display
 * Displays multiple country phone numbers with flags in a single line
 */
export default function PhoneDropdown() {
  const countries = [
    {
      name: "Sri Lanka",
      code: "lk",
      phone: "+94 11 400 1403",
    },
    {
      name: "Australia",
      code: "au",
      phone: "+61 3 9999 7494",
    },
    {
      name: "USA",
      code: "us",
      phone: "+1 201 409 5558",
    },
    {
      name: "Canada",
      code: "ca",
      phone: "+1 587 557 3922",
    },
    {
      name: "United Kingdom",
      code: "gb",
      phone: "+44 203 769 0219",
    },
  ];

  return (
    <div className="phone-list-container">
      {countries.map((country) => (
        <a
          key={country.code}
          href={`tel:${country.phone.replace(/\s/g, "")}`}
          className="phone-item"
          aria-label={`Call ${country.name}: ${country.phone}`}
        >
          <span className={`fi fi-${country.code} phone-flag-icon`}></span>
          <span className="phone-number">{country.phone}</span>
        </a>
      ))}
    </div>
  );
}

PhoneDropdown.propTypes = {};
