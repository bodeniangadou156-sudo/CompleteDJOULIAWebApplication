import { useState } from "react";
import {
  Search,
  Bell,
  ChevronRight,
  Clock,
  CheckCircle,
  Heart,
  User,
  Settings,
  FileText,
  LogOut,
  Star,
  MapPin,
  Phone,
  Edit3,
} from "lucide-react";
import {
  Avatar,
  Badge,
  Button,
  ProviderCard,
  OrderStatusBadge,
  EmptyState,
  StarRating,
  VerifiedBadge,
} from "../components/ui";
import { ClientBottomNav } from "./Home";
import {
  ORDERS,
  PROVIDERS,
  SERVICES,
  formatPrice,
} from "../data/mock";
import { InvoiceModal } from "../components/Invoice";
import type { ScreenProps, Order } from "../types";

interface ClientDashboardProps extends ScreenProps {
  activeTab: "home" | "orders" | "favorites" | "profile";
}

// ─── Dashboard Home ───────────────────────────────────────────────────────────
function DashboardHome({ navigate, user }: ScreenProps) {
  const activeOrders = ORDERS.filter((o) => ["en_cours", "confirmee", "acceptee", "en_negociation"].includes(o.status));
  const pendingOrders = ORDERS.filter((o) => o.status === "en_attente");

  return (
    <div className="space-y-6 pb-6">
      {/* Welcome */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-5 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-orange-100 text-sm">Bonjour 👋</p>
            <h2 className="text-xl font-black font-display">{user?.name || "Aïssata"}</h2>
          </div>
          <Avatar src={user?.avatar} name={user?.name || "A"} size="lg" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Commandes", value: ORDERS.length.toString() },
            { label: "En cours", value: activeOrders.length.toString() },
            { label: "Terminées", value: ORDERS.filter((o) => o.status === "terminee").length.toString() },
          ].map((s) => (
            <div key={s.label} className="bg-white/20 rounded-xl p-2.5 text-center">
              <p className="text-xl font-black font-display">{s.value}</p>
              <p className="text-[11px] text-orange-100 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="font-bold text-zinc-900 mb-3 font-display">Actions rapides</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate("search")}
            className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-orange-100 transition-colors"
          >
            <span className="text-2xl">🔍</span>
            <span className="text-sm font-semibold text-zinc-800">Rechercher un service</span>
          </button>
          <button
            onClick={() => navigate("client-orders")}
            className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-zinc-100 transition-colors"
          >
            <span className="text-2xl">📦</span>
            <span className="text-sm font-semibold text-zinc-800">Mes commandes</span>
          </button>
          <button
            onClick={() => navigate("client-messages")}
            className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-blue-100 transition-colors"
          >
            <span className="text-2xl">💬</span>
            <span className="text-sm font-semibold text-zinc-800">Messages</span>
          </button>
          <button
            onClick={() => navigate("client-favorites")}
            className="bg-pink-50 border border-pink-100 rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-pink-100 transition-colors"
          >
            <span className="text-2xl">❤️</span>
            <span className="text-sm font-semibold text-zinc-800">Favoris</span>
          </button>
        </div>
      </div>

      {/* Active Orders */}
      {activeOrders.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-zinc-900 font-display">Commandes actives</h3>
            <button onClick={() => navigate("client-orders")} className="text-orange-500 text-sm font-medium">
              Voir tout
            </button>
          </div>
          <div className="space-y-3">
            {activeOrders.slice(0, 2).map((order) => (
              <OrderCard key={order.id} order={order} navigate={navigate} />
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-zinc-900 font-display">Prestataires recommandés</h3>
          <button onClick={() => navigate("search")} className="text-orange-500 text-sm font-medium">
            Voir tout
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {PROVIDERS.slice(0, 4).map((p) => (
            <ProviderCard key={p.id} provider={p} navigate={navigate} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Order Card ───────────────────────────────────────────────────────────────
function OrderCard({ order, navigate }: { order: Order; navigate: ScreenProps["navigate"] }) {
  return (
    <div
      onClick={() => navigate("client-orders", { orderId: order.id })}
      className="bg-white border border-zinc-100 rounded-2xl p-4 flex gap-3 hover:shadow-md transition-all cursor-pointer"
    >
      <img
        src={order.serviceImage}
        alt={order.serviceName}
        className="w-14 h-14 rounded-xl object-cover bg-zinc-100 shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-semibold text-zinc-900 text-sm line-clamp-1">{order.serviceName}</p>
            <p className="text-xs text-zinc-500 mt-0.5">{order.providerName}</p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs font-bold text-orange-500">{formatPrice(order.finalPrice)}</span>
          {order.scheduledDate && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-zinc-400" />
              <span className="text-xs text-zinc-400">{order.scheduledDate}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Orders Tab ───────────────────────────────────────────────────────────────
function OrdersTab({ navigate, params }: ScreenProps) {
  const [filter, setFilter] = useState("all");
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(
    params.orderId ? ORDERS.find((o) => o.id === params.orderId) || null : null
  );
  const [showNegotiation, setShowNegotiation] = useState(false);
  const [counterOffer, setCounterOffer] = useState("");

  const filters = [
    { value: "all", label: "Toutes" },
    { value: "active", label: "Actives" },
    { value: "terminee", label: "Terminées" },
    { value: "en_attente", label: "En attente" },
  ];

  const filteredOrders = ORDERS.filter((o) => {
    if (filter === "all") return true;
    if (filter === "active") return ["en_cours", "confirmee", "acceptee", "en_negociation"].includes(o.status);
    return o.status === filter;
  });

  if (selectedOrder) {
    return (
      <div className="space-y-4 animate-fade-in">
        <button
          onClick={() => setSelectedOrder(null)}
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-800 transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          <span className="text-sm">Retour aux commandes</span>
        </button>

        {/* Order Detail */}
        <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
          <div className="flex gap-3 p-4 border-b border-zinc-50">
            <img
              src={selectedOrder.serviceImage}
              alt={selectedOrder.serviceName}
              className="w-16 h-16 rounded-xl object-cover bg-zinc-100 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-zinc-900 font-display">{selectedOrder.serviceName}</p>
                <OrderStatusBadge status={selectedOrder.status} />
              </div>
              <p className="text-sm text-zinc-500 mt-0.5">Par {selectedOrder.providerName}</p>
              <p className="text-xs text-zinc-400 mt-0.5">Commande #{selectedOrder.id.toUpperCase()}</p>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Prix original</span>
              <span className="text-zinc-800">{formatPrice(selectedOrder.originalPrice)}</span>
            </div>
            {selectedOrder.negotiatedPrice && (
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Après négociation</span>
                <span className="text-green-600 font-medium">{formatPrice(selectedOrder.negotiatedPrice)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm border-t border-zinc-100 pt-3">
              <span className="font-semibold text-zinc-900">Total</span>
              <span className="font-bold text-orange-500">{formatPrice(selectedOrder.finalPrice)}</span>
            </div>
            {selectedOrder.scheduledDate && (
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Date prévue</span>
                <span className="text-zinc-800">{selectedOrder.scheduledDate}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Localisation</span>
              <span className="text-zinc-800">{selectedOrder.location}</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl border border-zinc-100 p-4">
          <h3 className="font-bold text-zinc-900 mb-4 font-display">Progression</h3>
          <div className="space-y-4">
            {selectedOrder.timeline.map((event, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    event.completed ? (event.active ? "bg-orange-500" : "bg-green-500") : "bg-zinc-100"
                  }`}>
                    {event.completed ? (
                      <CheckCircle className="w-4 h-4 text-white fill-white" strokeWidth={0} />
                    ) : (
                      <div className="w-2.5 h-2.5 bg-zinc-300 rounded-full" />
                    )}
                  </div>
                  {i < selectedOrder.timeline.length - 1 && (
                    <div className={`w-0.5 h-6 mt-1 ${event.completed ? "bg-green-200" : "bg-zinc-100"}`} />
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-semibold ${event.completed ? "text-zinc-900" : "text-zinc-400"}`}>
                      {event.status}
                    </p>
                    <span className="text-xs text-zinc-400">{event.date}</span>
                  </div>
                  {event.description && (
                    <p className="text-xs text-zinc-500 mt-0.5">{event.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Negotiation (if applicable) */}
        {selectedOrder.status === "en_negociation" && (
          <div className="bg-white rounded-2xl border border-zinc-100 p-4 space-y-4">
            <h3 className="font-bold text-zinc-900 font-display">Négociation en cours</h3>
            <div className="space-y-3">
              <div className="bg-zinc-50 rounded-xl p-3 flex items-center justify-between">
                <span className="text-sm text-zinc-600">Prix proposé par le prestataire</span>
                <span className="font-bold text-zinc-900">{formatPrice(selectedOrder.originalPrice)}</span>
              </div>
              <div className="bg-orange-50 rounded-xl p-3 flex items-center justify-between border border-orange-200">
                <span className="text-sm text-orange-700">Votre contre-proposition</span>
                <span className="font-bold text-orange-600">{formatPrice(selectedOrder.negotiatedPrice || 0)}</span>
              </div>
            </div>
            <p className="text-xs text-zinc-500">En attente de la réponse du prestataire...</p>
          </div>
        )}

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate("client-messages", { conversationId: "conv1" })}
            className="flex items-center justify-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors"
          >
            💬 Message
          </button>
          {selectedOrder.status === "en_attente" && (
            <button
              onClick={() => {}}
              className="flex items-center justify-center gap-2 bg-red-50 border border-red-200 rounded-xl py-3 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors"
            >
              ✕ Annuler
            </button>
          )}
          {selectedOrder.status === "terminee" && (
            <button
              onClick={() => setInvoiceOrder(selectedOrder)}
              className="flex items-center justify-center gap-2 bg-orange-50 border border-orange-200 rounded-xl py-3 text-sm font-semibold text-orange-600 hover:bg-orange-100 transition-colors"
            >
              <FileText className="w-4 h-4" />
              Générer la facture
            </button>
          )}
          {selectedOrder.status === "terminee" && (
            <button className="flex items-center justify-center gap-2 bg-yellow-50 border border-yellow-200 rounded-xl py-3 text-sm font-semibold text-yellow-700 col-span-2 hover:bg-yellow-100 transition-colors">
              ⭐ Laisser un avis
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              filter === f.value
                ? "bg-orange-500 text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filteredOrders.length > 0 ? (
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="bg-white border border-zinc-100 rounded-2xl p-4 cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex gap-3">
                <img
                  src={order.serviceImage}
                  alt={order.serviceName}
                  className="w-16 h-16 rounded-xl object-cover bg-zinc-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-zinc-900 text-sm">{order.serviceName}</p>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <img
                      src={order.providerAvatar}
                      alt={order.providerName}
                      className="w-4 h-4 rounded-full"
                    />
                    <span className="text-xs text-zinc-500">{order.providerName}</span>
                    {order.providerVerified && <VerifiedBadge />}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-bold text-orange-500">{formatPrice(order.finalPrice)}</span>
                    <span className="text-xs text-zinc-400">{order.createdAt}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="📦"
          title="Aucune commande"
          description="Vous n'avez encore aucune commande. Découvrez des prestataires !"
          action={{ label: "Explorer les services", onClick: () => navigate("search") }}
        />
      )}

      {/* Invoice Modal */}
      {invoiceOrder && (
        <InvoiceModal
          order={invoiceOrder}
          open={!!invoiceOrder}
          onClose={() => setInvoiceOrder(null)}
        />
      )}
    </div>
  );
}

// ─── Favorites Tab ─────────────────────────────────────────────────────────────
function FavoritesTab({ navigate }: ScreenProps) {
  const [favorites, setFavorites] = useState(PROVIDERS.slice(0, 3));

  return (
    <div className="space-y-4">
      {favorites.length > 0 ? (
        <>
          <p className="text-sm text-zinc-500">{favorites.length} prestataire(s) sauvegardé(s)</p>
          <div className="grid grid-cols-2 gap-3">
            {favorites.map((p) => (
              <div key={p.id} className="relative">
                <ProviderCard provider={p} navigate={navigate} />
                <button
                  onClick={() => setFavorites(favorites.filter((f) => f.id !== p.id))}
                  className="absolute top-2 left-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
                >
                  <Heart className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          icon="❤️"
          title="Vous n'avez encore aucun favori."
          description="Sauvegardez des prestataires pour les retrouver facilement."
          action={{ label: "Découvrir des prestataires", onClick: () => navigate("search") }}
        />
      )}
    </div>
  );
}

// ─── Profile Tab ──────────────────────────────────────────────────────────────
function ProfileTab({ navigate, user, logout }: ScreenProps) {
  return (
    <div className="space-y-4">
      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-zinc-100 p-5">
        <div className="flex items-center gap-4">
          <Avatar src={user?.avatar} name={user?.name || "A"} size="xl" />
          <div className="flex-1">
            <h2 className="font-bold text-zinc-900 font-display text-lg">{user?.name || "Aïssata Keïta"}</h2>
            <p className="text-sm text-zinc-500">Client DJOULIA</p>
            <p className="text-xs text-zinc-400 mt-0.5">{user?.phone || "+223 76 34 56 78"}</p>
          </div>
          <button className="w-9 h-9 bg-zinc-50 rounded-xl flex items-center justify-center border border-zinc-200">
            <Edit3 className="w-4 h-4 text-zinc-500" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { value: ORDERS.length.toString(), label: "Commandes" },
          { value: ORDERS.filter((o) => o.status === "terminee").length.toString(), label: "Terminées" },
          { value: "3", label: "Favoris" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-zinc-100 p-3 text-center">
            <p className="text-xl font-black text-zinc-900 font-display">{s.value}</p>
            <p className="text-xs text-zinc-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
        {[
          { icon: "📦", label: "Mes commandes", screen: "client-orders" },
          { icon: "❤️", label: "Mes favoris", screen: "client-favorites" },
          { icon: "💬", label: "Messages", screen: "client-messages" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.screen as any)}
            className="w-full flex items-center gap-3 px-4 py-4 hover:bg-zinc-50 transition-colors border-b border-zinc-50 last:border-0"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="flex-1 text-sm font-medium text-zinc-800 text-left">{item.label}</span>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
        {[
          { icon: "🔒", label: "Sécurité du compte" },
          { icon: "🔔", label: "Notifications" },
          { icon: "📜", label: "Conditions générales" },
          { icon: "🔏", label: "Politique de confidentialité" },
        ].map((item) => (
          <button
            key={item.label}
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

// ─── Main Client Dashboard ────────────────────────────────────────────────────
export default function ClientDashboard({
  navigate,
  user,
  params,
  login,
  logout,
  activeTab,
}: ClientDashboardProps) {
  const navMap = {
    home: "home",
    orders: "orders",
    favorites: "explorer",
    profile: "profil",
  };

  const titles = {
    home: "Mon espace",
    orders: "Mes commandes",
    favorites: "Mes favoris",
    profile: "Mon profil",
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-zinc-100 px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1">
          <div className="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center">
            <span className="text-white font-black text-xs">D</span>
          </div>
          <h1 className="font-bold text-zinc-900 font-display">{titles[activeTab]}</h1>
        </div>
        <button
          onClick={() => navigate("search")}
          className="w-9 h-9 bg-zinc-50 rounded-xl flex items-center justify-center border border-zinc-200"
        >
          <Search className="w-4 h-4 text-zinc-600" />
        </button>
        <div className="relative">
          <button className="w-9 h-9 bg-zinc-50 rounded-xl flex items-center justify-center border border-zinc-200">
            <Bell className="w-4 h-4 text-zinc-600" />
          </button>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-5 pb-24 min-h-screen">
        {activeTab === "home" && <DashboardHome navigate={navigate} user={user} params={params} login={login} logout={logout} />}
        {activeTab === "orders" && <OrdersTab navigate={navigate} user={user} params={params} login={login} logout={logout} />}
        {activeTab === "favorites" && <FavoritesTab navigate={navigate} user={user} params={params} login={login} logout={logout} />}
        {activeTab === "profile" && <ProfileTab navigate={navigate} user={user} params={params} login={login} logout={logout} />}
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-sm border-t border-zinc-100 flex md:hidden">
        {[
          { id: "home", label: "Accueil", screen: "client-dashboard" as const, icon: "🏠" },
          { id: "explorer", label: "Explorer", screen: "search" as const, icon: "🔍" },
          { id: "orders", label: "Commandes", screen: "client-orders" as const, icon: "📦" },
          { id: "messages", label: "Messages", screen: "client-messages" as const, icon: "💬" },
          { id: "profil", label: "Profil", screen: "client-dashboard" as const, icon: "👤" },
        ].map((item) => {
          const isActive = (activeTab === "home" && item.id === "home") ||
                          (activeTab === "orders" && item.id === "orders") ||
                          (activeTab === "favorites" && item.id === "favorites");
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
