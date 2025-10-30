import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";

import App from "./App.js";

const __filename = fileURLToPath(import.meta.url);
console.log("Absolute File Path:", import.meta.url);
console.log("Relative File Path:", __filename);

const __dirname = dirname(__filename);
console.log("Directory Path:", __dirname);

const shell = readFileSync(path.join(__dirname, "dist", "index.html"), "utf-8");
console.log("Shell:", shell);

const app = fastify();
console.log("Fastify App:", app);

app.register(fastifyStatic, {
  root: path.join(__dirname, "dist"),
  prefix: "/",
});

const parts = shell.split("<!--ROOT-->");
console.log("Shell Parts:", parts);

app.get("/", async (request, reply) => {
  reply.raw.write(parts[0]);
  const reactApp = renderToString(createElement(App));
  reply.raw.write(reactApp);
  reply.raw.write(parts[1]);
  reply.raw.end();
});

app.listen({
  port: 3000,
});
console.log("Server is running on port 3000");
