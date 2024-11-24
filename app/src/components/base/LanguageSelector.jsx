import React from "react";
import { languageVersions } from "../../constants";

const languages = Object.entries(languageVersions);

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <div>
      <select
        name="LANGUAGE"
        value={language} // Ensures the selected value is tied to the `language` prop
        onChange={(e) => onSelect(e.target.value)} // Trigger `onSelect` on change
      >
        {languages.map(([lang, version]) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
