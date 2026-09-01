export type UserRole = "visitor" | "client" | "provider" | "admin";

export interface AppUser {
  id: string;
  name: string;
  phone: string;
  role: "client" | "provider" | "admin";
  avatar?: string;
  verified?: boolean;
}

export type ScreenName =
  | "onboarding"
  | "login"
  | "register-choice"
  | "register-client"
  | "register-provider"
  | "home"
  | "search"
  | "provider-profile"
  | "service-detail"
  | "client-dashboard"
  | "client-orders"
  | "client-messages"
  | "client-favorites"
  | "service-request"
  | "provider-dashboard"
  | "provider-services"
  | "provider-messages"
  | "provider-publish"
  | "admin"
  | "admin-providers"
  | "admin-users"
  | "admin-orders";

export interface NavParams {
  providerId?: string;
  serviceId?: string;
  orderId?: string;
  conversationId?: string;
  query?: string;
  category?: string;
}

export interface ScreenProps {
  navigate: (screen: ScreenName, params?: NavParams) => void;
  user: AppUser | null;
  params: NavParams;
  login: (role: "client" | "provider" | "admin") => void;
  logout: () => void;
}

export interface Provider {
  id: string;
  name: string;
  profession: string;
  category: string;
  subcategory?: string;
  location: string;
  neighborhood: string;
  city: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  bio: string;
  avatar: string;
  coverPhoto: string;
  verified: boolean;
  experience: number;
  skills: string[];
  languages: string[];
  phone: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
  };
  joinedDate: string;
  completedOrders: number;
  gallery: string[];
}

export interface Service {
  id: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  providerVerified: boolean;
  name: string;
  description: string;
  price: number;
  pricingType: "fixed" | "starting_from" | "quote";
  duration: string;
  category: string;
  image: string;
  location: string;
  rating: number;
  reviewCount: number;
  available: boolean;
}

export type OrderStatus =
  | "en_attente"
  | "acceptee"
  | "refusee"
  | "en_negociation"
  | "confirmee"
  | "en_cours"
  | "terminee"
  | "annulee";

export interface TimelineEvent {
  status: string;
  date: string;
  description: string;
  completed: boolean;
  active?: boolean;
}

export interface Order {
  id: string;
  serviceId: string;
  serviceName: string;
  serviceImage: string;
  clientId: string;
  clientName: string;
  clientAvatar: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  providerVerified: boolean;
  description: string;
  originalPrice: number;
  negotiatedPrice?: number;
  finalPrice: number;
  status: OrderStatus;
  createdAt: string;
  scheduledDate?: string;
  location: string;
  timeline: TimelineEvent[];
  category: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  type: "text" | "image" | "voice";
  timestamp: string;
  read: boolean;
  imageUrl?: string;
}

export interface Conversation {
  id: string;
  otherUserId: string;
  otherUserName: string;
  otherUserAvatar: string;
  otherUserVerified?: boolean;
  otherUserProfession?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
  messages: Message[];
}

export interface Post {
  id: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  providerProfession: string;
  providerVerified: boolean;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  timestamp: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  bgColor: string;
  textColor: string;
}

export interface Notification {
  id: string;
  type:
    | "message"
    | "request"
    | "accepted"
    | "rejected"
    | "order"
    | "verification"
    | "system";
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
}
