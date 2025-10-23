import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold mb-4">
            Prêt à Découvrir
            <br />
            Nos Nouvelles Offres ?
          </h2>
          
          <div className="flex gap-2 max-w-md mt-8">
            <Input
              type="email"
              placeholder="Votre Email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-full"
            />
            <Button className="rounded-full bg-white text-gray-900 hover:bg-gray-100 px-8">
              Envoyer
            </Button>
          </div>

          <div className="mt-8 text-sm text-gray-400">
            <p className="font-semibold text-white mb-2">
              CoinD'affaires pour Particuliers et Professionnels
            </p>
            <p>
              Nous aidons nos utilisateurs à identifier, simplifier et développer leurs annonces, 
              et nous créons une solution EV intelligente qui convient à tous.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
