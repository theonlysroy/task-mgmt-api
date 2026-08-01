#!/usr/bin/env node

const fs = require("fs");

const inputFile = process.argv[2] || ".env";
const outputFile = process.argv[3] || ".env.example";

if (!fs.existsSync(inputFile)) {
  console.error(`File not found: ${inputFile}`);
  process.exit(1);
}

const content = fs.readFileSync(inputFile, "utf8");

function placeholder(key, value) {
  // Empty value
  if (value.trim() === "") return "";

  // Keep common non-secret values
  if (/^(true|false)$/i.test(value)) return value;
  if (/^\d+$/.test(value)) return value;
  if (/^(development|production|test)$/i.test(value)) return value;
  if (/^(v1|v2)$/i.test(value)) return value;

  // Everything else becomes a placeholder derived from the key
  return `your-${key.toLowerCase().replace(/_/g, "-")}`;
}

const output = content
  .split(/\r?\n/)
  .map((line) => {
    const trimmed = line.trim();

    // Preserve comments and blank lines
    if (!trimmed || trimmed.startsWith("#")) {
      return line;
    }

    const idx = line.indexOf("=");
    if (idx === -1) {
      return line;
    }

    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1);

    return `${key}=${placeholder(key, value)}`;
  })
  .join("\n");

fs.writeFileSync(outputFile, output);

console.log(`Generated ${outputFile}`);
