import { getAll } from "../../../lib/store";

export default function handler(req, res) {
  return res.json(getAll());
}
