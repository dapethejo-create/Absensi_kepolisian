import { resetAbsensi } from "../../../lib/store";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.isChief) return res.status(403).json({ error: "forbidden" });
  resetAbsensi();
  res.json({ ok: true });
}
