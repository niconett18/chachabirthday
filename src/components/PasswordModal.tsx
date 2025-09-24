'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Heart } from 'lucide-react';

interface PasswordModalProps {
  isOpen: boolean;
  onSuccess: () => void;
}

export function PasswordModal({ isOpen, onSuccess }: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  // 🔑 CHANGE PASSWORD HERE - Replace 'chacha19' with your desired password
  const CORRECT_PASSWORD = 'chachacumanpunyanico';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.toLowerCase() === CORRECT_PASSWORD.toLowerCase()) {
      // Don't store in localStorage - password will be required on every refresh
      onSuccess();
    } else {
      setError('Wrong password! Please text me for the correct one 💕');
      setIsShaking(true);
      setPassword('');
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0,
              x: isShaking ? [-10, 10, -10, 10, 0] : 0
            }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#FF66A3] to-[#FF9EC7] p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 rounded-full p-3">
                  <Lock size={32} className="text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Private Birthday Surprise
              </h2>
              <p className="text-white/90 text-sm">
                This is a special birthday surprise for Chacha
              </p>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <Heart className="text-[#FF66A3] mx-auto mb-3" size={24} />
                <p className="text-gray-700 font-medium mb-2">
                  Text me for the password 💝
                </p>
                <p className="text-gray-500 text-sm">
                  This surprise is exclusively for our special someone
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter password..."
                    className="w-full px-4 py-3 border-2 border-[#FFE3F0] rounded-xl focus:border-[#FF66A3] focus:outline-none transition-colors text-center font-medium"
                    autoFocus
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 rounded-lg p-3"
                  >
                    <p className="text-red-600 text-sm text-center">{error}</p>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={!password.trim()}
                  className="w-full bg-gradient-to-r from-[#FF66A3] to-[#FF9EC7] text-white py-3 px-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200 active:scale-95"
                >
                  Enter Surprise 💕
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-400">
                  Made with 💖 for Chacha&apos;s special day
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}