import { cpSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const backend = join(root, "backend");
const templates = join(backend, "templates");
const frontendDist = join(backend, "frontend_dist");

if (!existsSync(dist)) {
  console.error("Run npm run build first — dist/ folder not found.");
  process.exit(1);
}

mkdirSync(templates, { recursive: true });
if (existsSync(frontendDist)) rmSync(frontendDist, { recursive: true, force: true });

cpSync(dist, frontendDist, { recursive: true });
cpSync(join(dist, "index.html"), join(templates, "index.html"));

console.log("Frontend synced → backend/templates + backend/frontend_dist");
