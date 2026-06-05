import { Link } from "@/i18n/navigation";
import { CheckCircle2, CalendarDays, Mail, Phone, Home } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Réservation confirmée !",
};

export default function ConfirmationPage() {
  return (
    <section className="min-h-screen pt-32 pb-16 bg-white flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        {/* Icon */}
        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
          <CheckCircle2 className="text-green-400" size={48} />
        </div>

        <h1 className="font-display text-4xl md:text-5xl font-bold text-tiki-gold mb-4">
          Réservation confirmée !
        </h1>
        <p className="text-slate-800 text-xl mb-8">
          Merci pour votre réservation. Vous allez recevoir un email de confirmation dans quelques minutes.
        </p>

        {/* What's next */}
        <div className="card-dark text-left mb-8">
          <h2 className="font-bold text-slate-800 text-lg mb-4">Et maintenant ?</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Mail className="text-tiki-gold shrink-0 mt-0.5" size={20} />
              <div>
                <div className="font-medium text-slate-800">Email de confirmation</div>
                <div className="text-slate-500 text-sm">Vérifiez votre boîte mail (et les spams). Vous y trouverez tous les détails de votre sortie.</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="text-tiki-gold shrink-0 mt-0.5" size={20} />
              <div>
                <div className="font-medium text-slate-800">Contact WhatsApp</div>
                <div className="text-slate-500 text-sm">Notre équipe vous contactera sous 24h pour confirmer les détails et le point de rendez-vous exact.</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CalendarDays className="text-tiki-gold shrink-0 mt-0.5" size={20} />
              <div>
                <div className="font-medium text-slate-800">Le jour J</div>
                <div className="text-slate-500 text-sm">Arrivez 15 minutes avant le départ. Prévoyez maillot de bain, crème solaire biodégradable et une bonne humeur !</div>
              </div>
            </li>
          </ul>
        </div>

        {/* Info importante si acompte */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-tiki-gold/10 border border-tiki-gold/30 text-left mb-8">
          <CheckCircle2 className="text-tiki-gold shrink-0 mt-0.5" size={18} />
          <p className="text-slate-500 text-sm">
            Si vous avez payé un acompte, le <strong className="text-slate-800">solde sera à régler le jour de l&apos;excursion</strong>, avant l&apos;embarquement (CB ou espèces).
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            <Home size={18} />
            Retour à l&apos;accueil
          </Link>
          <a
            href="https://wa.me/590690495848"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Nous contacter sur WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
