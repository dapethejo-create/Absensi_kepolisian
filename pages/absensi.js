"use client";
import { useState } from "react";

export default function Absensi() {
  const [form, setForm] = useState({});
  async function submit(e){
    e.preventDefault();
    await fetch("/api/absensi",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
    alert("✅ Absensi terkirim!");
  }
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📝 Form Absensi</h2>
      <form onSubmit={submit} className="grid gap-3">
        {["nama","pangkat","jam","tanggal","kegiatan"].map(k=>(
          <input key={k} placeholder={k} className="border p-2"
            onChange={e=>setForm({...form,[k]:e.target.value})}/>
        ))}
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Kirim</button>
      </form>
    </div>
  );
}
