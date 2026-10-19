import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "assets/css/style.css"), "utf8");
const errors = [];
let checked = 0;

function checkReference(reference, directory) {
  if (!reference || /^(?:[a-z]+:|#|\/\/)/i.test(reference)) return;
  const filename = decodeURIComponent(reference.split(/[?#]/)[0]);
  if (!filename || filename.startsWith("#")) return;
  const target = path.resolve(directory, filename);
  checked++;
  if (!target.startsWith(root + path.sep) || !fs.existsSync(target)) {
    errors.push(`Arquivo não encontrado: ${reference}`);
  }
}

for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  checkReference(match[1], root);
}
for (const match of css.matchAll(/url\(\s*['"]?([^'"\)]+)['"]?\s*\)/g)) {
  checkReference(match[1], path.join(root, "assets/css"));
}
for (const property of ["og:url", "og:image"]) {
  const value = html.match(
    new RegExp(`property="${property}"\\s+content="([^"]+)"`),
  )?.[1];
  if (!value?.startsWith("https://galpaodaevy.github.io/evybraids/")) {
    errors.push(`URL de compartilhamento incorreta: ${property}`);
  }
}
if (!fs.existsSync(path.join(root, ".nojekyll")))
  errors.push("Falta .nojekyll.");
const syntax = spawnSync(
  process.execPath,
  ["--check", path.join(root, "assets/js/app.js")],
  { encoding: "utf8" },
);
if (syntax.status !== 0)
  errors.push(syntax.stderr || "Falha na verificação do JavaScript.");
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `${checked} referências locais conferidas; URLs do GitHub Pages e JavaScript válidos.`,
  );
}
