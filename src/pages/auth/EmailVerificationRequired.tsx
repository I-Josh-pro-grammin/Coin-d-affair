import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';

export default function EmailVerificationRequired() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          {/* Icon */}
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900">
            Vérifiez votre email
          </h2>

          {/* Message */}
          <div className="space-y-3 text-gray-600">
            <p>
              Nous avons envoyé un lien de vérification à{' '}
              <span className="font-semibold text-gray-900">
                {email || 'votre adresse email'}
              </span>
            </p>
            <p>
              Veuillez cliquer sur le lien dans l'email pour activer votre compte
              et vous connecter.
            </p>
          </div>

          {/* Info Box */}
          <div className="w-full bg-blue-50 border border-blue-200 rounded-xl p-4 mt-2">
            <p className="text-sm text-blue-800">
              <strong>Astuce:</strong> Si vous ne voyez pas l'email, vérifiez votre
              dossier spam ou courrier indésirable.
            </p>
          </div>

          {/* Actions */}
          <div className="w-full space-y-3 mt-4">
            <button
              onClick={() => navigate('/auth/login')}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#000435] text-white rounded-full font-medium hover:bg-[#000435]/90 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à la connexion
            </button>

            <button
              onClick={() => navigate('/auth/login')}
              className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all"
            >
              J'ai vérifié mon email
            </button>
          </div>

          {/* Help Text */}
          <p className="text-sm text-gray-500 mt-4">
            Besoin d'aide?{' '}
            <a
              href="/aide"
              className="text-[#000435] hover:underline font-medium"
            >
              Contactez le support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
