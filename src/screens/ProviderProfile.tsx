import { useState } from "react";
import {
  MapPin,
  Star,
  Phone,
  Share2,
  Heart,
  MessageCircle,
  ChevronLeft,
  CheckCircle,
  Clock,
  Award,
  Briefcase,
  Languages,
} from "lucide-react";
import {
  Avatar,
  Badge,
  Button,
  Tabs,
  VerifiedBadge,
  StarRating,
  ServiceCard,
  PostCard,
  EmptyState,
  Modal,
} from "../components/ui";
import { PROVIDERS, SERVICES, POSTS, formatPrice, getServicesByProvider } from "../data/mock";
import type { ScreenProps } from "../types";

export default function ProviderProfile({ navigate, user, params }: ScreenProps) {
  const provider = PROVIDERS.find((p) => p.id === (params.providerId || "prov1")) || PROVIDERS[0];
  const services = getServicesByProvider(provider.id);
  const posts = POSTS.filter((p) => p.providerId === provider.id);

  const [activeTab, setActiveTab] = useState("about");
  const [favorited, setFavorited] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showRequest, setShowRequest] = useState(false);

  const tabs = [
    { id: "about", label: "À propos" },
    { id: "services", label: `Services (${services.length})` },
    { id: "gallery", label: "Galerie" },
    { id: "publications", label: "Publications" },
  ];

  const handleContact = () => {
    if (!user) {
      navigate("login");
      return;
    }
    navigate(user.role === "client" ? "client-messages" : "provider-messages", {
      conversationId: "conv1",
    });
  };

  const handleRequest = () => {
    if (!user) {
      navigate("login");
      return;
    }
    navigate("service-request", { providerId: provider.id });
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Cover */}
      <div className="relative h-52 bg-zinc-200">
        <img
          src={provider.coverPhoto}
          alt="Couverture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {/* Back button */}
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
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm backdrop-blur-sm ${
              favorited ? "bg-orange-500" : "bg-white/90"
            }`}
          >
            <Heart className={`w-4 h-4 ${favorited ? "text-white fill-white" : "text-zinc-700"}`} />
          </button>
          <button
            onClick={() => setShowShare(true)}
            className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
          >
            <Share2 className="w-4 h-4 text-zinc-700" />
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="relative bg-white px-4 pb-4 border-b border-zinc-100">
        {/* Avatar */}
        <div className="absolute -top-12 left-4">
          <div className="relative">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg bg-zinc-100"
            />
            {provider.verified && (
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                <CheckCircle className="w-4 h-4 text-white fill-white" strokeWidth={0} />
              </div>
            )}
          </div>
        </div>

        <div className="pt-14">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-black text-zinc-900 font-display">{provider.name}</h1>
              <p className="text-orange-500 font-medium text-sm">{provider.profession}</p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-xs text-zinc-500">{provider.location}</span>
              </div>
            </div>
            <div className="text-right">
              <StarRating rating={provider.rating} count={provider.reviewCount} />
              <p className="text-xs text-zinc-500 mt-1">
                {provider.completedOrders} commandes
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4 mb-4">
            {[
              { label: "Expérience", value: `${provider.experience} ans` },
              { label: "Commandes", value: provider.completedOrders.toString() },
              { label: "À partir de", value: formatPrice(provider.startingPrice) },
            ].map((s) => (
              <div key={s.label} className="bg-zinc-50 rounded-xl p-3 text-center">
                <p className="font-bold text-zinc-900 text-sm font-display">{s.value}</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-2">
            <Button onClick={handleContact} variant="outline" className="flex-1 gap-2">
              <MessageCircle className="w-4 h-4" />
              Message
            </Button>
            <Button onClick={handleRequest} className="flex-2 flex-1 gap-2">
              <Briefcase className="w-4 h-4" />
              Faire une demande
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white sticky top-0 z-10">
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>

      {/* Tab Content */}
      <div className="px-4 py-5 pb-24 bg-zinc-50 min-h-96">
        {activeTab === "about" && (
          <div className="space-y-5 animate-fade-in">
            {/* Bio */}
            <div className="bg-white rounded-2xl p-4">
              <h3 className="font-bold text-zinc-900 mb-2 font-display">Biographie</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">{provider.bio}</p>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl p-4">
              <h3 className="font-bold text-zinc-900 mb-3 font-display">Compétences</h3>
              <div className="flex flex-wrap gap-2">
                {provider.skills.map((skill) => (
                  <Badge key={skill} variant="orange" size="md">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Info Grid */}
            <div className="bg-white rounded-2xl p-4 space-y-4">
              <h3 className="font-bold text-zinc-900 font-display">Informations</h3>
              {[
                {
                  icon: <Award className="w-4 h-4 text-orange-500" />,
                  label: "Expérience",
                  value: `${provider.experience} ans d'expérience`,
                },
                {
                  icon: <MapPin className="w-4 h-4 text-orange-500" />,
                  label: "Localisation",
                  value: provider.location,
                },
                {
                  icon: <Languages className="w-4 h-4 text-orange-500" />,
                  label: "Langues",
                  value: provider.languages.join(", "),
                },
                {
                  icon: <Clock className="w-4 h-4 text-orange-500" />,
                  label: "Membre depuis",
                  value: new Date(provider.joinedDate).toLocaleDateString("fr-FR", {
                    month: "long",
                    year: "numeric",
                  }),
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">{item.label}</p>
                    <p className="text-sm font-medium text-zinc-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            {provider.socialLinks && (
              <div className="bg-white rounded-2xl p-4">
                <h3 className="font-bold text-zinc-900 mb-3 font-display">Réseaux sociaux</h3>
                <div className="flex gap-3">
                  {provider.socialLinks.instagram && (
                    <div className="flex items-center gap-2 bg-pink-50 rounded-xl px-3 py-2">
                      <span className="text-sm">📸</span>
                      <span className="text-xs font-medium text-pink-700">
                        {provider.socialLinks.instagram}
                      </span>
                    </div>
                  )}
                  {provider.socialLinks.facebook && (
                    <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-3 py-2">
                      <span className="text-sm">📘</span>
                      <span className="text-xs font-medium text-blue-700">Facebook</span>
                    </div>
                  )}
                  {provider.socialLinks.whatsapp && (
                    <div className="flex items-center gap-2 bg-green-50 rounded-xl px-3 py-2">
                      <Phone className="w-4 h-4 text-green-500" />
                      <span className="text-xs font-medium text-green-700">WhatsApp</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "services" && (
          <div className="space-y-3 animate-fade-in">
            {services.length > 0 ? (
              services.map((s) => (
                <div
                  key={s.id}
                  className="bg-white rounded-2xl overflow-hidden border border-zinc-100 cursor-pointer hover:shadow-md transition-all"
                  onClick={() => navigate("service-detail", { serviceId: s.id })}
                >
                  <div className="flex gap-3 p-3">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-20 h-20 rounded-xl object-cover bg-zinc-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-zinc-900 text-sm">{s.name}</p>
                      <p className="text-xs text-zinc-500 mt-0.5 line-clamp-2">{s.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-bold text-orange-500">
                          {s.pricingType === "quote" ? "Sur devis" :
                           s.pricingType === "starting_from" ? `À partir de ${formatPrice(s.price)}` :
                           formatPrice(s.price)}
                        </span>
                        <span className="text-xs text-zinc-400">{s.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 pb-3 pt-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("service-request", { providerId: provider.id, serviceId: s.id });
                      }}
                      className="w-full bg-orange-50 text-orange-600 border border-orange-200 rounded-xl py-2 text-xs font-bold hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all"
                    >
                      Faire une demande
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState
                icon="🛠️"
                title="Aucun service publié"
                description="Ce prestataire n'a pas encore publié de services."
              />
            )}
          </div>
        )}

        {activeTab === "gallery" && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-3 gap-1">
              {provider.gallery.map((img, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden bg-zinc-100">
                  <img
                    src={img}
                    alt={`Galerie ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
            {provider.gallery.length === 0 && (
              <EmptyState
                icon="📸"
                title="Galerie vide"
                description="Ce prestataire n'a pas encore ajouté de photos."
              />
            )}
          </div>
        )}

        {activeTab === "publications" && (
          <div className="space-y-4 animate-fade-in">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post.id} post={post} navigate={navigate} />
              ))
            ) : (
              <EmptyState
                icon="📝"
                title="Aucune publication"
                description="Ce prestataire n'a pas encore publié de contenu."
              />
            )}
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-100 px-4 py-3 flex gap-2">
        <Button onClick={handleContact} variant="outline" className="flex-1">
          <MessageCircle className="w-4 h-4" />
          Message
        </Button>
        <Button onClick={handleRequest} className="flex-1">
          Faire une demande
        </Button>
      </div>

      {/* Share Modal */}
      <Modal open={showShare} onClose={() => setShowShare(false)} title="Partager ce profil" size="sm">
        <div className="space-y-3">
          {["WhatsApp", "Facebook", "Copier le lien", "Plus..."].map((option) => (
            <button
              key={option}
              className="w-full flex items-center gap-3 px-4 py-3 bg-zinc-50 rounded-xl hover:bg-zinc-100 transition-colors text-sm font-medium text-zinc-800"
              onClick={() => setShowShare(false)}
            >
              {option === "WhatsApp" ? "💬" : option === "Facebook" ? "📘" : option === "Copier le lien" ? "🔗" : "⋯"}
              {option}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
