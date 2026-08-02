const fs = require("fs");
const path = require("path");

const moduleName = process.argv[2];

if (!moduleName) {
  console.error("Usage: npm run new:module <module-name>");
  process.exit(1);
}

const dir = path.join("src", "api", moduleName);

fs.mkdirSync(dir, { recursive: true });

["controller.ts", "router.ts", "model.ts", "schema.ts", "service.ts"].forEach((file) => {
  fs.writeFileSync(path.join(dir, file), "");
});

console.log(`✔ Module '${moduleName}' created.`);
