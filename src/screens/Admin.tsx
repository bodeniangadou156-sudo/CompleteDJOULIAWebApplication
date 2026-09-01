import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Tag,
  FileText,
  Flag,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Search,
  Check,
  X,
  AlertCircle,
  TrendingUp,
  Shield,
  CheckCircle,
  Clock,
  ChevronLeft,
  MoreVertical,
  Eye,
  Ban,
  MessageSquare,
} from "lucide-react";
import {
  Avatar,
  Badge,
  Button,
  Input,
  OrderStatusBadge,
  VerifiedBadge,
  StarRating,
  EmptyState,
} from "../components/ui";
import { PROVIDERS, ORDERS, formatPrice } from "../data/mock";
import type { ScreenProps } from "../types";

type AdminSection =
  | "dashboard"
  | "providers"
  | "clients"
  | "services"
  | "orders"
  | "publications"
  | "reports"
  | "settings";

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "dashboard" as AdminSection, label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: "providers" as AdminSection, label: "Prestataires", icon: <Shield className="w-4 h-4" />, badge: "5" },
  { id: "clients" as AdminSection, label: "Clients", icon: <Users className="w-4 h-4" /> },
  { id: "services" as AdminSection, label: "Services & Catégories", icon: <Tag className="w-4 h-4" /> },
  { id: "orders" as AdminSection, label: "Demandes & Commandes", icon: <ShoppingBag className="w-4 h-4" /> },
  { id: "publications" as AdminSection, label: "Publications", icon: <FileText className="w-4 h-4" /> },
  { id: "reports" as AdminSection, label: "Signalements", icon: <Flag className="w-4 h-4" />, badge: "3" },
  { id: "settings" as AdminSection, label: "Paramètres", icon: <Settings className="w-4 h-4" /> },
];

function Sidebar({
  active,
  onChange,
  navigate,
  logout,
}: {
  active: AdminSection;
  onChange: (s: AdminSection) => void;
  navigate: ScreenProps["navigate"];
  logout: ScreenProps["logout"];
}) {
  return (
    <aside className="w-64 shrink-0 bg-zinc-950 text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">D</span>
          </div>
          <div>
            <p className="font-black text-white font-display tracking-tight">DJOULIA</p>
            <p className="text-[10px] text-zinc-500">Administration</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
              active === item.id
                ? "bg-orange-500 text-white font-semibold"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            {item.icon}
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                active === item.id ? "bg-white/20 text-white" : "bg-orange-500 text-white"
              }`}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-zinc-800">
        <button
          onClick={() => navigate("home")}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all mb-1"
        >
          <ChevronLeft className="w-4 h-4" />
          Voir le site
        </button>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-zinc-800 rounded-xl transition-all"
        >
          <LogOut className="w-4 h-4" />
          Se déconnecter
        </button>
      </div>
    </aside>
  );
}

// ─── Dashboard Section ────────────────────────────────────────────────────────
function DashboardSection() {
  const stats = [
    { label: "Total utilisateurs", value: "1 847", change: "+12%", icon: "👥", color: "bg-blue-50 border-blue-100", accent: "text-blue-600" },
    { label: "Clients", value: "1 234", change: "+8%", icon: "👤", color: "bg-green-50 border-green-100", accent: "text-green-600" },
    { label: "Prestataires", value: "613", change: "+18%", icon: "💼", color: "bg-orange-50 border-orange-100", accent: "text-orange-600" },
    { label: "Prestataires vérifiés", value: "489", change: "+5%", icon: "✅", color: "bg-emerald-50 border-emerald-100", accent: "text-emerald-600" },
    { label: "Vérifications en attente", value: "5", change: "—", icon: "⏳", color: "bg-yellow-50 border-yellow-100", accent: "text-yellow-600" },
    { label: "Commandes ce mois", value: "342", change: "+24%", icon: "📦", color: "bg-purple-50 border-purple-100", accent: "text-purple-600" },
    { label: "Commandes terminées", value: "289", change: "+19%", icon: "🎉", color: "bg-pink-50 border-pink-100", accent: "text-pink-600" },
    { label: "Signalements", value: "3", change: "Nouveau", icon: "🚩", color: "bg-red-50 border-red-100", accent: "text-red-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-zinc-900 font-display mb-1">Dashboard</h2>
        <p className="text-zinc-500 text-sm">Vue d'ensemble de la plateforme DJOULIA</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className={`${s.color} border rounded-2xl p-4`}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{s.icon}</span>
              <span className={`text-xs font-semibold ${s.change.startsWith("+") ? "text-green-600 bg-green-100" : s.change === "Nouveau" ? "text-red-600 bg-red-100" : "text-zinc-500 bg-zinc-100"} px-2 py-0.5 rounded-full`}>
                {s.change}
              </span>
            </div>
            <p className={`text-2xl font-black font-display ${s.accent}`}>{s.value}</p>
            <p className="text-xs text-zinc-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
          <h3 className="font-bold text-zinc-900 font-display">Commandes récentes</h3>
          <button className="text-orange-500 text-sm font-medium">Voir tout</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-zinc-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wide">ID</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wide">Service</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wide">Client</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wide">Prestataire</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wide">Montant</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wide">Statut</th>
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((order) => (
                <tr key={order.id} className="border-t border-zinc-50 hover:bg-zinc-50 transition-colors">
                  <td className="px-5 py-4 text-xs font-mono text-zinc-500">#{order.id.toUpperCase()}</td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-zinc-900">{order.serviceName}</p>
                    <p className="text-xs text-zinc-400">{order.category}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <img src={order.clientAvatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                      <span className="text-sm text-zinc-700">{order.clientName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <img src={order.providerAvatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                      <span className="text-sm text-zinc-700">{order.providerName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-zinc-900">{formatPrice(order.finalPrice)}</span>
                  </td>
                  <td className="px-5 py-4">
                    <OrderStatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Providers Section ────────────────────────────────────────────────────────
function ProvidersSection() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<typeof PROVIDERS[0] | null>(null);

  const statusOptions = [
    { value: "all", label: "Tous" },
    { value: "verified", label: "Vérifiés" },
    { value: "pending", label: "En attente" },
    { value: "rejected", label: "Rejetés" },
  ];

  const filtered = PROVIDERS.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) &&
        !p.profession.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === "verified") return p.verified;
    if (filter === "pending") return !p.verified;
    return true;
  });

  if (selectedProvider) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedProvider(null)}
            className="w-9 h-9 bg-zinc-100 rounded-xl flex items-center justify-center hover:bg-zinc-200"
          >
            <ChevronLeft className="w-4 h-4 text-zinc-600" />
          </button>
          <h2 className="text-xl font-black text-zinc-900 font-display">Dossier de vérification</h2>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 space-y-4">
            {/* Provider Info */}
            <div className="bg-white rounded-2xl border border-zinc-100 p-5">
              <div className="flex items-center gap-4 mb-4">
                <img src={selectedProvider.avatar} alt={selectedProvider.name} className="w-16 h-16 rounded-2xl object-cover" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-zinc-900 font-display">{selectedProvider.name}</h3>
                    {selectedProvider.verified ? (
                      <Badge variant="success">Vérifié</Badge>
                    ) : (
                      <Badge variant="warning">En attente</Badge>
                    )}
                  </div>
                  <p className="text-zinc-500 text-sm">{selectedProvider.profession}</p>
                  <p className="text-xs text-zinc-400">{selectedProvider.location}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-zinc-400 text-xs mb-1">Téléphone</p>
                  <p className="font-medium">{selectedProvider.phone}</p>
                </div>
                <div>
                  <p className="text-zinc-400 text-xs mb-1">Inscrit le</p>
                  <p className="font-medium">{selectedProvider.joinedDate}</p>
                </div>
                <div>
                  <p className="text-zinc-400 text-xs mb-1">Catégorie</p>
                  <p className="font-medium">{selectedProvider.category}</p>
                </div>
                <div>
                  <p className="text-zinc-400 text-xs mb-1">Expérience</p>
                  <p className="font-medium">{selectedProvider.experience} ans</p>
                </div>
              </div>
            </div>

            {/* Identity Documents */}
            <div className="bg-white rounded-2xl border border-zinc-100 p-5">
              <h4 className="font-bold text-zinc-900 mb-3 font-display">Documents d'identité</h4>
              <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200 text-center">
                <p className="text-sm text-zinc-500">📄 Carte Nationale d'Identité</p>
                <p className="text-xs text-zinc-400 mt-1">Soumis le 15/08/2026</p>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-white rounded-2xl border border-zinc-100 p-5">
              <h4 className="font-bold text-zinc-900 mb-2 font-display">Biographie</h4>
              <p className="text-sm text-zinc-600 leading-relaxed">{selectedProvider.bio}</p>
            </div>
          </div>

          {/* Actions sidebar */}
          <div className="space-y-3">
            <div className="bg-white rounded-2xl border border-zinc-100 p-4 space-y-2">
              <h4 className="font-bold text-zinc-900 font-display text-sm">Actions</h4>
              <button className="w-full py-2.5 bg-green-500 text-white rounded-xl text-sm font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                Approuver
              </button>
              <button className="w-full py-2.5 bg-yellow-500 text-white rounded-xl text-sm font-bold hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Infos à compléter
              </button>
              <button className="w-full py-2.5 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                <X className="w-4 h-4" />
                Rejeter
              </button>
              <button className="w-full py-2.5 bg-zinc-100 text-zinc-700 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                <Ban className="w-4 h-4" />
                Suspendre
              </button>
            </div>

            {/* Status History */}
            <div className="bg-white rounded-2xl border border-zinc-100 p-4">
              <h4 className="font-bold text-zinc-900 font-display text-sm mb-3">Historique</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                  <span className="text-zinc-500">En attente — 28 août</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  <span className="text-zinc-500">Dossier soumis — 28 août</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-zinc-900 font-display">Prestataires</h2>
        <Badge variant="warning">5 en attente</Badge>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="flex-1 min-w-48 flex items-center gap-2 bg-white border border-zinc-200 rounded-xl px-3 py-2.5">
          <Search className="w-4 h-4 text-zinc-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un prestataire..."
            className="flex-1 text-sm outline-none placeholder:text-zinc-400"
          />
        </div>
        <div className="flex gap-1 bg-zinc-100 rounded-xl p-1">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === opt.value ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Prestataire</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Profession</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Localisation</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Note</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Statut</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-zinc-50 hover:bg-zinc-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img src={p.avatar} alt={p.name} className="w-9 h-9 rounded-xl object-cover bg-zinc-100" />
                    <div>
                      <p className="font-semibold text-zinc-900 text-sm">{p.name}</p>
                      <p className="text-xs text-zinc-400">{p.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm text-zinc-700">{p.profession}</p>
                  <p className="text-xs text-zinc-400">{p.category}</p>
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm text-zinc-600">{p.neighborhood}</p>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm font-medium text-zinc-900">{p.rating}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  {p.verified ? (
                    <Badge variant="success">Vérifié</Badge>
                  ) : (
                    <Badge variant="warning">En attente</Badge>
                  )}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSelectedProvider(p)}
                      className="px-3 py-1.5 bg-zinc-100 rounded-lg text-xs font-medium hover:bg-zinc-200 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    {!p.verified && (
                      <>
                        <button className="px-2 py-1.5 bg-green-100 rounded-lg text-green-700 hover:bg-green-200 transition-colors">
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button className="px-2 py-1.5 bg-red-100 rounded-lg text-red-600 hover:bg-red-200 transition-colors">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Reports Section ──────────────────────────────────────────────────────────
function ReportsSection() {
  const reports = [
    { id: "rep1", type: "Prestataire", subject: "Aminata Kouyaté", reason: "Faux profil", reporter: "Mamadou Bah", status: "Nouveau", date: "1 sept" },
    { id: "rep2", type: "Publication", subject: "Photo inappropriée", reason: "Contenu offensant", reporter: "Fatoumata Diallo", status: "En cours", date: "31 août" },
    { id: "rep3", type: "Service", subject: "Installation électrique", reason: "Prix trompeur", reporter: "Ibrahim Sanogo", status: "Résolu", date: "29 août" },
  ];

  const statusColors = {
    Nouveau: "bg-red-100 text-red-700",
    "En cours": "bg-yellow-100 text-yellow-700",
    Résolu: "bg-green-100 text-green-700",
    Rejeté: "bg-zinc-100 text-zinc-500",
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-zinc-900 font-display">Signalements</h2>
        <Badge variant="error">3 nouveaux</Badge>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-zinc-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Type</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Signalé</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Raison</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Signalé par</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Date</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Statut</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id} className="border-t border-zinc-50 hover:bg-zinc-50 transition-colors">
                <td className="px-5 py-4">
                  <Badge>{r.type}</Badge>
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-zinc-900">{r.subject}</p>
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm text-zinc-600">{r.reason}</p>
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm text-zinc-600">{r.reporter}</p>
                </td>
                <td className="px-5 py-4">
                  <p className="text-xs text-zinc-400">{r.date}</p>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[r.status as keyof typeof statusColors] || ""}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-1">
                    <button className="px-2 py-1.5 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors">
                      <Eye className="w-3.5 h-3.5 text-zinc-600" />
                    </button>
                    {r.status === "Nouveau" && (
                      <>
                        <button className="px-2 py-1.5 bg-green-100 rounded-lg hover:bg-green-200 transition-colors">
                          <Check className="w-3.5 h-3.5 text-green-600" />
                        </button>
                        <button className="px-2 py-1.5 bg-red-100 rounded-lg hover:bg-red-200 transition-colors">
                          <X className="w-3.5 h-3.5 text-red-600" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Simple sections ──────────────────────────────────────────────────────────
function SimpleSection({ title, icon }: { title: string; icon: string }) {
  return (
    <div>
      <h2 className="text-2xl font-black text-zinc-900 font-display mb-2">{title}</h2>
      <div className="bg-white rounded-2xl border border-zinc-100 p-16 flex flex-col items-center text-center">
        <span className="text-5xl mb-4">{icon}</span>
        <p className="text-zinc-400 text-sm">Cette section est disponible dans la version complète</p>
      </div>
    </div>
  );
}

// ─── Main Admin ───────────────────────────────────────────────────────────────
export default function Admin({ navigate, user, logout }: ScreenProps) {
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard": return <DashboardSection />;
      case "providers": return <ProvidersSection />;
      case "reports": return <ReportsSection />;
      case "clients": return <SimpleSection title="Gestion des clients" icon="👥" />;
      case "services": return <SimpleSection title="Services & Catégories" icon="🏷️" />;
      case "orders": return <SimpleSection title="Commandes & Demandes" icon="📦" />;
      case "publications": return <SimpleSection title="Modération des publications" icon="📝" />;
      case "settings": return <SimpleSection title="Paramètres de la plateforme" icon="⚙️" />;
    }
  };

  return (
    <div className="min-h-screen flex bg-zinc-50">
      {/* Sidebar - Desktop */}
      <div className="hidden md:block">
        <Sidebar active={activeSection} onChange={setActiveSection} navigate={navigate} logout={logout} />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebar && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileSidebar(false)} />
          <div className="relative z-10">
            <Sidebar active={activeSection} onChange={(s) => { setActiveSection(s); setMobileSidebar(false); }} navigate={navigate} logout={logout} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-zinc-100 px-5 py-3 flex items-center gap-3 sticky top-0 z-10">
          <button
            onClick={() => setMobileSidebar(true)}
            className="md:hidden w-9 h-9 bg-zinc-50 rounded-xl flex items-center justify-center border border-zinc-200"
          >
            <svg className="w-4 h-4 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className="flex-1">
            <p className="text-sm font-semibold text-zinc-700">
              {NAV_ITEMS.find((n) => n.id === activeSection)?.label}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 bg-zinc-50 rounded-xl flex items-center justify-center border border-zinc-200">
              <Bell className="w-4 h-4 text-zinc-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-zinc-200">
              <div className="w-8 h-8 bg-zinc-900 rounded-xl flex items-center justify-center">
                <span className="text-white text-xs font-bold">DA</span>
              </div>
              <div className="hidden md:block">
                <p className="text-xs font-semibold text-zinc-900">Administrateur</p>
                <p className="text-[11px] text-zinc-400">DJOULIA Platform</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-5 md:p-8 overflow-y-auto animate-fade-in">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
