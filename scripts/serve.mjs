import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ttf": "font/ttf",
};
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://127.0.0.1");
    const requested = decodeURIComponent(url.pathname);
    const filename = path.resolve(
      root,
      "." + (requested === "/" ? "/index.html" : requested),
    );
    if (
      !filename.startsWith(root + path.sep) ||
      requested.includes("\\") ||
      requested.split("/").some((part) => part.startsWith("."))
    ) {
      res.writeHead(403).end("Acesso negado");
      return;
    }
    const data = await fs.readFile(filename);
    res
      .writeHead(200, {
        "Content-Type":
          types[path.extname(filename)] || "application/octet-stream",
      })
      .end(data);
  } catch {
    res.writeHead(404).end("Arquivo não encontrado");
  }
});
server.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
server.listen(4173, "127.0.0.1", () =>
  console.log("Abra http://127.0.0.1:4173 — encerre com Ctrl+C."),
);
