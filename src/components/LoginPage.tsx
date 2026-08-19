import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, X, Eye, EyeOff, User } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
  onClose: () => void;
}

export function LoginPage({ onLogin, onClose }: LoginPageProps) {
  const [adminCreds, setAdminCreds] = useState(() => {
    const saved = localStorage.getItem('nocturna_v10_admin_credentials');
    return saved ? JSON.parse(saved) : { username: 'Bri2008', password: 'BlackPink2016' };
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  // Custom states for Password Reset/Change flow
  const [isResetMode, setIsResetMode] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === adminCreds.username && password === adminCreds.password) {
      onLogin();
    } else {
      setError('Credenciales inválidas. Intente nuevamente.');
      setPassword('');
    }
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newPassword.trim()) {
      setError('Por favor complete ambos campos.');
      return;
    }
    const updated = { username: newUsername.trim(), password: newPassword.trim() };
    localStorage.setItem('nocturna_v10_admin_credentials', JSON.stringify(updated));
    setAdminCreds(updated);
    setResetSuccess('Las credenciales se actualizaron con éxito.');
    setError('');
    // Clear inputs
    setNewUsername('');
    setNewPassword('');
    setTimeout(() => {
      setIsResetMode(false);
      setResetSuccess('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black overflow-hidden px-6">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-bordeaux rounded-full blur-[150px] opacity-20"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-crimson rounded-full blur-[120px] opacity-10"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-crimson rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(139,0,0,0.4)] mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-serif text-white mb-2">
            {isResetMode ? 'Nueva Contraseña' : 'Acceso Reservado'}
          </h2>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 font-bold">
            {isResetMode ? 'Configurar Credenciales' : 'Panel de Control Bri'}
          </p>
        </div>

        {isResetMode ? (
          <form onSubmit={handleResetSubmit} className="space-y-6">
            <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-xs text-gray-400 mb-2 font-mono">
              <span className="text-crimson font-bold block mb-1">CREDENTCIALES ACTUALES:</span>
              Usuario: <span className="text-white">{adminCreds.username}</span><br />
              Contraseña: <span className="text-white">{adminCreds.password}</span>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Nuevo Usuario</label>
              <input 
                type="text"
                required
                value={newUsername}
                onChange={(e) => {
                  setNewUsername(e.target.value);
                  setError('');
                }}
                placeholder="Ej: Bri2008"
                className="w-full bg-black/50 border border-white/10 px-6 py-4 rounded-xl focus:border-crimson outline-none transition-all text-sm text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Nueva Contraseña</label>
              <input 
                type="text"
                required
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError('');
                }}
                placeholder="Ej: BlackPink2016"
                className="w-full bg-black/50 border border-white/10 px-6 py-4 rounded-xl focus:border-crimson outline-none transition-all text-sm text-white"
              />
            </div>

            {error && (
              <p className="text-[10px] text-crimson uppercase tracking-widest mt-2 ml-1">
                {error}
              </p>
            )}

            {resetSuccess && (
              <p className="text-[10px] text-emerald-400 uppercase tracking-widest mt-2 ml-1">
                {resetSuccess}
              </p>
            )}

            <div className="flex gap-4">
              <button 
                type="button"
                onClick={() => {
                  setIsResetMode(false);
                  setError('');
                }}
                className="flex-1 py-4 bg-zinc-800 text-gray-300 font-bold text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-zinc-700 transition-all font-semibold"
              >
                Volver
              </button>
              <button 
                type="submit"
                className="flex-1 py-4 bg-crimson text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-xl shadow-[0_0_30px_rgba(139,0,0,0.2)] hover:brightness-125 transition-all"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Identidad</label>
              <div className="relative">
                <input 
                  autoFocus
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError('');
                  }}
                  placeholder="Nombre de Usuario"
                  className="w-full bg-black/50 border border-white/10 px-6 py-4 rounded-xl focus:border-crimson outline-none transition-all text-sm text-white pr-12"
                />
                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Pin Secreto</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Introduzca el PIN..."
                  className="w-full bg-black/50 border border-white/10 px-6 py-4 rounded-xl focus:border-crimson outline-none transition-all text-sm text-white pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {error && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] text-crimson uppercase tracking-widest mt-2 ml-1"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-crimson text-white font-bold text-[10px] uppercase tracking-[0.3em] rounded-xl shadow-[0_0_30px_rgba(139,0,0,0.2)] hover:brightness-125 transition-all active:scale-[0.98]"
            >
              Validar Credenciales
            </button>

            <button
              type="button"
              onClick={() => {
                setIsResetMode(true);
                setError('');
              }}
              className="w-full text-center text-[10px] uppercase tracking-widest text-gray-500 hover:text-crimson hover:underline transition-all mt-4 font-semibold"
            >
              ¿Olvidaste la contraseña? Cambiar Contraseña
            </button>
          </form>
        )}

        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-[9px] text-gray-600 uppercase tracking-widest leading-relaxed">
            Poder absoluto requiere <br />
            responsabilidad absoluta.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
