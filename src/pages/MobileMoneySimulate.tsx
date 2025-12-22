import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function MobileMoneySimulate() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('sessionId') || '';
  const phone = searchParams.get('phone') || '';
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    const t = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      // Simulate successful payment redirect
      navigate('/checkout/success');
    }
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Simulation Mobile Money</h1>
          <p className="text-gray-600 mb-6">Session: <span className="font-mono">{sessionId}</span></p>
          <p className="text-gray-600 mb-6">Téléphone: <span className="font-mono">{phone}</span></p>
          <p className="text-gray-700 mb-6">Pretending to process mobile-money payment... Redirecting in <strong>{countdown}</strong> seconds.</p>
          <div className="flex justify-center gap-4">
            <button onClick={() => navigate('/checkout/success')} className="px-6 py-2 bg-green-600 text-white rounded-lg">Simulate success now</button>
            <button onClick={() => navigate('/checkout/cancel')} className="px-6 py-2 bg-gray-200 rounded-lg">Cancel</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
