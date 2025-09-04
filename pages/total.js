"use client";
import { useEffect, useState } from "react";

export default function Total() {
  const [data,setData]=useState([]);
  useEffect(()=>{fetch("/api/history/all").then(r=>r.json()).then(j=>setData(j.absensi||[]))},[]);
  const totalByName = {};
  data.forEach(it=>{
    if(!totalByName[it.nama]) totalByName[it.nama]=0;
    totalByName[it.nama]+=1;
  });
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">⏱️ Total Duty</h2>
      {Object.entries(totalByName).map(([nama,total])=>(
        <p key={nama}>{nama}: {total} Duty</p>
      ))}
    </div>
  );
}
