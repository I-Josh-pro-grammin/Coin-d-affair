import React from 'react';

interface LoaderProps {
  size?: number;
  message?: string;
  fullScreen?: boolean;
}

export function Loader({ size = 80, message, fullScreen = false }: LoaderProps) {
  const containerClass = fullScreen
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm"
    : "w-full min-h-[300px] flex flex-col items-center justify-center py-12"; // Increased min-recHeight

  return (
    <div className={containerClass}>
      <style>{`
        @keyframes fluid-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fluid-morph {
          0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
          33% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
          66% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; }
          100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
        }
      `}</style>

      <div className="relative flex items-center justify-center">
        {/* Main Blob */}
        <div
          className="relative bg-[#000435]"
          style={{
            width: size,
            height: size,
            animation: 'fluid-spin 8s linear infinite, fluid-morph 6s ease-in-out infinite',
            filter: 'blur(0.5px) contrast(1.2)',
            boxShadow: '0 10px 30px -5px rgba(0, 4, 53, 0.3)'
          }}
        >
          {/* Gradient Overlay for shine */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-[inherit]" />
        </div>

        {/* Satellite blobs for extra fluidity */}
        <div
          className="absolute bg-[#eabe3f] opacity-80"
          style={{
            width: size * 0.6,
            height: size * 0.6,
            animation: 'fluid-spin 5s linear infinite reverse, fluid-morph 5s ease-in-out infinite',
            left: -size * 0.2,
            top: -size * 0.1,
            mixBlendMode: 'multiply'
          }}
        />

        <div
          className="absolute bg-[#000435] opacity-60"
          style={{
            width: size * 0.4,
            height: size * 0.4,
            animation: 'fluid-spin 10s linear infinite, fluid-morph 7s ease-in-out infinite',
            right: -size * 0.2,
            bottom: -size * 0.1,
          }}
        />

        {/* Center Icon/Content optionally */}
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold opacity-0 animate-pulse">
          HI
        </div>
      </div>

      {message && (
        <div className="mt-8">
          <p className="text-lg font-medium text-gray-500 tracking-wider animate-pulse uppercase text-center">{message}</p>
        </div>
      )}
    </div>
  );
}

export default Loader;
