"use client";
import { useEffect, useState } from "react";

export default function History() {
  const [data,setData]=useState([]);
  useEffect(()=>{fetch("/api/history/all").then(r=>r.json()).then(j=>setData(j.absensi||[]))},[]);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📜 History Absensi</h2>
      {data.map((it,idx)=>(
        <div key={idx} className="border p-3 mb-3 rounded bg-gray-100">
          <div className="flex items-center gap-2">
            {it._byAvatar && <img src={it._byAvatar} className="w-8 h-8 rounded-full"/>}
            <div>
              <strong>{it.nama}</strong> ({it.pangkat})
              <div className="text-sm">{new Date(it._ts).toLocaleString()}</div>
            </div>
          </div>
          <p>Jam: {it.jam} | Tanggal: {it.tanggal}</p>
          <p>Kegiatan: {it.kegiatan}</p>
          <p>Durasi: {it.dutyTime}</p>
        </div>
      ))}
    </div>
  );
}
