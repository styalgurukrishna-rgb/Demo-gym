import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  Phone, 
  Mail, 
  User, 
  ShieldCheck, 
  UserCheck, 
  Sparkles, 
  Dumbbell,
  CheckCircle2,
  Eye,
  EyeOff,
  LayoutDashboard,
  Award,
  KeyRound,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { PageType, ModalState, UserRole } from '../types';
import { DEMO_MEMBER, leadStore } from '../services/leadStore';
import { soundManager } from '../components/common/SoundEffects';

interface LoginPageProps {
  onNavigate: (page: PageType) => void;
  onOpenModal: (type: ModalState['type'], data?: any) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('member');
  
  // Login Form
  const [identifier, setIdentifier] = useState('+91 75499 29102');
  const [password, setPassword] = useState('pass123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  // Register Form
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPlan, setRegPlan] = useState('PREMIUM PLAN');

  // Forgot Password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotInput, setForgotInput] = useState('');
  const [forgotSuccessMsg, setForgotSuccessMsg] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRoleSelect = (role: UserRole) => {
    soundManager.playClick();
    setSelectedRole(role);
    setErrorMsg('');
    setSuccessMsg('');
    if (role === 'member') {
      setIdentifier('+91 75499 29102');
      setPassword('pass123');
    } else if (role === 'trainer') {
      setIdentifier('vikram.trainer@ksg.com');
      setPassword('pass123');
    } else if (role === 'admin') {
      setIdentifier('admin@ksgdemogym.com');
      setPassword('admin123');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      const res = leadStore.login(identifier, password);
      setIsLoading(false);
      if (res.success && res.user) {
        soundManager.playSuccess();
        if (res.user.role === 'admin') {
          onNavigate('admin-dashboard');
        } else if (res.user.role === 'trainer') {
          onNavigate('trainer-dashboard');
        } else {
          onNavigate('member-dashboard');
        }
      } else {
        soundManager.playClick();
        setErrorMsg(res.error || 'Invalid credentials.');
      }
    }, 450);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPhone || !regPassword) {
      setErrorMsg('Please fill in all registration fields.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      const res = leadStore.register({
        name: regName,
        email: regEmail,
        phone: regPhone,
        password: regPassword,
        planName: regPlan,
        role: 'member'
      });
      setIsLoading(false);
      if (res.success) {
        soundManager.playSuccess();
        setSuccessMsg('Account created successfully! Redirecting to dashboard...');
        setTimeout(() => {
          onNavigate('member-dashboard');
        }, 1000);
      } else {
        setErrorMsg(res.error || 'Registration failed.');
      }
    }, 500);
  };

  const handleOneClickDemoLogin = (role: UserRole) => {
    soundManager.playClick();
    setIsLoading(true);
    setErrorMsg('');
    
    setTimeout(() => {
      if (role === 'member') {
        leadStore.login('+91 75499 29102', 'pass123');
        setIsLoading(false);
        soundManager.playSuccess();
        onNavigate('member-dashboard');
      } else if (role === 'trainer') {
        leadStore.login('vikram.trainer@ksg.com', 'pass123');
        setIsLoading(false);
        soundManager.playSuccess();
        onNavigate('trainer-dashboard');
      } else if (role === 'admin') {
        leadStore.login('admin@ksgdemogym.com', 'admin123');
        setIsLoading(false);
        soundManager.playSuccess();
        onNavigate('admin-dashboard');
      }
    }, 350);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotInput) return;
    const res = leadStore.forgotPassword(forgotInput);
    setForgotSuccessMsg(res.message);
  };

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-black flex items-center justify-center py-20 px-4 sm:px-6">
      <div className="max-w-md w-full">
        {/* Brand Logo Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4 shadow-lg">
            <Dumbbell className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">
            KSG <span className="text-amber-400">SAAS PORTAL</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Role-Based Access for Members, Coaches & Gym Owners
          </p>
        </div>

        {/* Card Container */}
        <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Top Main Tabs: Login vs Register */}
          <div className="flex border-b border-zinc-800 pb-4 mb-6">
            <button
              id="tab-sign-in"
              onClick={() => {
                soundManager.playClick();
                setActiveTab('login');
                setErrorMsg('');
              }}
              className={`flex-1 text-center py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === 'login'
                  ? 'text-amber-400 border-b-2 border-amber-500 font-black'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Sign In
            </button>
            <button
              id="tab-new-member"
              onClick={() => {
                soundManager.playClick();
                setActiveTab('register');
                setErrorMsg('');
              }}
              className={`flex-1 text-center py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === 'register'
                  ? 'text-amber-400 border-b-2 border-amber-500 font-black'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              New Member
            </button>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {activeTab === 'login' ? (
            <div>
              {/* Role Selection Pills */}
              <div className="mb-5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Select Your Account Role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('member')}
                    className={`py-2 px-2.5 rounded-xl border text-[11px] font-bold uppercase tracking-wider flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      selectedRole === 'member'
                        ? 'bg-amber-500 text-black border-amber-400 font-black shadow-md'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Member</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleSelect('trainer')}
                    className={`py-2 px-2.5 rounded-xl border text-[11px] font-bold uppercase tracking-wider flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      selectedRole === 'trainer'
                        ? 'bg-amber-500 text-black border-amber-400 font-black shadow-md'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Trainer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleSelect('admin')}
                    className={`py-2 px-2.5 rounded-xl border text-[11px] font-bold uppercase tracking-wider flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      selectedRole === 'admin'
                        ? 'bg-emerald-500 text-black border-emerald-400 font-black shadow-md'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                    {selectedRole === 'member' ? 'Mobile Number / Email' : 'Staff Email Address'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                      {selectedRole === 'member' ? <Phone className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                    </div>
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder={selectedRole === 'member' ? '+91 75499 29102' : 'admin@ksgdemogym.com'}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                    Security Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-zinc-400 hover:text-zinc-300">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded bg-zinc-950 border-zinc-800 text-amber-500 focus:ring-amber-500 w-4 h-4"
                    />
                    <span>Remember my device</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotSuccessMsg('');
                      setShowForgotModal(true);
                    }}
                    className="text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>LOG IN TO {selectedRole.toUpperCase()}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Single Click Fast Demo Logins */}
              <div className="mt-6 pt-5 border-t border-zinc-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    ⚡ 1-Click Demo Evaluation Logins
                  </span>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    id="demo-member-login-btn"
                    onClick={() => handleOneClickDemoLogin('member')}
                    className="p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-left transition-all cursor-pointer group"
                  >
                    <span className="block text-[10px] font-black text-amber-400 group-hover:text-amber-300 uppercase">
                      Demo Member
                    </span>
                    <span className="block text-[9px] text-zinc-500 truncate">Karan M. (VIP)</span>
                  </button>

                  <button
                    id="demo-trainer-login-btn"
                    onClick={() => handleOneClickDemoLogin('trainer')}
                    className="p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-left transition-all cursor-pointer group"
                  >
                    <span className="block text-[10px] font-black text-amber-400 group-hover:text-amber-300 uppercase">
                      Coach Vikram
                    </span>
                    <span className="block text-[9px] text-zinc-500 truncate">CSCS Director</span>
                  </button>

                  <button
                    id="demo-admin-login-btn"
                    onClick={() => handleOneClickDemoLogin('admin')}
                    className="p-2.5 rounded-xl bg-zinc-950 hover:bg-emerald-900/30 border border-emerald-500/30 text-left transition-all cursor-pointer group"
                  >
                    <span className="block text-[10px] font-black text-emerald-400 uppercase">
                      Gym Owner
                    </span>
                    <span className="block text-[9px] text-zinc-500 truncate">Full CRM Access</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Member Registration Form */
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Deshmukh"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@gmail.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 75499 29102"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Membership Plan
                  </label>
                  <select
                    value={regPlan}
                    onChange={(e) => setRegPlan(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                  >
                    <option value="BASIC PLAN">BASIC (₹2,000/mo)</option>
                    <option value="PREMIUM PLAN">PREMIUM (₹3,000/mo)</option>
                    <option value="VIP PLAN">VIP SANCTUARY (₹5,000/mo)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Create Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Min 6 characters"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>REGISTER & ACTIVATE PORTAL</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-zinc-500 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>256-Bit Encrypted Biometric Identity Authentication</span>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-2 text-amber-400">
                <KeyRound className="w-5 h-5" />
                <h3 className="text-base font-black text-white uppercase">Reset Password</h3>
              </div>
              <p className="text-xs text-zinc-400">
                Enter your registered mobile number or email to receive a password reset token and OTP.
              </p>

              {forgotSuccessMsg ? (
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  {forgotSuccessMsg}
                </div>
              ) : (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Enter phone or email"
                    value={forgotInput}
                    onChange={(e) => setForgotInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-amber-500 text-black font-black text-xs uppercase"
                  >
                    SEND RECOVERY OTP
                  </button>
                </form>
              )}

              <button
                onClick={() => setShowForgotModal(false)}
                className="w-full py-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white text-xs font-bold"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginPage;
