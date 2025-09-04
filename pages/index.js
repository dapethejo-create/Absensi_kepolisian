import { useSession, signIn } from "next-auth/react";
import Navbar from "../components/Navbar";

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-cover" style={{backgroundImage:"url('/BG.jpg')"}}>
        <h1 className="text-3xl text-white mb-5">🚔 Portal Absensi Kepolisian</h1>
        <button onClick={()=>signIn("discord")} className="bg-blue-600 text-white px-4 py-2 rounded">Login Discord</button>
      </div>
    );
  }
  return (
    <div>
      <Navbar user={session.user}/>
      <main className="p-6">
        <h2 className="text-xl font-bold">Selamat datang di Portal Absensi!</h2>
        <p>Gunakan menu di atas untuk mengisi absensi, lihat history, dan total jam kerja.</p>
      </main>
    </div>
  );
}
