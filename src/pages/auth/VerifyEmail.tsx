import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVerifyEmailQuery } from '@/redux/api/apiSlice';
import { toast } from 'sonner';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading, isSuccess } = useVerifyEmailQuery(token);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Email vérifié avec succès !');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
    if (error) {
      toast.error('Lien de vérification invalide ou expiré.');
    }
  }, [isSuccess, error, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {isLoading && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-[#000435] animate-spin" />
            <h2 className="text-xl font-bold text-gray-900">Vérification en cours...</h2>
            <p className="text-gray-600">Veuillez patienter pendant que nous vérifions votre email.</p>
          </div>
        )}

        {isSuccess && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Email Vérifié !</h2>
            <p className="text-gray-600">Votre compte a été activé avec succès. Vous allez être redirigé vers la page de connexion.</p>
            <button
              onClick={() => navigate('/login')}
              className="mt-4 px-6 py-2 bg-[#000435] text-white rounded-full font-medium hover:bg-[#000435]/90 transition-all"
            >
              Se connecter maintenant
            </button>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Échec de la vérification</h2>
            <p className="text-gray-600">Le lien de vérification est invalide ou a expiré.</p>
            <button
              onClick={() => navigate('/login')}
              className="mt-4 px-6 py-2 border-2 border-[#000435] text-[#000435] rounded-full font-medium hover:bg-gray-50 transition-all"
            >
              Retour à la connexion
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
