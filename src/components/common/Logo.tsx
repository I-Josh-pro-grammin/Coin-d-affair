import { Link } from 'react-router-dom';

interface LogoProps {
    withText?: boolean;
    to?: string;
    className?: string;
}

export function Logo({ withText = true, to = '/', className = '' }: LogoProps) {
    return (
        <Link
            to={to}
            className={`flex items-center gap-3 ${className}`}
            aria-label="Accueil - Coin D'Affaires"
        >
            <img
                src="/logo.png"
                alt="Coin D'Affaires"
                className="h-10 sm:h-12 w-auto object-contain"
                onError={(e) => {
                    // Fallback to text-based logo if image fails
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent && !parent.querySelector('.fallback-logo')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'fallback-logo w-9 h-9 sm:w-10 sm:h-10 bg-[#000435] rounded-lg flex items-center justify-center';
                        fallback.innerHTML = '<span class="text-white font-bold text-lg">C</span>';
                        parent.insertBefore(fallback, parent.firstChild);
                    }
                }}
            />
            {withText && (
                <span className="text-lg sm:text-xl font-bold text-[#000435]">
                    Coin D'Affaires
                </span>
            )}
        </Link>
    );
}
