import { useState } from "react";
import { Search, Bell, Menu, X, MapPin, TrendingUp, Sparkles, Heart, User, ChevronRight } from "lucide-react";
import {
  Avatar,
  ProviderCard,
  ServiceCard,
  PostCard,
  SectionHeader,
  EmptyState,
  Badge,
  VerifiedBadge,
} from "../components/ui";
import { PROVIDERS, SERVICES, POSTS, CATEGORIES, NOTIFICATIONS, formatPrice } from "../data/mock";
import type { ScreenProps, Post } from "../types";

// ─── Mobile Header ────────────────────────────────────────────────────────────
function MobileHeader({ user, navigate, onNotif }: ScreenProps & { onNotif: () => void }) {
  return (
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-zinc-100 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center">
              <span className="text-white font-black text-xs">D</span>
            </div>
            <span className="font-black text-base text-zinc-900 font-display tracking-tight">DJOULIA</span>
          </div>
          {user && (
            <p className="text-xs text-zinc-500 mt-0.5">
              Bonjour, {user.name.split(" ")[0]} 👋
            </p>
          )}
        </div>
        <button
          onClick={onNotif}
          className="relative w-9 h-9 bg-zinc-50 rounded-xl flex items-center justify-center hover:bg-zinc-100 transition-colors"
        >
          <Bell className="w-4.5 h-4.5 text-zinc-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
        </button>
        {user ? (
          <button
            onClick={() => navigate(user.role === "client" ? "client-dashboard" : "provider-dashboard")}
          >
            <Avatar src={user.avatar} name={user.name} size="sm" />
          </button>
        ) : (
          <button
            onClick={() => navigate("login")}
            className="bg-orange-500 text-white rounded-xl px-3 py-1.5 text-xs font-bold"
          >
            Connexion
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Desktop Header ───────────────────────────────────────────────────────────
function DesktopHeader({ user, navigate, onNotif }: ScreenProps & { onNotif: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-6">
        <button
          onClick={() => navigate("home")}
          className="flex items-center gap-2 shrink-0"
        >
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">D</span>
          </div>
          <span className="font-black text-lg text-zinc-900 font-display tracking-tight">DJOULIA</span>
        </button>

        <nav className="hidden md:flex items-center gap-5 flex-1">
          <button onClick={() => navigate("home")} className="text-sm font-medium text-zinc-800 hover:text-orange-500 transition-colors">Accueil</button>
          <button onClick={() => navigate("search")} className="text-sm font-medium text-zinc-500 hover:text-orange-500 transition-colors">Explorer</button>
          <button onClick={() => navigate("search")} className="text-sm font-medium text-zinc-500 hover:text-orange-500 transition-colors">Catégories</button>
        </nav>

        <div className="hidden md:flex items-center flex-1 max-w-xs bg-zinc-50 rounded-xl px-3 py-2 gap-2 border border-zinc-200">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            placeholder="Rechercher un service..."
            className="flex-1 bg-transparent text-sm placeholder:text-zinc-400 outline-none"
            onFocus={() => navigate("search")}
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={onNotif}
            className="relative hidden md:flex w-9 h-9 bg-zinc-50 rounded-xl items-center justify-center hover:bg-zinc-100 border border-zinc-200"
          >
            <Bell className="w-4 h-4 text-zinc-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
          </button>
          {user ? (
            <button
              onClick={() => navigate(user.role === "client" ? "client-dashboard" : "provider-dashboard")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Avatar src={user.avatar} name={user.name} size="sm" />
              <span className="hidden md:block text-sm font-medium text-zinc-700">{user.name.split(" ")[0]}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("login")}
                className="hidden md:block text-sm font-semibold text-zinc-700 hover:text-orange-500 transition-colors px-3 py-2"
              >
                Se connecter
              </button>
              <button
                onClick={() => navigate("register-choice")}
                className="bg-orange-500 text-white rounded-xl px-4 py-2 text-sm font-bold hover:bg-orange-600 transition-colors"
              >
                S'inscrire
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// ─── Notification Panel ───────────────────────────────────────────────────────
function NotificationPanel({ onClose }: { onClose: () => void }) {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const unread = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const iconMap: Record<string, string> = {
    message: "💬",
    request: "📋",
    accepted: "✅",
    rejected: "❌",
    order: "📦",
    verification: "🔰",
    system: "ℹ️",
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col animate-fade-in">
        <div className="flex items-center justify-between p-5 border-b border-zinc-100">
          <div>
            <h3 className="font-bold text-zinc-900 font-display">Notifications</h3>
            {unread > 0 && (
              <p className="text-xs text-zinc-500 mt-0.5">{unread} non lues</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {unread > 0 && (
              <button onClick={markAllRead} className="text-xs text-orange-500 font-medium">
                Tout marquer lu
              </button>
            )}
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
              <X className="w-4 h-4 text-zinc-500" />
            </button>
          </div>
        </div>
        <div className="overflow-y-auto flex-1">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`flex gap-3 p-4 border-b border-zinc-50 hover:bg-zinc-50 transition-colors cursor-pointer ${!notif.read ? "bg-orange-50/50" : ""}`}
              onClick={() => setNotifications(notifications.map((n) => n.id === notif.id ? { ...n, read: true } : n))}
            >
              {notif.avatar ? (
                <img src={notif.avatar} alt={notif.title} className="w-10 h-10 rounded-xl object-cover shrink-0" />
              ) : (
                <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center text-lg shrink-0">
                  {iconMap[notif.type]}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-zinc-900">{notif.title}</p>
                  {!notif.read && <span className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 shrink-0" />}
                </div>
                <p className="text-xs text-zinc-500 mt-0.5 line-clamp-2">{notif.body}</p>
                <p className="text-[11px] text-zinc-400 mt-1">{notif.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Bottom Navigation (Client) ───────────────────────────────────────────────
export function ClientBottomNav({
  active,
  navigate,
  user,
}: {
  active: string;
  navigate: ScreenProps["navigate"];
  user: ScreenProps["user"];
}) {
  const items = [
    { id: "home", label: "Accueil", screen: "home", icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )},
    { id: "explorer", label: "Explorer", screen: "search", icon: <Search className="w-5 h-5" /> },
    { id: "orders", label: "Commandes", screen: "client-orders", icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    )},
    { id: "messages", label: "Messages", screen: "client-messages", icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )},
    { id: "profil", label: "Profil", screen: "client-dashboard", icon: <User className="w-5 h-5" /> },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-sm border-t border-zinc-100 flex md:hidden">
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.screen as any)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors ${
              isActive ? "text-orange-500" : "text-zinc-400 hover:text-zinc-600"
            }`}
          >
            {item.icon}
            <span className="text-[10px] font-medium">{item.label}</span>
            {isActive && <span className="absolute top-0 w-6 h-0.5 bg-orange-500 rounded-full" />}
          </button>
        );
      })}
    </nav>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────
export default function Home(props: ScreenProps) {
  const { navigate, user } = props;
  const [posts, setPosts] = useState(POSTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleLike = (id: string) => {
    setPosts(posts.map((p) =>
      p.id === id
        ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
        : p
    ));
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate("search", { query: searchQuery });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Headers */}
      <div className="md:hidden">
        <MobileHeader {...props} onNotif={() => setShowNotif(true)} />
      </div>
      <div className="hidden md:block">
        <DesktopHeader {...props} onNotif={() => setShowNotif(true)} />
      </div>

      {/* Notification Panel */}
      {showNotif && <NotificationPanel onClose={() => setShowNotif(false)} />}

      {/* Hero Section */}
      <section className="relative bg-zinc-950 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=1200&h=500&fit=crop&auto=format"
          alt="Bamako"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/40 to-zinc-950/70" />
        <div className="relative max-w-3xl mx-auto px-5 py-14 md:py-20">
          <Badge variant="orange" className="mb-4">
            <Sparkles className="w-3 h-3" />
            Le marketplace des professionnels maliens
          </Badge>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight font-display mb-4">
            Trouvez le bon professionnel
            <span className="text-orange-400"> pour chaque besoin.</span>
          </h1>
          <p className="text-zinc-300 text-base md:text-lg mb-8 max-w-xl">
            Découvrez des prestataires vérifiés, comparez leurs services et échangez directement avec eux.
          </p>
          {/* Search bar */}
          <div className="bg-white rounded-2xl p-2 flex gap-2 shadow-xl max-w-2xl">
            <div className="flex-1 flex items-center gap-2 px-3">
              <Search className="w-4 h-4 text-zinc-400 shrink-0" />
              <input
                placeholder="Que recherchez-vous ?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 text-sm placeholder:text-zinc-400 outline-none py-2 bg-transparent"
              />
            </div>
            <div className="hidden sm:flex items-center gap-2 border-l border-zinc-100 px-3">
              <MapPin className="w-4 h-4 text-zinc-400" />
              <span className="text-sm text-zinc-500">Bamako, Mali</span>
            </div>
            <button
              onClick={handleSearch}
              className="bg-orange-500 text-white rounded-xl px-5 py-2.5 text-sm font-bold hover:bg-orange-600 transition-colors whitespace-nowrap"
            >
              Rechercher
            </button>
          </div>
          {/* Stats */}
          <div className="flex gap-6 mt-8">
            {[
              { value: "1 200+", label: "Prestataires" },
              { value: "15 000+", label: "Services réalisés" },
              { value: "4.8★", label: "Note moyenne" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-xl font-black text-white font-display">{s.value}</p>
                <p className="text-xs text-zinc-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 pb-24 md:pb-8">
        {/* Categories */}
        <section className="py-8">
          <SectionHeader
            title="Catégories"
            action={{ label: "Voir tout", onClick: () => navigate("search") }}
          />
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(selectedCategory === cat.id ? null : cat.id);
                  navigate("search", { category: cat.name });
                }}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${
                  selectedCategory === cat.id
                    ? "border-orange-400 bg-orange-50"
                    : "border-zinc-100 hover:border-orange-200 hover:bg-orange-50/50"
                }`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-[10px] font-medium text-zinc-700 text-center leading-tight line-clamp-2">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Recommended Providers */}
        <section className="py-6 border-t border-zinc-50">
          <SectionHeader
            title="Prestataires recommandés"
            action={{ label: "Voir tout", onClick: () => navigate("search") }}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-3">
            {PROVIDERS.slice(0, 8).map((p) => (
              <ProviderCard key={p.id} provider={p} navigate={navigate} />
            ))}
          </div>
        </section>

        {/* Popular Services */}
        <section className="py-6 border-t border-zinc-50">
          <SectionHeader
            title="Services populaires"
            action={{ label: "Voir tout", onClick: () => navigate("search") }}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {SERVICES.map((s) => (
              <ServiceCard key={s.id} service={s} navigate={navigate} />
            ))}
          </div>
        </section>

        {/* Near you */}
        <section className="py-6 border-t border-zinc-50">
          <SectionHeader
            title="Prestations près de vous"
            action={{ label: "Voir sur la carte", onClick: () => navigate("search") }}
          />
          <div className="bg-zinc-50 rounded-2xl p-4 mb-4 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-zinc-900">Bamako, Mali</p>
              <p className="text-xs text-zinc-500">Résultats dans un rayon de 10 km</p>
            </div>
            <button className="ml-auto text-xs text-orange-500 font-semibold">Changer</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PROVIDERS.filter((p) => p.city === "Bamako")
              .slice(0, 6)
              .map((p) => (
                <ProviderCard key={p.id} provider={p} navigate={navigate} compact />
              ))}
          </div>
        </section>

        {/* Feed */}
        <section className="py-6 border-t border-zinc-50">
          <SectionHeader
            title="Publications récentes"
            action={{ label: "Voir plus", onClick: () => {} }}
          />
          <div className="space-y-4 max-w-2xl">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                navigate={navigate}
                onLike={handleLike}
              />
            ))}
          </div>
        </section>

        {/* Guest CTA */}
        {!user && (
          <section className="py-6">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-white text-center">
              <p className="text-2xl font-black font-display mb-2">Rejoignez DJOULIA</p>
              <p className="text-orange-100 text-sm mb-6">
                Créez un compte gratuit et accédez à tous les services de la plateforme.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => navigate("register-choice")}
                  className="bg-white text-orange-600 rounded-xl px-5 py-2.5 text-sm font-bold hover:bg-orange-50 transition-colors"
                >
                  Créer un compte
                </button>
                <button
                  onClick={() => navigate("login")}
                  className="border border-white/40 text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  Se connecter
                </button>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Bottom Nav (mobile, only for authenticated users or home) */}
      {user?.role === "client" && (
        <ClientBottomNav active="home" navigate={navigate} user={user} />
      )}

      {/* Footer (desktop) */}
      <footer className="hidden md:block bg-zinc-950 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-sm">D</span>
                </div>
                <span className="font-black text-lg font-display">DJOULIA</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Le marketplace des services professionnels au Mali.
              </p>
            </div>
            {[
              { title: "Plateforme", links: ["Accueil", "Explorer", "Catégories", "Comment ça marche"] },
              { title: "Prestataires", links: ["Devenir prestataire", "Vérification", "Tarification"] },
              { title: "Légal", links: ["Mentions légales", "Politique de confidentialité", "CGU", "Contact"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold text-sm mb-3 font-display">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <button className="text-zinc-400 text-sm hover:text-white transition-colors">{link}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-zinc-800 pt-6 flex items-center justify-between">
            <p className="text-zinc-500 text-xs">© 2026 DJOULIA. Tous droits réservés.</p>
            <p className="text-zinc-500 text-xs">Fait avec ❤️ à Bamako, Mali</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
