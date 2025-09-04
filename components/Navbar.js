"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar({ user }) {
  const { data: session } = useSession();
  return (
    <nav className="nav bg-blue-800 text-white p-3 flex items-center">
      <img src="/logo.png" alt="Logo" className="w-10 h-10 mr-3"/>
      <Link href="/">🏠 Home</Link>
      <Link href="/absensi" className="ml-4">📝 Absensi</Link>
      <Link href="/history" className="ml-4">📜 History</Link>
      <Link href="/total" className="ml-4">⏱️ Total Duty</Link>
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        {user?.image && <img src={user.image} className="w-8 h-8 rounded-full"/>}
        <span>{user?.name}</span>
        <button onClick={()=>signOut({ callbackUrl:"/" })} className="bg-red-600 px-2 py-1 rounded">Logout</button>
      </div>
    </nav>
  );
}
