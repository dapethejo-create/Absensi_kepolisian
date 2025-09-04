import fs from "fs";
import path from "path";

const file = path.join(process.cwd(), "data", "history.json");

function load() {
  if (!fs.existsSync(file)) return { absensi: [] };
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

function save(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

export function getAll() {
  return load();
}

export function addAbsensi(item) {
  const data = load();
  data.absensi.push({ ...item, _ts: Date.now() });
  save(data);
  return true;
}

export function resetAbsensi() {
  save({ absensi: [] });
  return true;
}
