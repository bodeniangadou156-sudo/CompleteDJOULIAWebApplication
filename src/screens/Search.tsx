import { useState } from "react";
import { Search as SearchIcon, SlidersHorizontal, X, ChevronLeft, MapPin, Star } from "lucide-react";
import {
  ProviderCard,
  ServiceCard,
  Button,
  Badge,
  BottomSheet,
  EmptyState,
} from "../components/ui";
import { PROVIDERS, SERVICES, CATEGORIES } from "../data/mock";
import type { ScreenProps } from "../types";

const SORT_OPTIONS = [
  { value: "pertinence", label: "Pertinence" },
  { value: "proche", label: "Plus proche" },
  { value: "mieux_note", label: "Mieux noté" },
  { value: "prix_asc", label: "Prix croissant" },
  { value: "prix_desc", label: "Prix décroissant" },
  { value: "recent", label: "Plus récent" },
];

const EXPERIENCE_OPTIONS = [
  { value: "any", label: "Toute expérience" },
  { value: "0-2", label: "0-2 ans" },
  { value: "3-5", label: "3-5 ans" },
  { value: "6-10", label: "6-10 ans" },
  { value: "10+", label: "10+ ans" },
];

export default function Search({ navigate, user, params }: ScreenProps) {
  const [query, setQuery] = useState(params.query || "");
  const [activeTab, setActiveTab] = useState<"providers" | "services">("providers");
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState("pertinence");
  const [selectedCategory, setSelectedCategory] = useState(params.category || "");
  const [verified, setVerified] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [priceMax, setPriceMax] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filteredProviders = PROVIDERS.filter((p) => {
    if (query && !p.name.toLowerCase().includes(query.toLowerCase()) &&
        !p.profession.toLowerCase().includes(query.toLowerCase()) &&
        !p.category.toLowerCase().includes(query.toLowerCase())) return false;
    if (selectedCategory && p.category !== selectedCategory) return false;
    if (verified && !p.verified) return false;
    if (minRating && p.rating < minRating) return false;
    return true;
  });

  const filteredServices = SERVICES.filter((s) => {
    if (query && !s.name.toLowerCase().includes(query.toLowerCase()) &&
        !s.category.toLowerCase().includes(query.toLowerCase())) return false;
    if (selectedCategory && s.category !== selectedCategory) return false;
    return true;
  });

  const applyFilters = () => {
    const filters: string[] = [];
    if (selectedCategory) filters.push(selectedCategory);
    if (verified) filters.push("Vérifié");
    if (minRating > 0) filters.push(`${minRating}★+`);
    if (priceMax) filters.push(`< ${priceMax} FCFA`);
    setActiveFilters(filters);
    setShowFilters(false);
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
    if (filter === selectedCategory) setSelectedCategory("");
    if (filter === "Vérifié") setVerified(false);
    if (filter.includes("★")) setMinRating(0);
    if (filter.includes("FCFA")) setPriceMax("");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Search Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-zinc-100 px-4 pt-10 pb-3 space-y-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("home")}
            className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center shrink-0"
          >
            <ChevronLeft className="w-4 h-4 text-zinc-600" />
          </button>
          <div className="flex-1 flex items-center bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 gap-2">
            <SearchIcon className="w-4 h-4 text-zinc-400 shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Prestataire, service, catégorie..."
              className="flex-1 bg-transparent text-sm placeholder:text-zinc-400 outline-none"
              autoFocus
            />
            {query && (
              <button onClick={() => setQuery("")}>
                <X className="w-4 h-4 text-zinc-400" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(true)}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 relative ${
              activeFilters.length > 0 ? "bg-orange-500 border-orange-500" : "bg-zinc-50 border-zinc-200"
            }`}
          >
            <SlidersHorizontal className={`w-4 h-4 ${activeFilters.length > 0 ? "text-white" : "text-zinc-600"}`} />
            {activeFilters.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-zinc-900 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                {activeFilters.length}
              </span>
            )}
          </button>
        </div>

        {/* Active filters */}
        {activeFilters.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {activeFilters.map((f) => (
              <button
                key={f}
                onClick={() => removeFilter(f)}
                className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-full px-3 py-1 text-xs font-medium text-orange-700 whitespace-nowrap shrink-0"
              >
                {f}
                <X className="w-3 h-3" />
              </button>
            ))}
          </div>
        )}

        {/* Sort & Tabs */}
        <div className="flex items-center justify-between">
          <div className="flex bg-zinc-100 rounded-xl p-1 gap-1">
            <button
              onClick={() => setActiveTab("providers")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "providers"
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-500"
              }`}
            >
              Prestataires ({filteredProviders.length})
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "services"
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-500"
              }`}
            >
              Services ({filteredServices.length})
            </button>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-xs text-zinc-600 bg-transparent border-none outline-none font-medium pr-1"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 px-4 py-4 pb-6">
        {activeTab === "providers" ? (
          filteredProviders.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredProviders.map((p) => (
                <ProviderCard key={p.id} provider={p} navigate={navigate} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="🔍"
              title="Aucun résultat trouvé"
              description="Essayez d'autres mots-clés ou ajustez vos filtres."
              action={{ label: "Effacer les filtres", onClick: () => setQuery("") }}
            />
          )
        ) : (
          filteredServices.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredServices.map((s) => (
                <ServiceCard key={s.id} service={s} navigate={navigate} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="🛠️"
              title="Aucun service trouvé"
              description="Essayez d'autres mots-clés ou explorez les catégories."
              action={{ label: "Explorer les catégories", onClick: () => setQuery("") }}
            />
          )
        )}
      </div>

      {/* Filter Sheet */}
      <BottomSheet open={showFilters} onClose={() => setShowFilters(false)} title="Filtres">
        <div className="space-y-6">
          {/* Category */}
          <div>
            <p className="text-sm font-semibold text-zinc-900 mb-3">Catégorie</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  !selectedCategory ? "bg-orange-500 text-white border-orange-500" : "border-zinc-200 text-zinc-600"
                }`}
              >
                Toutes
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(selectedCategory === cat.name ? "" : cat.name)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    selectedCategory === cat.name
                      ? "bg-orange-500 text-white border-orange-500"
                      : "border-zinc-200 text-zinc-600"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <p className="text-sm font-semibold text-zinc-900 mb-3">Note minimale</p>
            <div className="flex gap-2">
              {[0, 3, 4, 4.5].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    minRating === r ? "bg-orange-500 text-white border-orange-500" : "border-zinc-200 text-zinc-600"
                  }`}
                >
                  {r === 0 ? "Toutes" : (
                    <>
                      <Star className="w-3 h-3 fill-current" />
                      {r}+
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Verified */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-900">Prestataires vérifiés uniquement</p>
              <p className="text-xs text-zinc-500 mt-0.5">Afficher seulement les profils certifiés</p>
            </div>
            <button
              onClick={() => setVerified(!verified)}
              className={`relative w-12 h-6 rounded-full transition-all ${verified ? "bg-orange-500" : "bg-zinc-200"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${verified ? "left-6" : "left-0.5"}`} />
            </button>
          </div>

          {/* Location */}
          <div>
            <p className="text-sm font-semibold text-zinc-900 mb-3">Quartier</p>
            <div className="flex items-center gap-2 bg-zinc-50 rounded-xl px-3 py-2.5 border border-zinc-200">
              <MapPin className="w-4 h-4 text-zinc-400" />
              <input placeholder="Badalabougou, ACI 2000..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400" />
            </div>
          </div>

          {/* Price */}
          <div>
            <p className="text-sm font-semibold text-zinc-900 mb-3">Budget maximum</p>
            <div className="flex items-center gap-2 bg-zinc-50 rounded-xl px-3 py-2.5 border border-zinc-200">
              <span className="text-zinc-400 text-sm">FCFA</span>
              <input
                type="number"
                placeholder="Ex: 50000"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400"
              />
            </div>
          </div>

          <Button size="full" onClick={applyFilters}>
            Appliquer les filtres
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
}
