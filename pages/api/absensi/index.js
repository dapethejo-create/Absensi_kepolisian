import { addAbsensi } from "../../../lib/store";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.isPolice) return res.status(403).json({ error: "forbidden" });

  const { nama, pangkat, jam, tanggal, kegiatan, fotoBefore, fotoAfter } = req.body;
  if (!nama || !jam || !tanggal) return res.status(400).json({ error: "invalid data" });

  const dutyTime = "2 jam 5 menit"; // Dummy sementara

  addAbsensi({
    nama, pangkat, jam, tanggal, kegiatan,
    fotoBefore, fotoAfter,
    dutyTime,
    _byId: token.discordId,
    _byName: token.name,
    _byAvatar: token.image
  });

  res.json({ ok: true });
}
