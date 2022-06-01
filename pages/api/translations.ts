import path from "path";
import fs from "fs";
import getConfig from "next/config";
const { serverRuntimeConfig } = getConfig();

export default function handler(req, res) {
  const files = fs.readdirSync(
    path.join(serverRuntimeConfig.PROJECT_ROOT, "translations")
  );
  const translations = {};
  for (const file of files) {
    const fileContent = fs.readFileSync(
      path.join(serverRuntimeConfig.PROJECT_ROOT, "translations", file),
      "utf-8"
    );
    const lang = file.split(".")[0];
    translations[lang] = JSON.parse(fileContent);
  }

  res.status(200).json(translations);
}
