import { useState } from "react";
import { ChevronLeft, ChevronDown, Camera, Calendar, MapPin, MessageCircle, Check } from "lucide-react";
import { Button, Input, Textarea, Select, ProgressSteps, Avatar, VerifiedBadge, Modal } from "../components/ui";
import { PROVIDERS, SERVICES, formatPrice } from "../data/mock";
import type { ScreenProps } from "../types";

export default function ServiceRequest({ navigate, user, params }: ScreenProps) {
  const provider = PROVIDERS.find((p) => p.id === (params.providerId || "prov1")) || PROVIDERS[0];
  const service = SERVICES.find((s) => s.id === params.serviceId);

  const [step, setStep] = useState(1);
  const [description, setDescription] = useState("");
  const [desiredDate, setDesiredDate] = useState("");
  const [location, setLocation] = useState("");
  const [selectedService, setSelectedService] = useState(service?.id || "");
  const [proposedAmount, setProposedAmount] = useState(service ? service.price.toString() : "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showNegotiation, setShowNegotiation] = useState(false);
  const [counterOffer, setCounterOffer] = useState("");

  const serviceOptions = SERVICES.filter((s) => s.providerId === provider.id).map((s) => ({
    value: s.id,
    label: `${s.name} — ${formatPrice(s.price)}`,
  }));

  const currentService = SERVICES.find((s) => s.id === selectedService) || service;

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
    }, 1200);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-5xl mb-6 animate-scale-in">
            ✅
          </div>
          <h1 className="text-2xl font-black text-zinc-900 font-display mb-3">Demande envoyée !</h1>
          <p className="text-zinc-500 leading-relaxed mb-2">
            Votre demande a été transmise à{" "}
            <span className="font-semibold text-zinc-800">{provider.name}</span>.
          </p>
          <p className="text-zinc-400 text-sm">
            Vous serez notifié(e) dès qu'elle sera traitée.
          </p>

          <div className="bg-zinc-50 rounded-2xl p-4 mt-8 w-full max-w-sm text-left space-y-3">
            <h3 className="font-bold text-zinc-900 font-display text-sm">Résumé de la demande</h3>
            {currentService && (
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Service</span>
                <span className="font-medium text-zinc-900">{currentService.name}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Prestataire</span>
              <span className="font-medium text-zinc-900">{provider.name}</span>
            </div>
            {desiredDate && (
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Date souhaitée</span>
                <span className="font-medium text-zinc-900">{desiredDate}</span>
              </div>
            )}
            <div className="flex justify-between text-sm border-t border-zinc-100 pt-2">
              <span className="text-zinc-500">Montant proposé</span>
              <span className="font-bold text-orange-500">
                {formatPrice(parseInt(proposedAmount) || (currentService?.price || 0))}
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 pb-12 space-y-3">
          <Button size="full" onClick={() => navigate("client-orders")}>
            Voir mes commandes
          </Button>
          <button
            onClick={() => navigate("client-messages")}
            className="w-full py-3 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Envoyer un message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 border-b border-zinc-100">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate("provider-profile", { providerId: provider.id })}
            className="w-9 h-9 rounded-xl border border-zinc-200 flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4 text-zinc-600" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-zinc-900 font-display">Faire une demande</h1>
            <p className="text-xs text-zinc-500 mt-0.5">Étape {step} sur 3</p>
          </div>
        </div>
        <ProgressSteps current={step} total={3} />
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-5 overflow-y-auto">
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            {/* Provider Info */}
            <div className="flex items-center gap-3 bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-14 h-14 rounded-xl object-cover bg-zinc-100"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-zinc-900 text-sm">{provider.name}</span>
                  {provider.verified && <VerifiedBadge />}
                </div>
                <p className="text-xs text-zinc-500">{provider.profession}</p>
                <p className="text-xs text-orange-500 font-medium mt-0.5">
                  Dès {formatPrice(provider.startingPrice)}
                </p>
              </div>
            </div>

            {/* Service Selection */}
            {serviceOptions.length > 0 && (
              <Select
                label="Service demandé"
                value={selectedService}
                onChange={setSelectedService}
                options={serviceOptions}
                placeholder="Sélectionnez un service"
              />
            )}

            {/* Description */}
            <Textarea
              label="Description de votre besoin"
              placeholder="Décrivez précisément votre besoin, les détails importants, vos attentes..."
              value={description}
              onChange={setDescription}
              rows={5}
            />

            {/* Photo attachment */}
            <div>
              <p className="text-sm font-medium text-zinc-700 mb-2">Photos / Documents (optionnel)</p>
              <div className="border-2 border-dashed border-zinc-200 rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer hover:bg-zinc-50 transition-colors">
                <Camera className="w-8 h-8 text-zinc-300" />
                <p className="text-sm text-zinc-400">Ajouter des photos</p>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-lg font-bold text-zinc-900 font-display">Détails pratiques</h2>

            {/* Date */}
            <div>
              <p className="text-sm font-medium text-zinc-700 mb-2">Date souhaitée</p>
              <div className="flex items-center gap-2 border border-zinc-200 rounded-xl px-4 py-3">
                <Calendar className="w-4 h-4 text-zinc-400" />
                <input
                  type="date"
                  value={desiredDate}
                  onChange={(e) => setDesiredDate(e.target.value)}
                  className="flex-1 text-sm text-zinc-900 outline-none bg-transparent"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            {/* Location */}
            <Input
              label="Lieu de la prestation"
              placeholder="Adresse, quartier, Bamako..."
              value={location}
              onChange={setLocation}
              icon={<MapPin className="w-4 h-4" />}
            />

            {/* Proposed Amount */}
            <div>
              <p className="text-sm font-medium text-zinc-700 mb-2">Montant proposé (FCFA)</p>
              {currentService && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl px-3 py-2 mb-2 flex items-center justify-between">
                  <span className="text-xs text-orange-700">Prix affiché</span>
                  <span className="text-sm font-bold text-orange-600">
                    {currentService.pricingType === "quote" ? "Sur devis" : formatPrice(currentService.price)}
                  </span>
                </div>
              )}
              <div className="flex items-center border border-zinc-200 rounded-xl overflow-hidden">
                <span className="bg-zinc-50 border-r border-zinc-200 px-3 py-3 text-sm text-zinc-500 font-medium">
                  FCFA
                </span>
                <input
                  type="number"
                  value={proposedAmount}
                  onChange={(e) => setProposedAmount(e.target.value)}
                  placeholder="Votre proposition"
                  className="flex-1 px-3 py-3 text-sm outline-none"
                />
              </div>
              {currentService && proposedAmount && parseInt(proposedAmount) < currentService.price && (
                <p className="text-xs text-orange-600 mt-1.5">
                  Votre proposition est inférieure au prix affiché. Le prestataire pourra négocier.
                </p>
              )}
            </div>

            {/* Payment method */}
            <div>
              <p className="text-sm font-medium text-zinc-700 mb-2">Mode de paiement</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 border border-green-200 bg-green-50 rounded-xl p-3">
                  <span className="text-xl">💵</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-zinc-900">Espèces</p>
                    <p className="text-xs text-green-600">Disponible</p>
                  </div>
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-3 border border-zinc-200 bg-zinc-50 rounded-xl p-3 opacity-60">
                  <span className="text-xl">📱</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-zinc-900">Mobile Money</p>
                    <p className="text-xs text-zinc-400">Bientôt disponible</p>
                  </div>
                  <span className="text-xs bg-zinc-200 text-zinc-500 px-2 py-0.5 rounded-full font-medium">
                    Bientôt
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-lg font-bold text-zinc-900 font-display">Message & confirmation</h2>

            <Textarea
              label="Message optionnel pour le prestataire"
              placeholder="Ajoutez une note personnelle à votre demande..."
              value={message}
              onChange={setMessage}
              rows={4}
            />

            {/* Summary */}
            <div className="bg-zinc-50 rounded-2xl p-4 space-y-3 border border-zinc-100">
              <h3 className="font-bold text-zinc-900 font-display text-sm">Récapitulatif</h3>
              <div className="space-y-2">
                {[
                  { label: "Prestataire", value: provider.name },
                  { label: "Service", value: currentService?.name || "Non sélectionné" },
                  { label: "Date souhaitée", value: desiredDate || "Non précisée" },
                  { label: "Lieu", value: location || "Non précisé" },
                  {
                    label: "Montant proposé",
                    value: proposedAmount ? formatPrice(parseInt(proposedAmount)) : "Non précisé",
                    highlight: true,
                  },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-zinc-500">{item.label}</span>
                    <span className={`font-medium ${item.highlight ? "text-orange-500" : "text-zinc-900"} text-right max-w-[55%]`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <p className="text-xs text-blue-700 leading-relaxed">
                <strong>Rappel :</strong> En envoyant cette demande, vous n'êtes pas encore engagé(e). Le prestataire pourra accepter, refuser ou faire une contre-proposition.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 pb-10 pt-4 border-t border-zinc-100 flex gap-3">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="flex-1 py-3.5 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            Retour
          </button>
        )}
        {step < 3 ? (
          <Button size={step > 1 ? "md" : "full"} className={step > 1 ? "flex-1" : ""} onClick={() => setStep(step + 1)}>
            Continuer
          </Button>
        ) : (
          <Button size="full" loading={loading} onClick={handleSubmit}>
            Envoyer la demande
          </Button>
        )}
      </div>
    </div>
  );
}
