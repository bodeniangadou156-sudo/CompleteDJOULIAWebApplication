import { type ReactNode, useState } from "react";
import { Star, CheckCircle, MapPin, X, ChevronLeft } from "lucide-react";
import { formatPrice } from "../data/mock";
import type { Provider, Service, Post, NavParams, ScreenName } from "../types";

// ─── Button ──────────────────────────────────────────────────────────────────
interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg" | "full";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: "button" | "submit";
  icon?: ReactNode;
}

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled,
  loading,
  className = "",
  type = "button",
  icon,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-150 active:scale-[0.97] select-none cursor-pointer";

  const variants = {
    primary: "bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50",
    secondary: "bg-zinc-900 text-white hover:bg-zinc-800 disabled:opacity-50",
    ghost: "bg-transparent text-zinc-700 hover:bg-zinc-100 disabled:opacity-50",
    danger: "bg-red-500 text-white hover:bg-red-600 disabled:opacity-50",
    outline: "bg-white border border-zinc-200 text-zinc-800 hover:bg-zinc-50 disabled:opacity-50",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3.5 text-base",
    full: "w-full px-5 py-3.5 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        icon
      )}
      {children}
    </button>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
  required?: boolean;
}

export function Input({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  error,
  icon,
  iconRight,
  className = "",
  required,
}: InputProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-zinc-700">
          {label}
          {required && <span className="text-orange-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full border ${error ? "border-red-400" : "border-zinc-200"} rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all bg-white ${icon ? "pl-10" : ""} ${iconRight ? "pr-10" : ""}`}
        />
        {iconRight && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 cursor-pointer">
            {iconRight}
          </span>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ─── Textarea ─────────────────────────────────────────────────────────────────
interface TextareaProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  error?: string;
  className?: string;
}

export function Textarea({
  label,
  placeholder,
  value,
  onChange,
  rows = 4,
  error,
  className = "",
}: TextareaProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm font-medium text-zinc-700">{label}</label>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full border ${error ? "border-red-400" : "border-zinc-200"} rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all bg-white resize-none`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ─── Select ───────────────────────────────────────────────────────────────────
interface SelectProps {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

export function Select({ label, value, onChange, options, placeholder, className = "" }: SelectProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm font-medium text-zinc-700">{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all bg-white appearance-none"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
interface AvatarProps {
  src?: string;
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  online?: boolean;
  className?: string;
}

export function Avatar({ src, name, size = "md", online, className = "" }: AvatarProps) {
  const sizes = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
    "2xl": "w-24 h-24 text-2xl",
  };

  const dotSizes = {
    xs: "w-1.5 h-1.5",
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3 h-3",
    xl: "w-3.5 h-3.5",
    "2xl": "w-4 h-4",
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={`relative shrink-0 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizes[size]} rounded-full object-cover bg-orange-100`}
        />
      ) : (
        <div
          className={`${sizes[size]} rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold`}
        >
          {initials}
        </div>
      )}
      {online !== undefined && (
        <span
          className={`absolute bottom-0 right-0 ${dotSizes[size]} rounded-full border-2 border-white ${online ? "bg-green-500" : "bg-zinc-300"}`}
        />
      )}
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info" | "orange";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "default", size = "md", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-zinc-100 text-zinc-600",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-600",
    info: "bg-blue-100 text-blue-700",
    orange: "bg-orange-100 text-orange-700",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}

// ─── Verification Badge ───────────────────────────────────────────────────────
export function VerifiedBadge({ size = "sm" }: { size?: "sm" | "md" }) {
  return (
    <CheckCircle
      className={`${size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} text-orange-500 fill-orange-500`}
      strokeWidth={0}
    />
  );
}

// ─── StarRating ───────────────────────────────────────────────────────────────
export function StarRating({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
      <span className="text-sm font-medium text-zinc-800">{rating.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-xs text-zinc-400">({count})</span>
      )}
    </div>
  );
}

// ─── OrderStatusBadge ─────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  en_attente: { label: "En attente", variant: "warning" as const },
  acceptee: { label: "Acceptée", variant: "success" as const },
  refusee: { label: "Refusée", variant: "error" as const },
  en_negociation: { label: "En négociation", variant: "info" as const },
  confirmee: { label: "Confirmée", variant: "success" as const },
  en_cours: { label: "En cours", variant: "orange" as const },
  terminee: { label: "Terminée", variant: "default" as const },
  annulee: { label: "Annulée", variant: "error" as const },
};

export function OrderStatusBadge({ status }: { status: keyof typeof STATUS_CONFIG }) {
  const cfg = STATUS_CONFIG[status];
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
}

// ─── Provider Card ────────────────────────────────────────────────────────────
interface ProviderCardProps {
  provider: Provider;
  navigate: (screen: ScreenName, params?: NavParams) => void;
  compact?: boolean;
}

export function ProviderCard({ provider, navigate, compact }: ProviderCardProps) {
  if (compact) {
    return (
      <div
        onClick={() => navigate("provider-profile", { providerId: provider.id })}
        className="flex items-center gap-3 p-3 rounded-2xl border border-zinc-100 bg-white hover:shadow-md hover:border-orange-200 transition-all cursor-pointer"
      >
        <div className="relative shrink-0">
          <img
            src={provider.avatar}
            alt={provider.name}
            className="w-14 h-14 rounded-xl object-cover bg-zinc-100"
          />
          {provider.verified && (
            <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
              <VerifiedBadge />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-zinc-900 text-sm truncate">{provider.name}</p>
          <p className="text-xs text-zinc-500 truncate">{provider.profession}</p>
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={provider.rating} />
            <span className="text-xs text-orange-500 font-medium">
              Dès {formatPrice(provider.startingPrice)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => navigate("provider-profile", { providerId: provider.id })}
      className="bg-white rounded-2xl border border-zinc-100 overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all cursor-pointer group"
    >
      <div className="relative">
        <img
          src={provider.avatar}
          alt={provider.name}
          className="w-full h-40 object-cover bg-zinc-100 group-hover:scale-105 transition-transform duration-300"
        />
        {provider.verified && (
          <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-0.5 flex items-center gap-1 text-[10px] font-semibold text-orange-600 shadow-sm">
            <VerifiedBadge size="sm" />
            Vérifié
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="font-semibold text-zinc-900 text-sm">{provider.name}</p>
        <p className="text-xs text-zinc-500 mt-0.5">{provider.profession}</p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
          <span className="text-xs text-zinc-400 truncate">{provider.neighborhood}</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <StarRating rating={provider.rating} count={provider.reviewCount} />
          <span className="text-xs font-semibold text-orange-500">
            Dès {formatPrice(provider.startingPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────
interface ServiceCardProps {
  service: Service;
  navigate: (screen: ScreenName, params?: NavParams) => void;
  onRequest?: () => void;
}

export function ServiceCard({ service, navigate, onRequest }: ServiceCardProps) {
  const pricingLabel = {
    fixed: "",
    starting_from: "À partir de ",
    quote: "Sur devis",
  };

  return (
    <div
      onClick={() => navigate("service-detail", { serviceId: service.id })}
      className="bg-white rounded-2xl border border-zinc-100 overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all cursor-pointer"
    >
      <div className="relative">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-36 object-cover bg-zinc-100"
        />
        <div className="absolute bottom-2 left-2">
          <span className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-0.5 text-[11px] font-semibold text-orange-600">
            {service.pricingType === "quote"
              ? "Sur devis"
              : `${pricingLabel[service.pricingType]}${formatPrice(service.price)}`}
          </span>
        </div>
      </div>
      <div className="p-3">
        <p className="font-semibold text-zinc-900 text-sm line-clamp-1">{service.name}</p>
        <div
          className="flex items-center gap-2 mt-1.5"
          onClick={(e) => {
            e.stopPropagation();
            navigate("provider-profile", { providerId: service.providerId });
          }}
        >
          <img
            src={service.providerAvatar}
            alt={service.providerName}
            className="w-5 h-5 rounded-full object-cover"
          />
          <span className="text-xs text-zinc-500 truncate">{service.providerName}</span>
          {service.providerVerified && <VerifiedBadge />}
        </div>
        <div className="flex items-center justify-between mt-2">
          <StarRating rating={service.rating} count={service.reviewCount} />
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-zinc-400" />
            <span className="text-[11px] text-zinc-400">Bamako</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Post Card ────────────────────────────────────────────────────────────────
interface PostCardProps {
  post: Post;
  navigate: (screen: ScreenName, params?: NavParams) => void;
  onLike?: (id: string) => void;
}

export function PostCard({ post, navigate, onLike }: PostCardProps) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="bg-white border border-zinc-100 rounded-2xl overflow-hidden">
      <div
        className="flex items-center gap-3 p-4 cursor-pointer"
        onClick={() => navigate("provider-profile", { providerId: post.providerId })}
      >
        <Avatar src={post.providerAvatar} name={post.providerName} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-zinc-900 text-sm">{post.providerName}</span>
            {post.providerVerified && <VerifiedBadge />}
          </div>
          <p className="text-xs text-zinc-500">{post.providerProfession}</p>
        </div>
        <span className="text-xs text-zinc-400 shrink-0">{post.timestamp}</span>
      </div>

      {post.content && (
        <div className="px-4 pb-3">
          <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-line line-clamp-3">
            {post.content}
          </p>
        </div>
      )}

      {post.images && post.images.length > 0 && (
        <div className="relative">
          <img
            src={post.images[currentImage]}
            alt="Publication"
            className="w-full h-64 object-cover bg-zinc-100"
          />
          {post.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {post.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImage ? "bg-white w-4" : "bg-white/60"}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-4 px-4 py-3 border-t border-zinc-50">
        <button
          onClick={() => onLike?.(post.id)}
          className={`flex items-center gap-1.5 text-sm transition-colors ${post.liked ? "text-orange-500" : "text-zinc-500 hover:text-orange-500"}`}
        >
          <svg
            className={`w-4.5 h-4.5 ${post.liked ? "fill-orange-500" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span>{post.likes}</span>
        </button>
        <button className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-orange-500 transition-colors">
          <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>{post.comments}</span>
        </button>
        <button className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-orange-500 transition-colors ml-auto">
          <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          <span>{post.shares}</span>
        </button>
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}

export function Modal({ open, onClose, title, children, size = "md" }: ModalProps) {
  if (!open) return null;

  const sizes = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg" };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative bg-white ${sizes[size]} w-full rounded-t-3xl sm:rounded-2xl shadow-2xl animate-slide-up sm:animate-scale-in max-h-[90vh] overflow-hidden flex flex-col`}
      >
        {title && (
          <div className="flex items-center justify-between p-5 border-b border-zinc-100 shrink-0">
            <h3 className="font-bold text-zinc-900 font-display text-base">{title}</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 transition-colors"
            >
              <X className="w-4 h-4 text-zinc-600" />
            </button>
          </div>
        )}
        <div className="overflow-y-auto flex-1 p-5">{children}</div>
      </div>
    </div>
  );
}

// ─── Bottom Sheet ─────────────────────────────────────────────────────────────
interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full rounded-t-3xl shadow-2xl animate-slide-up max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-center py-3">
          <div className="w-10 h-1 bg-zinc-300 rounded-full" />
        </div>
        {title && (
          <div className="flex items-center justify-between px-5 pb-4">
            <h3 className="font-bold text-zinc-900 text-lg font-display">{title}</h3>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
              <X className="w-4 h-4 text-zinc-500" />
            </button>
          </div>
        )}
        <div className="overflow-y-auto flex-1 px-5 pb-8">{children}</div>
      </div>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  visible: boolean;
}

export function Toast({ message, type = "success", visible }: ToastProps) {
  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-zinc-800",
  };

  if (!visible) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] animate-fade-in">
      <div className={`${colors[type]} text-white rounded-xl px-4 py-2.5 text-sm font-medium shadow-lg`}>
        {message}
      </div>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-zinc-100 rounded-lg animate-pulse ${className}`} />;
}

export function ProviderCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
      <Skeleton className="h-40 w-full rounded-none" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 text-2xl">
        {icon}
      </div>
      <h3 className="font-bold text-zinc-900 text-base mb-1 font-display">{title}</h3>
      <p className="text-sm text-zinc-500 max-w-xs">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-5 bg-orange-500 text-white rounded-xl px-5 py-2.5 text-sm font-semibold"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

// ─── Back button ─────────────────────────────────────────────────────────────
export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm border border-zinc-100 hover:bg-zinc-50 transition-colors"
    >
      <ChevronLeft className="w-5 h-5 text-zinc-700" />
    </button>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
interface SectionHeaderProps {
  title: string;
  action?: { label: string; onClick: () => void };
}

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-bold text-zinc-900 text-lg font-display">{title}</h2>
      {action && (
        <button
          onClick={action.onClick}
          className="text-orange-500 text-sm font-medium hover:text-orange-600 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

// ─── Progress Steps ───────────────────────────────────────────────────────────
export function ProgressSteps({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < current ? "bg-orange-500" : "bg-zinc-200"}`}
        />
      ))}
    </div>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
interface TabsProps {
  tabs: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, active, onChange, className = "" }: TabsProps) {
  return (
    <div className={`flex border-b border-zinc-200 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
            active === tab.id
              ? "border-orange-500 text-orange-500"
              : "border-transparent text-zinc-500 hover:text-zinc-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
