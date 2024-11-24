import React from "react";
import { languageVersions } from "../../constants";

const languages = Object.entries(languageVersions);

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <div>
      <select
        name="LANGUAGE"
        value={language} 
        onChange={(e) => onSelect(e.target.value)} 
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
