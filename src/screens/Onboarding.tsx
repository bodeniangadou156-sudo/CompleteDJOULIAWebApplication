import { useState } from "react";
import { ProgressSteps, Button } from "../components/ui";
import type { ScreenProps } from "../types";

const SLIDES = [
  {
    emoji: "🔍",
    headline: "Découvrez des services près de vous",
    subheadline: "Parcourez des centaines de prestataires vérifiés à Bamako et partout au Mali.",
    bg: "from-orange-50 to-white",
    accent: "bg-orange-500",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=500&fit=crop&auto=format",
  },
  {
    emoji: "✅",
    headline: "Trouvez des professionnels de confiance",
    subheadline: "Chaque prestataire est vérifié et noté par notre communauté. Votre sécurité, notre priorité.",
    bg: "from-zinc-50 to-white",
    accent: "bg-zinc-900",
    image:
      "https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?w=600&h=500&fit=crop&auto=format",
  },
  {
    emoji: "💬",
    headline: "Échangez, demandez et réalisez vos projets",
    subheadline: "Négociez, commandez et suivez vos services directement dans l'application.",
    bg: "from-orange-50 to-white",
    accent: "bg-orange-500",
    image:
      "https://images.unsplash.com/photo-1521443331827-88ee11ea2706?w=600&h=500&fit=crop&auto=format",
  },
];

export default function Onboarding({ navigate }: ScreenProps) {
  const [step, setStep] = useState(0);
  const slide = SLIDES[step];

  const next = () => {
    if (step < SLIDES.length - 1) {
      setStep(step + 1);
    } else {
      navigate("home");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Skip */}
      <div className="flex justify-between items-center px-6 pt-12 pb-4">
        <div className="flex items-center gap-1">
          <span className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
          </span>
          <span className="font-black text-lg text-zinc-900 font-display tracking-tight">DJOULIA</span>
        </div>
        <button
          onClick={() => navigate("home")}
          className="text-zinc-400 text-sm font-medium hover:text-zinc-600 transition-colors"
        >
          Passer
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-6 py-4">
        {/* Image */}
        <div
          className={`relative rounded-3xl overflow-hidden bg-gradient-to-b ${slide.bg} flex-1 max-h-72 mb-8`}
        >
          <img
            src={slide.image}
            alt={slide.headline}
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg text-2xl">
            {slide.emoji}
          </div>
          {/* Floating cards */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-2 shadow-sm">
              <span className="text-green-500 text-xs">●</span>
              <span className="text-xs font-medium text-zinc-800">1 200+ prestataires</span>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-2 shadow-sm">
              <span className="text-orange-500 text-xs">★</span>
              <span className="text-xs font-medium text-zinc-800">4.8 / 5</span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-zinc-900 mb-3 leading-tight font-display">
            {slide.headline}
          </h1>
          <p className="text-zinc-500 text-base leading-relaxed">{slide.subheadline}</p>
        </div>

        {/* Progress */}
        <ProgressSteps current={step + 1} total={SLIDES.length} />
      </div>

      {/* CTA */}
      <div className="px-6 pb-12 pt-4 space-y-3">
        <Button size="full" onClick={next}>
          {step < SLIDES.length - 1 ? "Continuer" : "Commencer"}
        </Button>
        {step === 0 && (
          <div className="flex gap-3">
            <button
              onClick={() => navigate("login")}
              className="flex-1 py-3 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              Se connecter
            </button>
            <button
              onClick={() => navigate("register-choice")}
              className="flex-1 py-3 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              Créer un compte
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
