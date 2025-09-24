'use client';

import { useState, useEffect } from 'react';
import { HeroWithConfetti, PasswordModal } from '../components';

export function HomePageClient() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    // Always show password modal on page load/refresh
    setIsPasswordModalOpen(true);
  }, []);

  const handlePasswordSuccess = () => {
    setIsPasswordModalOpen(false);
    setHasAccess(true);
  };

  if (!hasAccess) {
    return (
      <>
        {/* Show a loading/blurred background while password is being entered */}
        <div className="min-h-dvh bg-[linear-gradient(135deg,#FFF5FA,#FFE3F0)] blur-sm opacity-50">
          <HeroWithConfetti
            headline="Happy 19th Birthday, Chacha!"
            subhead="dari your smartest bf hehe"
            ctaText="Enter"
          />
        </div>
        
        <PasswordModal 
          isOpen={isPasswordModalOpen} 
          onSuccess={handlePasswordSuccess} 
        />
      </>
    );
  }

  return (
    <HeroWithConfetti
      headline="Happy 19th Birthday, Chacha!"
      subhead="dari your smartest bf hehe"
      ctaText="Enter"
    />
  );
}