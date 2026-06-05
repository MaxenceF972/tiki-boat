"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email, password, redirect: false,
    });
    if (res?.ok) {
      router.push("/admin");
    } else {
      setError("Email ou mot de passe incorrect");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-tiki-ocean flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" alt="Tiki Boat" width={180} height={60}
            className="h-14 w-auto object-contain" />
        </div>

        <div className="bg-tiki-ocean-mid rounded-2xl border border-white/10 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-tiki-gold/15 flex items-center justify-center">
              <Lock size={18} className="text-tiki-gold" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg leading-none">Espace Admin</h1>
              <p className="text-white/40 text-xs mt-0.5">Tiki Boat — Accès restreint</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/60 text-sm mb-1.5">Email</label>
              <input type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tikiboat.fr"
                className="w-full bg-tiki-ocean border border-white/15 focus:border-tiki-gold rounded-xl px-4 py-3 text-white placeholder-white/25 outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-white/60 text-sm mb-1.5">Mot de passe</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} required value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-tiki-ocean border border-white/15 focus:border-tiki-gold rounded-xl px-4 py-3 pr-11 text-white placeholder-white/25 outline-none transition-colors" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors p-1">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/15 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full bg-tiki-gold hover:bg-tiki-gold-dark text-tiki-ocean font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50 text-sm mt-2">
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
