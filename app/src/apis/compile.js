import axios from "axios";
import { languageVersions } from "../constants";

const api = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (lang, code, stdin = "") => {
  const response = await api.post("/execute", {
    language: lang,
    version: languageVersions[lang],
    files: [
      {
        content: code,
      },
    ],
    stdin,
  });
  return response.data;
};
