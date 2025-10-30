import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  unlinkSync,
} from "node:fs";
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";

import App from "./App.js";

const __filename = fileURLToPath(import.meta.url);
console.log("Absolute File Path:", import.meta.url);
console.log("Relative File Path:", __filename);

const __dirname = dirname(__filename);
console.log("Directory Path:", __dirname);

const distPath = path.join(__dirname, "dist");
console.log("Dist Path:", distPath);

const shell = readFileSync(path.join(__dirname, "index.html"), "utf-8");
console.log("Shell:", shell);

const app = renderToStaticMarkup(createElement(App));
console.log("React App:", app);

const html = shell.replace("<!--ROOT-->", app);
console.log("HTML:", html);

if (!existsSync(distPath)) {
  console.log("Dist folder doesn't exist, creating dist folder...");
  mkdirSync(distPath);
} else {
  console.log(
    "Dist folder already exists, deleting all files in the dist folder..."
  );
  readdirSync(distPath).forEach((file) => {
    console.log(`Deleting ${file}...`);
    unlinkSync(path.join(distPath, file));
  });
}

writeFileSync(path.join(distPath, "index.html"), html);
console.log("index.html written to dist folder.");
