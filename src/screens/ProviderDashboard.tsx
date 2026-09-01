import { useState } from "react";
import {
  Home,
  ShoppingBag,
  Plus,
  MessageCircle,
  User,
  Bell,
  Search,
  TrendingUp,
  Eye,
  Star,
  ChevronRight,
  Edit3,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Image,
  Camera,
  LogOut,
  CheckCircle,
  Clock,
  MapPin,
  X,
} from "lucide-react";
import {
  Avatar,
  Badge,
  Button,
  OrderStatusBadge,
  EmptyState,
  Tabs,
  Textarea,
  Input,
  Select,
  VerifiedBadge,
  Modal,
} from "../components/ui";
import { ORDERS, SERVICES, PROVIDERS, formatPrice } from "../data/mock";
import type { ScreenProps, Service } from "../types";

interface ProviderDashboardProps extends ScreenProps {
  activeTab: "home" | "services" | "publish" | "messages" | "profile";
}

// ─── Dashboard Home ───────────────────────────────────────────────────────────
function ProviderHome({ navigate, user }: ScreenProps) {
  const provider = PROVIDERS[0];
  const pendingOrders = ORDERS.filter((o) => o.status === "en_attente");
  const activeOrders = ORDERS.filter((o) => ["en_cours", "confirmee", "acceptee"].includes(o.status));
  const completedOrders = ORDERS.filter((o) => o.status === "terminee");
  const revenue = completedOrders.reduce((sum, o) => sum + o.finalPrice, 0);

  return (
    <div className="space-y-6 pb-6">
      {/* Welcome Banner */}
      <div className="bg-zinc-900 rounded-3xl p-5 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-transparent" />
        </div>
        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-zinc-400 text-sm">Bienvenue</p>
            <h2 className="text-xl font-black font-display">{provider.name}</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <VerifiedBadge />
              <span className="text-orange-400 text-sm font-medium">Prestataire certifié</span>
            </div>
          </div>
          <img
            src={provider.avatar}
            alt={provider.name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-orange-500/30"
          />
        </div>
        <div className="relative grid grid-cols-2 gap-3 mt-4">
          <div className="bg-white/10 rounded-2xl p-3">
            <p className="text-xs text-zinc-400">Revenus (mois)</p>
            <p className="text-lg font-black font-display">{formatPrice(revenue)}</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3">
            <p className="text-xs text-zinc-400">Vues du profil</p>
            <p className="text-lg font-black font-display">248</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          {
            icon: "⏳",
            label: "Demandes en attente",
            value: pendingOrders.length,
            color: "bg-yellow-50 border-yellow-100",
            textColor: "text-yellow-700",
            action: "Voir",
          },
          {
            icon: "⚡",
            label: "Commandes actives",
            value: activeOrders.length,
            color: "bg-orange-50 border-orange-100",
            textColor: "text-orange-700",
            action: "Gérer",
          },
          {
            icon: "✅",
            label: "Terminées",
            value: completedOrders.length,
            color: "bg-green-50 border-green-100",
            textColor: "text-green-700",
            action: "Voir",
          },
          {
            icon: "⭐",
            label: "Note moyenne",
            value: provider.rating,
            color: "bg-blue-50 border-blue-100",
            textColor: "text-blue-700",
            action: "Avis",
          },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.color} border rounded-2xl p-4`}>
            <div className="flex items-start justify-between">
              <span className="text-2xl">{stat.icon}</span>
              <button className={`text-[11px] font-semibold ${stat.textColor}`}>{stat.action}</button>
            </div>
            <p className="text-2xl font-black font-display mt-2 text-zinc-900">{stat.value}</p>
            <p className="text-xs text-zinc-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Pending Requests */}
      {pendingOrders.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-zinc-900 font-display">Nouvelles demandes</h3>
            <span className="bg-orange-500 text-white text-[10px] font-bold rounded-full px-2 py-0.5">
              {pendingOrders.length}
            </span>
          </div>
          <div className="space-y-3">
            {pendingOrders.map((order) => (
              <div key={order.id} className="bg-white border border-zinc-100 rounded-2xl p-4">
                <div className="flex gap-3 mb-3">
                  <img
                    src={order.clientAvatar}
                    alt={order.clientName}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <p className="font-semibold text-zinc-900 text-sm">{order.clientName}</p>
                    <p className="text-xs text-zinc-500">{order.serviceName}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-sm font-bold text-orange-500">{formatPrice(order.finalPrice)}</span>
                  </div>
                </div>
                <p className="text-xs text-zinc-500 mb-3 line-clamp-2">{order.description}</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-green-500 text-white rounded-xl text-xs font-bold hover:bg-green-600 transition-colors">
                    Accepter
                  </button>
                  <button className="flex-1 py-2 bg-zinc-100 text-zinc-700 rounded-xl text-xs font-bold hover:bg-zinc-200 transition-colors">
                    Refuser
                  </button>
                  <button
                    onClick={() => navigate("provider-messages")}
                    className="w-9 h-9 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center hover:bg-orange-100 transition-colors shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Orders */}
      {activeOrders.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-zinc-900 font-display">Commandes actives</h3>
          </div>
          <div className="space-y-3">
            {activeOrders.map((order) => (
              <div key={order.id} className="bg-white border border-zinc-100 rounded-2xl p-4 flex gap-3">
                <img
                  src={order.serviceImage}
                  alt={order.serviceName}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-zinc-900 text-sm">{order.serviceName}</p>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">Client: {order.clientName}</p>
                  <p className="text-xs font-bold text-orange-500 mt-1">{formatPrice(order.finalPrice)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h3 className="font-bold text-zinc-900 mb-3 font-display">Actions rapides</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Ajouter un service", icon: "➕", screen: "provider-services" },
            { label: "Publier", icon: "📸", screen: "provider-publish" },
            { label: "Messages", icon: "💬", screen: "provider-messages" },
          ].map((a) => (
            <button
              key={a.label}
              onClick={() => navigate(a.screen as any)}
              className="bg-white border border-zinc-100 rounded-2xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition-all"
            >
              <span className="text-2xl">{a.icon}</span>
              <span className="text-xs font-medium text-zinc-700 text-center leading-tight">{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Services Tab ─────────────────────────────────────────────────────────────
function ServicesTab({ navigate }: ScreenProps) {
  const myServices = SERVICES.filter((s) => s.providerId === "prov1");
  const [services, setServices] = useState(myServices);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newService, setNewService] = useState({ name: "", price: "", description: "", pricingType: "fixed" });

  const toggleService = (id: string) => {
    setServices(services.map((s) => s.id === id ? { ...s, available: !s.available } : s));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-zinc-900 font-display">Mes services ({services.length})</h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 bg-orange-500 text-white rounded-xl px-3 py-2 text-xs font-bold hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Ajouter
        </button>
      </div>

      {services.length > 0 ? (
        <div className="space-y-3">
          {services.map((service) => (
            <div key={service.id} className="bg-white border border-zinc-100 rounded-2xl overflow-hidden">
              <div className="flex gap-3 p-4">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-16 h-16 rounded-xl object-cover bg-zinc-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-zinc-900 text-sm">{service.name}</p>
                    <button onClick={() => toggleService(service.id)}>
                      {service.available ? (
                        <ToggleRight className="w-6 h-6 text-green-500" />
                      ) : (
                        <ToggleLeft className="w-6 h-6 text-zinc-300" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{service.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-bold text-orange-500">
                      {service.pricingType === "quote" ? "Sur devis" :
                       service.pricingType === "starting_from" ? `Dès ${formatPrice(service.price)}` :
                       formatPrice(service.price)}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      service.available ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-500"
                    }`}>
                      {service.available ? "Actif" : "Inactif"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex border-t border-zinc-50">
                <button className="flex-1 py-2.5 flex items-center justify-center gap-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
                  <Edit3 className="w-3.5 h-3.5" />
                  Modifier
                </button>
                <div className="w-px bg-zinc-50" />
                <button className="flex-1 py-2.5 flex items-center justify-center gap-1.5 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="🛠️"
          title="Aucun service publié"
          description="Créez votre premier service pour commencer à recevoir des demandes."
          action={{ label: "Créer un service", onClick: () => setShowAddModal(true) }}
        />
      )}

      {/* Add Service Modal */}
      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Nouveau service" size="md">
        <div className="space-y-4">
          <Input
            label="Nom du service"
            placeholder="Ex: Maquillage de mariée"
            value={newService.name}
            onChange={(v) => setNewService({ ...newService, name: v })}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Prix (FCFA)"
              placeholder="Ex: 25000"
              value={newService.price}
              onChange={(v) => setNewService({ ...newService, price: v })}
              type="number"
            />
            <Select
              label="Type de tarif"
              value={newService.pricingType}
              onChange={(v) => setNewService({ ...newService, pricingType: v })}
              options={[
                { value: "fixed", label: "Prix fixe" },
                { value: "starting_from", label: "À partir de" },
                { value: "quote", label: "Sur devis" },
              ]}
            />
          </div>
          <Textarea
            label="Description"
            placeholder="Décrivez votre service en détail..."
            value={newService.description}
            onChange={(v) => setNewService({ ...newService, description: v })}
            rows={4}
          />
          <div className="border-2 border-dashed border-zinc-200 rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer hover:bg-zinc-50">
            <Image className="w-6 h-6 text-zinc-300" />
            <p className="text-sm text-zinc-400">Ajouter une photo du service</p>
          </div>
          <Button
            size="full"
            onClick={() => {
              setShowAddModal(false);
              setNewService({ name: "", price: "", description: "", pricingType: "fixed" });
            }}
          >
            Publier le service
          </Button>
        </div>
      </Modal>
    </div>
  );
}

// ─── Publish Tab ──────────────────────────────────────────────────────────────
function PublishTab({ navigate }: ScreenProps) {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [posted, setPosted] = useState(false);

  const handlePost = () => {
    if (!content.trim()) return;
    setPosted(true);
    setTimeout(() => {
      setContent("");
      setImages([]);
      setPosted(false);
    }, 2000);
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-bold text-zinc-900 mb-1 font-display">Créer une publication</h3>
        <p className="text-sm text-zinc-500">Partagez votre activité avec votre communauté</p>
      </div>

      {/* Composer */}
      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-zinc-100">
          <img
            src={PROVIDERS[0].avatar}
            alt={PROVIDERS[0].name}
            className="w-10 h-10 rounded-xl object-cover"
          />
          <div>
            <p className="font-semibold text-zinc-900 text-sm">{PROVIDERS[0].name}</p>
            <p className="text-xs text-zinc-500">Partager avec votre audience</p>
          </div>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Quoi de neuf dans votre activité ?"
          rows={5}
          className="w-full px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none resize-none bg-transparent"
        />

        {/* Image preview area */}
        {images.length > 0 && (
          <div className="px-4 pb-3 grid grid-cols-3 gap-2">
            {images.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-zinc-100">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                  className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Toolbar */}
        <div className="flex items-center gap-2 px-4 pb-4 pt-2 border-t border-zinc-100">
          <button
            onClick={() =>
              setImages([
                ...images,
                "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop&auto=format",
              ])
            }
            className="flex items-center gap-1.5 text-zinc-500 hover:text-orange-500 transition-colors text-sm font-medium"
          >
            <Image className="w-4 h-4" />
            Photo
          </button>
          <button className="flex items-center gap-1.5 text-zinc-500 hover:text-orange-500 transition-colors text-sm font-medium">
            <Camera className="w-4 h-4" />
            Vidéo
          </button>
          <div className="flex-1" />
          <button
            onClick={handlePost}
            disabled={!content.trim() || posted}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
              content.trim() && !posted
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : posted
                ? "bg-green-500 text-white"
                : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
            }`}
          >
            {posted ? "✓ Publié !" : "Publier"}
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 space-y-2">
        <p className="text-sm font-bold text-orange-800">💡 Conseils de publication</p>
        <ul className="text-xs text-orange-700 space-y-1">
          <li>• Partagez vos réalisations avec des photos de qualité</li>
          <li>• Utilisez des hashtags pertinents (#bamako #beaute)</li>
          <li>• Publiez régulièrement pour augmenter votre visibilité</li>
          <li>• Répondez aux commentaires rapidement</li>
        </ul>
      </div>

      {/* Recent posts */}
      <div>
        <h4 className="font-bold text-zinc-900 mb-3 font-display text-sm">Mes publications récentes</h4>
        <div className="bg-white border border-zinc-100 rounded-2xl p-4 flex gap-3">
          <img
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=60&h=60&fit=crop&auto=format"
            alt=""
            className="w-14 h-14 rounded-xl object-cover shrink-0"
          />
          <div className="flex-1">
            <p className="text-xs text-zinc-700 line-clamp-2">
              ✨ Regardez ce look que j'ai réalisé pour la mariée de ce weekend !...
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-zinc-400">
              <span>❤️ 234</span>
              <span>💬 28</span>
              <span>Il y a 2 heures</span>
            </div>
          </div>
          <div className="flex gap-1 shrink-0">
            <button className="w-7 h-7 bg-zinc-50 rounded-lg flex items-center justify-center hover:bg-zinc-100">
              <Edit3 className="w-3.5 h-3.5 text-zinc-500" />
            </button>
            <button className="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center hover:bg-red-100">
              <Trash2 className="w-3.5 h-3.5 text-red-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Profile Tab ──────────────────────────────────────────────────────────────
function ProviderProfileTab({ navigate, logout }: ScreenProps) {
  const provider = PROVIDERS[0];

  return (
    <div className="space-y-4">
      {/* Profile Card */}
      <div className="bg-white border border-zinc-100 rounded-2xl overflow-hidden">
        <div className="relative h-24">
          <img src={provider.coverPhoto} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="px-4 pb-4">
          <div className="flex items-end justify-between -mt-8 mb-3">
            <div className="relative">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-16 h-16 rounded-2xl object-cover border-3 border-white shadow-md bg-zinc-100"
                style={{ borderWidth: 3 }}
              />
              {provider.verified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                  <CheckCircle className="w-3.5 h-3.5 text-white fill-white" strokeWidth={0} />
                </div>
              )}
            </div>
            <button className="flex items-center gap-1.5 border border-zinc-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50">
              <Edit3 className="w-3 h-3" />
              Modifier
            </button>
          </div>
          <h2 className="font-bold text-zinc-900 font-display">{provider.name}</h2>
          <p className="text-sm text-orange-500 font-medium">{provider.profession}</p>
          <div className="flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3 text-zinc-400" />
            <span className="text-xs text-zinc-500">{provider.location}</span>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-zinc-900">{provider.rating}</span>
              <span className="text-xs text-zinc-400">({provider.reviewCount})</span>
            </div>
            <span className="text-zinc-200">•</span>
            <span className="text-xs text-zinc-500">{provider.completedOrders} commandes</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { value: "248", label: "Vues profil" },
          { value: provider.completedOrders.toString(), label: "Commandes" },
          { value: formatPrice(25000), label: "Ce mois" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-zinc-100 p-3 text-center">
            <p className="text-base font-black text-zinc-900 font-display">{s.value}</p>
            <p className="text-[10px] text-zinc-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
        {[
          { icon: "🛠️", label: "Mes services", screen: "provider-services" },
          { icon: "📸", label: "Mes publications", screen: "provider-publish" },
          { icon: "💬", label: "Messages", screen: "provider-messages" },
          { icon: "🖼️", label: "Galerie", screen: null },
          { icon: "📍", label: "Modifier la localisation", screen: null },
          { icon: "🔗", label: "Réseaux sociaux", screen: null },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => item.screen && navigate(item.screen as any)}
            className="w-full flex items-center gap-3 px-4 py-4 hover:bg-zinc-50 transition-colors border-b border-zinc-50 last:border-0"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="flex-1 text-sm font-medium text-zinc-800 text-left">{item.label}</span>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </button>
        ))}
      </div>

      <button
        onClick={logout}
        className="w-full flex items-center gap-3 px-4 py-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 hover:bg-red-100 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span className="text-sm font-semibold">Se déconnecter</span>
      </button>
    </div>
  );
}

// ─── Main Provider Dashboard ──────────────────────────────────────────────────
export default function ProviderDashboard({
  navigate,
  user,
  params,
  login,
  logout,
  activeTab,
}: ProviderDashboardProps) {
  const titles = {
    home: "Mon espace",
    services: "Mes services",
    publish: "Publier",
    messages: "Messages",
    profile: "Mon profil",
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-zinc-100 px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1">
          <div className="w-6 h-6 bg-zinc-900 rounded-md flex items-center justify-center">
            <span className="text-white font-black text-xs">D</span>
          </div>
          <h1 className="font-bold text-zinc-900 font-display">{titles[activeTab]}</h1>
        </div>
        <button className="w-9 h-9 bg-zinc-50 rounded-xl flex items-center justify-center border border-zinc-200">
          <Bell className="w-4 h-4 text-zinc-600" />
          <span className="sr-only">Notifications</span>
        </button>
        <img
          src={PROVIDERS[0].avatar}
          alt=""
          className="w-8 h-8 rounded-xl object-cover cursor-pointer"
          onClick={() => navigate("provider-dashboard")}
        />
      </div>

      {/* Content */}
      <div className="px-4 py-5 pb-24 min-h-screen">
        {activeTab === "home" && <ProviderHome navigate={navigate} user={user} params={params} login={login} logout={logout} />}
        {activeTab === "services" && <ServicesTab navigate={navigate} user={user} params={params} login={login} logout={logout} />}
        {activeTab === "publish" && <PublishTab navigate={navigate} user={user} params={params} login={login} logout={logout} />}
        {activeTab === "profile" && <ProviderProfileTab navigate={navigate} user={user} params={params} login={login} logout={logout} />}
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-sm border-t border-zinc-100 flex">
        {[
          { id: "home", label: "Accueil", screen: "provider-dashboard" as const, icon: "🏠" },
          { id: "orders", label: "Commandes", screen: "provider-dashboard" as const, icon: "📦" },
          { id: "publish", label: "Publier", screen: "provider-publish" as const, isMain: true },
          { id: "messages", label: "Messages", screen: "provider-messages" as const, icon: "💬" },
          { id: "profile", label: "Profil", screen: "provider-dashboard" as const, icon: "👤" },
        ].map((item) => {
          const isActive =
            (activeTab === "home" && item.id === "home") ||
            (activeTab === "services" && item.id === "orders") ||
            (activeTab === "publish" && item.id === "publish") ||
            (activeTab === "profile" && item.id === "profile");

          if (item.isMain) {
            return (
              <button
                key={item.id}
                onClick={() => navigate("provider-publish")}
                className="flex-1 flex flex-col items-center py-2.5"
              >
                <div className="w-11 h-11 -mt-5 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg border-4 border-zinc-50 hover:bg-orange-600 transition-colors">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] font-medium text-orange-500 mt-0.5">Publier</span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.screen)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors ${
                isActive ? "text-orange-500" : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              <span className="text-lg leading-none">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
