import React from "react";
import { languageVersions } from "../../constants";

const languages = Object.entries(languageVersions);

const LanguageSelector = ({ language, setFileData }) => {
  return (
    <div>
      <select
        name="LANGUAGE"
        value={language}
        onChange={(e) =>
          setFileData((prev) => ({
            ...prev,
            language: e.target.value, // Update language in fileData
          }))
        }
      >
        {languages.map(([lang]) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
