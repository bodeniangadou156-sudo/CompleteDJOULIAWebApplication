import { useState } from "react";
import type { ScreenName, NavParams, AppUser } from "./types";
import Onboarding from "./screens/Onboarding";
import Auth from "./screens/Auth";
import Home from "./screens/Home";
import Search from "./screens/Search";
import ProviderProfile from "./screens/ProviderProfile";
import ServiceDetail from "./screens/ServiceDetail";
import ClientDashboard from "./screens/ClientDashboard";
import Messages from "./screens/Messages";
import ServiceRequest from "./screens/ServiceRequest";
import ProviderDashboard from "./screens/ProviderDashboard";
import Admin from "./screens/Admin";

const MOCK_USERS: Record<"client" | "provider" | "admin", AppUser> = {
  client: {
    id: "client1",
    name: "Aïssata Keïta",
    phone: "+223 76 34 56 78",
    role: "client",
    avatar:
      "https://images.unsplash.com/photo-1618803208272-872fb4b0b6cd?w=100&h=100&fit=crop&auto=format",
  },
  provider: {
    id: "prov1",
    name: "Aminata Kouyaté",
    phone: "+223 76 23 45 67",
    role: "provider",
    avatar:
      "https://images.unsplash.com/photo-1773399025073-d2172448d13e?w=100&h=100&fit=crop&auto=format",
    verified: true,
  },
  admin: {
    id: "admin1",
    name: "Directeur Plateforme",
    phone: "+223 20 22 33 44",
    role: "admin",
  },
};

export default function App() {
  const [screen, setScreen] = useState<ScreenName>("onboarding");
  const [params, setParams] = useState<NavParams>({});
  const [user, setUser] = useState<AppUser | null>(null);

  const navigate = (newScreen: ScreenName, newParams: NavParams = {}) => {
    setScreen(newScreen);
    setParams(newParams);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  };

  const login = (role: "client" | "provider" | "admin") => {
    setUser(MOCK_USERS[role]);
  };

  const logout = () => {
    setUser(null);
    navigate("home");
  };

  const commonProps = { navigate, user, params, login, logout };

  switch (screen) {
    case "onboarding":
      return <Onboarding {...commonProps} />;

    case "login":
      return <Auth {...commonProps} mode="login" />;

    case "register-choice":
      return <Auth {...commonProps} mode="register-choice" />;

    case "register-client":
      return <Auth {...commonProps} mode="register-client" />;

    case "register-provider":
      return <Auth {...commonProps} mode="register-provider" />;

    case "home":
      return <Home {...commonProps} />;

    case "search":
      return <Search {...commonProps} />;

    case "provider-profile":
      return <ProviderProfile {...commonProps} />;

    case "service-detail":
      return <ServiceDetail {...commonProps} />;

    case "client-dashboard":
      return <ClientDashboard {...commonProps} activeTab="home" />;

    case "client-orders":
      return <ClientDashboard {...commonProps} activeTab="orders" />;

    case "client-messages":
      return <Messages {...commonProps} role="client" />;

    case "client-favorites":
      return <ClientDashboard {...commonProps} activeTab="favorites" />;

    case "service-request":
      return <ServiceRequest {...commonProps} />;

    case "provider-dashboard":
      return <ProviderDashboard {...commonProps} activeTab="home" />;

    case "provider-services":
      return <ProviderDashboard {...commonProps} activeTab="services" />;

    case "provider-messages":
      return <Messages {...commonProps} role="provider" />;

    case "provider-publish":
      return <ProviderDashboard {...commonProps} activeTab="publish" />;

    case "admin":
    case "admin-providers":
    case "admin-users":
    case "admin-orders":
      return <Admin {...commonProps} />;

    default:
      return <Home {...commonProps} />;
  }
}
