import React from 'react';

interface LoaderProps {
  size?: number;
  message?: string;
}

export function Loader({ size = 64, message = 'Chargement...' }: LoaderProps) {
  const stroke = Math.max(4, Math.round(size / 16));
  return (
    <div className="w-full min-h-[200px] flex flex-col items-center justify-center py-8">
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
        aria-hidden
      >
        <svg
          className="animate-spin"
          width={size}
          height={size}
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="g1" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="50%" stopColor="#0f0f0f" />
              <stop offset="100%" stopColor="#0f0f0f" />
            </linearGradient>
          </defs>
          <circle cx="25" cy="25" r="20" stroke="#e6eef8" strokeWidth={stroke} fill="none" />
          <path
            d="M25 5 a20 20 0 0 1 0 40"
            stroke="url(#g1)"
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/6 h-3/6 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
            <img src="../../public/logo.png" alt="" />
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
}

export default Loader;
