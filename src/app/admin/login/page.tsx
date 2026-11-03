"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, Lock, Loader2, AlertCircle, Smartphone } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminLogin() {
  const router = useRouter();
  const [step, setStep] = useState<"credentials" | "2fa">("credentials");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totpCode, setTotpCode] = useState("");
  
  const [factorId, setFactorId] = useState("");
  const [challengeId, setChallengeId] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Invalid email or password. Please try again.");
      setIsLoading(false);
      return;
    }

    // Check if user has 2FA enabled
    const { data: factorsData, error: factorsError } = await supabase.auth.mfa.listFactors();
    
    if (factorsError) {
      setError("Error checking 2FA status.");
      setIsLoading(false);
      return;
    }

    const totpFactor = factorsData?.factors?.find(f => f.factor_type === 'totp' && f.status === 'verified');

    if (totpFactor) {
      // User has 2FA enabled, challenge them
      const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId: totpFactor.id
      });

      if (challengeError || !challengeData) {
        setError("Failed to initiate 2FA challenge.");
        setIsLoading(false);
        return;
      }

      setFactorId(totpFactor.id);
      setChallengeId(challengeData.id);
      setStep("2fa");
      setIsLoading(false);
    } else {
      // No 2FA enabled, go straight to dashboard
      router.push("/admin");
      router.refresh();
    }
  };

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId,
      code: totpCode,
    });

    if (verifyError) {
      setError("Invalid 2FA code. Please try again.");
      setIsLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF7ED] dark:bg-[#431407] px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-[#2A1205] rounded-2xl shadow-2xl border border-[#431407]/10 dark:border-[#D97706]/20 p-8"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D97706]/10 dark:bg-[#D97706]/20 mb-4">
            {step === "2fa" ? (
              <Smartphone className="h-8 w-8 text-[#D97706]" />
            ) : (
              <ShieldCheck className="h-8 w-8 text-[#D97706]" />
            )}
          </div>
          <h1 className="text-2xl font-bold text-[#431407] dark:text-[#D97706]">
            {step === "2fa" ? "Two-Factor Authentication" : "Admin Login"}
          </h1>
          <p className="text-sm text-[#431407]/60 dark:text-[#D97706]/60 mt-2">
            {step === "2fa" 
              ? "Enter the 6-digit code from your Google Authenticator app." 
              : "Enter your credentials to access the dashboard."}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {step === "credentials" ? (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#431407] dark:text-[#D97706] mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#431407]/40 dark:text-[#D97706]/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FFF7ED] dark:bg-[#431407] border border-[#431407]/20 dark:border-[#D97706]/20 text-[#431407] dark:text-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#D97706]/50 transition-all"
                  placeholder="admin@homelandrec.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#431407] dark:text-[#D97706] mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#431407]/40 dark:text-[#D97706]/40" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FFF7ED] dark:bg-[#431407] border border-[#431407]/20 dark:border-[#D97706]/20 text-[#431407] dark:text-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#D97706]/50 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#D97706] hover:bg-[#B45309] text-white font-bold rounded-xl shadow-lg shadow-[#D97706]/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? <><Loader2 className="h-5 w-5 animate-spin" /> Signing in...</> : "Sign In to Dashboard"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify2FA} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#431407] dark:text-[#D97706] mb-1.5">Authentication Code</label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#431407]/40 dark:text-[#D97706]/40" />
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  required
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FFF7ED] dark:bg-[#431407] border border-[#431407]/20 dark:border-[#D97706]/20 text-[#431407] dark:text-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#D97706]/50 transition-all text-center text-2xl tracking-widest font-mono"
                  placeholder="000 000"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || totpCode.length !== 6}
              className="w-full py-3.5 bg-[#D97706] hover:bg-[#B45309] text-white font-bold rounded-xl shadow-lg shadow-[#D97706]/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? <><Loader2 className="h-5 w-5 animate-spin" /> Verifying...</> : "Verify & Access Dashboard"}
            </button>
            
            <button
              type="button"
              onClick={() => {
                setStep("credentials");
                setTotpCode("");
                setError("");
              }}
              className="w-full py-2 text-sm text-[#431407]/60 dark:text-[#D97706]/60 hover:text-[#431407] dark:hover:text-[#D97706] transition-colors"
            >
              ← Back to Password Login
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}