import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, Mail, Lock, ArrowRight, Sun, X, KeyRound, Cpu, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@aegis-x.local');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/overview');
  };

  return (
    <div className="relative min-h-screen w-full flex bg-[#070E17] text-slate-100 font-sans overflow-hidden select-none">
      
      {/* Top Right Controls (Sun theme toggle + Orange close circle with X) */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 backdrop-blur-md transition-colors">
          <Sun className="w-4 h-4" />
        </button>
        <button
          onClick={() => navigate('/overview')}
          className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* LEFT SIDE (65–70% Width) - Cinematic Cybersecurity Sunset Visual */}
      <div className="w-full lg:w-[68%] relative flex flex-col justify-between p-10 xl:p-14 overflow-hidden min-h-screen">
        
        {/* Cinematic Backdrop Image + Fog Gradients */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-65 scale-105 transform transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80')`
          }}
        />
        
        {/* Twilight Blue / Purple / Sunset Orange Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#070E17]/90 via-[#1A0B2E]/70 to-[#2A0E18]/85 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070E17] via-transparent to-[#070E17]/60 z-10" />

        {/* Ambient Glowing Orbs */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-purple-600/20 rounded-full filter blur-[120px] z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-500/20 rounded-full filter blur-[100px] z-10" />

        {/* Top Header Row: AEGIS-X Logo & Navigation Links */}
        <div className="relative z-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/overview')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-white tracking-widest font-mono">AEGIS-X</span>
          </div>

          <nav className="hidden sm:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <a href="#" className="hover:text-white transition-colors">Product</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">Intelligence</a>
            <a href="#" className="hover:text-white transition-colors">Docs</a>
          </nav>
        </div>

        {/* Hero Central Content (Left-Middle) */}
        <div className="relative z-20 space-y-6 max-w-xl my-auto py-12">
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white leading-tight tracking-tight">
            Real-Time <br />
            Security <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-orange-400 bg-clip-text text-transparent">
              Decision Engine
            </span>
          </h1>

          <p className="text-sm sm:text-base font-mono font-bold text-slate-200 tracking-wider">
            Detect • Correlate • Assess • Respond
          </p>

          <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed font-sans max-w-md">
            Turning security events into intelligent decisions for a safer tomorrow.
          </p>

          {/* 4 Compact Feature Items with Glowing Security Icons */}
          <div className="grid grid-cols-2 gap-4 pt-6 max-w-lg">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-200">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
              Real-time Threat Detection
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-200">
              <span className="w-2 h-2 rounded-full bg-purple-400 shadow-sm shadow-purple-400" />
              AI-powered Correlation
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-200">
              <span className="w-2 h-2 rounded-full bg-orange-400 shadow-sm shadow-orange-400" />
              Enterprise Grade Security
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
              Built for Modern SOC
            </div>
          </div>
        </div>

        {/* Bottom Version Tag */}
        <div className="relative z-20 text-[11px] font-mono text-slate-400/80">
          v1.0.0 | Secure • Scalable • Intelligent
        </div>
      </div>

      {/* RIGHT SIDE LOGIN PANEL (32–35% Width) - Frosted Glass Card */}
      <div className="hidden lg:flex lg:w-[32%] items-center justify-center p-8 bg-[#070E17]/60 relative z-20">
        <div className="w-full max-w-[380px] bg-white/10 border border-white/20 p-8 rounded-[18px] shadow-2xl backdrop-blur-xl relative overflow-hidden">
          
          {/* Soft Peach/Orange/Pink Highlight Gradient Accent on Card */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500" />

          <div className="space-y-2 mb-6">
            <h2 className="text-xl font-bold text-white tracking-tight">Welcome to AEGIS-X</h2>
            <p className="text-xs text-slate-300">Sign in to your security console</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-200 block">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/15 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-200 block">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-black/30 border border-white/15 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-white/20 bg-black/40 text-orange-500 focus:ring-0"
                />
                Remember me
              </label>
              <a href="#" className="text-xs font-semibold text-orange-300 hover:text-orange-200">
                Forgot password?
              </a>
            </div>

            {/* Primary Button: Warm Gradient (Yellow -> Orange -> Pink) */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 hover:opacity-95 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] mt-2"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/15" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#121A28] px-3 text-slate-400 font-mono text-[11px]">or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/overview')}
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-black/30 hover:bg-white/10 border border-white/15 rounded-xl text-xs font-semibold text-slate-200 transition-colors"
            >
              <KeyRound className="w-3.5 h-3.5 text-cyan-400" /> SSO
            </button>
            <button
              onClick={() => navigate('/overview')}
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-black/30 hover:bg-white/10 border border-white/15 rounded-xl text-xs font-semibold text-slate-200 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current text-slate-300" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg> GitHub
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
