import React from 'react';

interface LoaderProps {
  size?: number;
  message?: string;
  fullScreen?: boolean;
}

export function Loader({ size = 40, message, fullScreen = false }: LoaderProps) {
  // Fluid modern loader style
  const containerClass = fullScreen
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm"
    : "w-full min-h-[150px] flex flex-col items-center justify-center py-8";

  return (
    <div className={containerClass}>
      <div className="relative flex items-center justify-center">
        {/* Animated fluid blob/ring */}
        <div
          className="absolute rounded-full border-4 border-t-[#000435] border-r-transparent border-b-[#000435]/30 border-l-[#000435]/30 animate-spin"
          style={{
            width: size,
            height: size,
            animationDuration: '1s'
          }}
        />
        <div
          className="absolute rounded-full border-4 border-b-[#eabe3f] border-l-transparent border-t-transparent border-r-transparent animate-spin"
          style={{
            width: size,
            height: size,
            animationDuration: '2s',
            animationDirection: 'reverse'
          }}
        />

        {/* Inner pulsing dot */}
        <div
          className="bg-[#000435] rounded-full animate-pulse"
          style={{ width: size * 0.25, height: size * 0.25 }}
        />
      </div>

      {/* Message with typing/fade effect */}
      {message && (
        <div className="mt-6 flex flex-col items-center">
          <p className="text-sm font-medium text-gray-600 animate-pulse">{message}</p>
        </div>
      )}
    </div>
  );
}

export default Loader;
