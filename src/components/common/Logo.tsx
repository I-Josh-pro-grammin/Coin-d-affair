import { Link } from 'react-router-dom';
import { useState } from 'react';

interface LogoProps {
    withText?: boolean;
    to?: string;
    className?: string;
}

export function Logo({ withText = true, to = '/', className = '' }: LogoProps) {
    const [imgFailed, setImgFailed] = useState(false);

    return (
        <Link
            to={to}
            className={`flex items-center gap-3 ${className}`}
            aria-label="Accueil - Coin D'Affaires"
        >
            {!imgFailed ? (
                <img
                    src="/logo.png"
                    alt="Coin D'Affaires"
                    className="h-10 sm:h-12 w-auto object-contain"
                    onError={() => setImgFailed(true)}
                />
            ) : (
                <div className="fallback-logo w-9 h-9 sm:w-10 sm:h-10 bg-[#000435] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">C</span>
                </div>
            )}
            {withText && (
                <span className="text-lg sm:text-xl font-bold text-[#000435]">
                    Coin D'Affaires
                </span>
            )}
        </Link>
    );
}
