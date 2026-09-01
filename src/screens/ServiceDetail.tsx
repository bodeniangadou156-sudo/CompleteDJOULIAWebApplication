import { useState } from "react";
import {
  ChevronLeft,
  Star,
  MapPin,
  Clock,
  Share2,
  Heart,
  MessageCircle,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import {
  Badge,
  Button,
  VerifiedBadge,
  StarRating,
  Avatar,
  Modal,
} from "../components/ui";
import { SERVICES, PROVIDERS, getProviderById, formatPrice } from "../data/mock";
import type { ScreenProps } from "../types";

export default function ServiceDetail({ navigate, user, params }: ScreenProps) {
  const service = SERVICES.find((s) => s.id === params.serviceId) || SERVICES[0];
  const provider = getProviderById(service.providerId) || PROVIDERS[0];

  const [favorited, setFavorited] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const images = [service.image, ...(provider.gallery.slice(0, 3))];

  const pricingLabel = {
    fixed: formatPrice(service.price),
    starting_from: `À partir de ${formatPrice(service.price)}`,
    quote: "Sur devis",
  };

  const handleRequest = () => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    navigate("service-request", { providerId: provider.id, serviceId: service.id });
  };

  const handleMessage = () => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    navigate(user.role === "client" ? "client-messages" : "provider-messages");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Image Carousel */}
      <div className="relative">
        <div className="relative h-72 bg-zinc-200 overflow-hidden">
          <img
            src={images[activeImage]}
            alt={service.name}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          {/* Thumbnails indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`h-1.5 rounded-full transition-all ${i === activeImage ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Back */}
        <div className="absolute top-12 left-4">
          <button
            onClick={() => navigate("home")}
            className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 text-zinc-700" />
          </button>
        </div>
        {/* Actions */}
        <div className="absolute top-12 right-4 flex gap-2">
          <button
            onClick={() => setFavorited(!favorited)}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm backdrop-blur-sm ${favorited ? "bg-orange-500" : "bg-white/90"}`}
          >
            <Heart className={`w-4 h-4 ${favorited ? "text-white fill-white" : "text-zinc-700"}`} />
          </button>
          <button className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
            <Share2 className="w-4 h-4 text-zinc-700" />
          </button>
        </div>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 px-4 py-3 overflow-x-auto bg-zinc-50 border-b border-zinc-100">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === activeImage ? "border-orange-500" : "border-transparent"}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Service Info */}
      <div className="px-4 py-5 border-b border-zinc-100">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <Badge variant="orange" size="sm" className="mb-2">{service.category}</Badge>
            <h1 className="text-xl font-black text-zinc-900 font-display leading-tight">{service.name}</h1>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xl font-black text-orange-500 font-display">
              {pricingLabel[service.pricingType]}
            </p>
            {service.pricingType !== "quote" && (
              <p className="text-[11px] text-zinc-400">par prestation</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-zinc-900">{service.rating}</span>
            <span className="text-sm text-zinc-400">({service.reviewCount} avis)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-zinc-400" />
            <span className="text-sm text-zinc-600">{service.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-zinc-400" />
            <span className="text-sm text-zinc-600">{service.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${service.available ? "bg-green-500" : "bg-zinc-300"}`} />
            <span className={`text-sm font-medium ${service.available ? "text-green-600" : "text-zinc-400"}`}>
              {service.available ? "Disponible" : "Indisponible"}
            </span>
          </div>
        </div>
      </div>

      {/* Provider Card */}
      <div className="px-4 py-4 border-b border-zinc-100">
        <button
          onClick={() => navigate("provider-profile", { providerId: provider.id })}
          className="w-full flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="relative shrink-0">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="w-14 h-14 rounded-2xl object-cover bg-zinc-100"
            />
            {provider.verified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                <CheckCircle className="w-3 h-3 text-white fill-white" strokeWidth={0} />
              </div>
            )}
          </div>
          <div className="flex-1 text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-zinc-900">{provider.name}</span>
              {provider.verified && <VerifiedBadge />}
            </div>
            <p className="text-sm text-orange-500 font-medium">{provider.profession}</p>
            <div className="flex items-center gap-3 mt-0.5">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium text-zinc-700">{provider.rating}</span>
              </div>
              <span className="text-xs text-zinc-400">{provider.completedOrders} commandes</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0" />
        </button>
      </div>

      {/* Description */}
      <div className="px-4 py-5 border-b border-zinc-100">
        <h2 className="font-bold text-zinc-900 font-display mb-2">Description</h2>
        <p className="text-sm text-zinc-600 leading-relaxed">{service.description}</p>
      </div>

      {/* Service Details */}
      <div className="px-4 py-5 border-b border-zinc-100">
        <h2 className="font-bold text-zinc-900 font-display mb-3">Détails</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: "💰", label: "Tarification", value: service.pricingType === "fixed" ? "Prix fixe" : service.pricingType === "starting_from" ? "À partir de" : "Sur devis" },
            { icon: "⏱️", label: "Durée estimée", value: service.duration },
            { icon: "📍", label: "Localisation", value: service.location },
            { icon: "✅", label: "Disponibilité", value: service.available ? "Disponible" : "Indisponible" },
          ].map((item) => (
            <div key={item.label} className="bg-zinc-50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{item.icon}</span>
                <span className="text-xs text-zinc-400">{item.label}</span>
              </div>
              <p className="text-sm font-semibold text-zinc-900">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="px-4 py-5 border-b border-zinc-100">
        <h2 className="font-bold text-zinc-900 font-display mb-3">Modes de paiement</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-3">
            <span className="text-xl">💵</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-zinc-900">Espèces</p>
              <p className="text-xs text-green-600 font-medium">Disponible</p>
            </div>
            <CheckCircle className="w-4 h-4 text-green-500 fill-green-500" strokeWidth={0} />
          </div>
          <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 rounded-xl p-3 opacity-60">
            <span className="text-xl">📱</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-zinc-900">Mobile Money</p>
              <p className="text-xs text-zinc-400">Orange Money, Moov Money</p>
            </div>
            <span className="text-xs bg-zinc-200 text-zinc-500 px-2 py-0.5 rounded-full font-medium">Bientôt</span>
          </div>
        </div>
      </div>

      {/* Other services by same provider */}
      <div className="px-4 py-5 border-b border-zinc-100">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-zinc-900 font-display">Autres services</h2>
          <button
            onClick={() => navigate("provider-profile", { providerId: provider.id })}
            className="text-orange-500 text-sm font-medium"
          >
            Voir tout
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {SERVICES.filter((s) => s.providerId === provider.id && s.id !== service.id)
            .slice(0, 3)
            .map((s) => (
              <div
                key={s.id}
                onClick={() => navigate("service-detail", { serviceId: s.id, providerId: provider.id })}
                className="shrink-0 w-44 bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-100 cursor-pointer hover:shadow-md transition-all"
              >
                <img src={s.image} alt={s.name} className="w-full h-24 object-cover bg-zinc-200" />
                <div className="p-3">
                  <p className="text-xs font-semibold text-zinc-900 line-clamp-1">{s.name}</p>
                  <p className="text-xs font-bold text-orange-500 mt-1">
                    {s.pricingType === "quote" ? "Sur devis" :
                     s.pricingType === "starting_from" ? `Dès ${formatPrice(s.price)}` :
                     formatPrice(s.price)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-100 px-4 py-3 flex gap-2">
        <button
          onClick={handleMessage}
          className="w-11 h-11 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-center hover:bg-zinc-100 transition-colors shrink-0"
        >
          <MessageCircle className="w-5 h-5 text-zinc-600" />
        </button>
        <Button className="flex-1" onClick={handleRequest}>
          {service.pricingType === "quote" ? "Demander un devis" : "Faire une demande"}
        </Button>
      </div>

      {/* Visitor Prompt */}
      <Modal open={showLoginPrompt} onClose={() => setShowLoginPrompt(false)} title="" size="sm">
        <div className="text-center space-y-4 py-2">
          <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl mx-auto">🔐</div>
          <div>
            <h3 className="font-bold text-zinc-900 font-display text-lg">Connectez-vous pour continuer</h3>
            <p className="text-sm text-zinc-500 mt-1">Créez un compte pour accéder à toutes les fonctionnalités.</p>
          </div>
          <div className="space-y-2 pt-2">
            <Button size="full" onClick={() => { setShowLoginPrompt(false); navigate("login"); }}>
              Se connecter
            </Button>
            <button
              onClick={() => { setShowLoginPrompt(false); navigate("register-choice"); }}
              className="w-full py-3 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
            >
              Créer un compte
            </button>
          </div>
        </div>
      </Modal>

      <div className="h-20" />
    </div>
  );
}
