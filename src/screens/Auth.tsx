import { useState } from "react";
import {
  Phone,
  Lock,
  Eye,
  EyeOff,
  User,
  ChevronLeft,
  ArrowRight,
  Check,
  Camera,
  Upload,
} from "lucide-react";
import { Button, Input, ProgressSteps, Select, Textarea } from "../components/ui";
import type { ScreenProps } from "../types";

// ─── Login ───────────────────────────────────────────────────────────────────
function LoginScreen({ navigate, login }: ScreenProps) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (role: "client" | "provider" | "admin") => {
    setLoading(true);
    setTimeout(() => {
      login(role);
      if (role === "client") navigate("client-dashboard");
      else if (role === "provider") navigate("provider-dashboard");
      else navigate("admin");
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-8">
        <button onClick={() => navigate("home")} className="mb-6 flex items-center gap-2 text-zinc-500 hover:text-zinc-800 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Retour</span>
        </button>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">D</span>
          </div>
          <span className="font-black text-lg text-zinc-900 font-display">DJOULIA</span>
        </div>
        <h1 className="text-2xl font-black text-zinc-900 font-display mt-4">Bienvenue !</h1>
        <p className="text-zinc-500 mt-1">Connectez-vous à votre compte</p>
      </div>

      <div className="flex-1 px-6 space-y-4">
        <Input
          label="Numéro de téléphone"
          placeholder="+223 XX XX XX XX"
          value={phone}
          onChange={setPhone}
          type="tel"
          icon={<Phone className="w-4 h-4" />}
        />
        <Input
          label="Mot de passe"
          placeholder="Votre mot de passe"
          value={password}
          onChange={setPassword}
          type={showPass ? "text" : "password"}
          icon={<Lock className="w-4 h-4" />}
          iconRight={
            <button onClick={() => setShowPass(!showPass)}>
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="text-right">
          <button className="text-sm text-orange-500 font-medium hover:text-orange-600">
            Mot de passe oublié ?
          </button>
        </div>
      </div>

      <div className="px-6 pb-8 pt-6 space-y-3">
        {/* Demo buttons */}
        <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
          <p className="text-xs text-orange-700 font-semibold mb-3 text-center">
            Connexion rapide (démo)
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleLogin("client")}
              className="bg-orange-500 text-white rounded-xl py-2.5 text-xs font-semibold hover:bg-orange-600 transition-colors"
            >
              Client
            </button>
            <button
              onClick={() => handleLogin("provider")}
              className="bg-zinc-900 text-white rounded-xl py-2.5 text-xs font-semibold hover:bg-zinc-800 transition-colors"
            >
              Prestataire
            </button>
            <button
              onClick={() => handleLogin("admin")}
              className="bg-blue-600 text-white rounded-xl py-2.5 text-xs font-semibold hover:bg-blue-700 transition-colors"
            >
              Admin
            </button>
          </div>
        </div>
        <Button size="full" loading={loading} onClick={() => handleLogin("client")}>
          Se connecter
        </Button>
        <p className="text-center text-sm text-zinc-500">
          Pas encore de compte ?{" "}
          <button
            onClick={() => navigate("register-choice")}
            className="text-orange-500 font-semibold hover:text-orange-600"
          >
            S'inscrire
          </button>
        </p>
      </div>
    </div>
  );
}

// ─── Register Choice ─────────────────────────────────────────────────────────
function RegisterChoice({ navigate }: ScreenProps) {
  const [selected, setSelected] = useState<"client" | "provider" | null>(null);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="px-6 pt-12 pb-6">
        <button onClick={() => navigate("login")} className="mb-6 flex items-center gap-2 text-zinc-500">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Retour</span>
        </button>
        <h1 className="text-2xl font-black text-zinc-900 font-display">Créer votre compte</h1>
        <p className="text-zinc-500 mt-1">Qui êtes-vous sur DJOULIA ?</p>
      </div>

      <div className="flex-1 px-6 space-y-4">
        <button
          onClick={() => setSelected("client")}
          className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
            selected === "client"
              ? "border-orange-500 bg-orange-50"
              : "border-zinc-200 hover:border-zinc-300"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl shrink-0">
              🔍
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-zinc-900 font-display">Client</h3>
                {selected === "client" && (
                  <Check className="w-5 h-5 text-orange-500" />
                )}
              </div>
              <p className="text-sm text-zinc-500 mt-0.5">
                Recherchez et commandez des services auprès de professionnels vérifiés.
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setSelected("provider")}
          className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
            selected === "provider"
              ? "border-orange-500 bg-orange-50"
              : "border-zinc-200 hover:border-zinc-300"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-zinc-100 rounded-2xl flex items-center justify-center text-2xl shrink-0">
              💼
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-zinc-900 font-display">Prestataire</h3>
                {selected === "provider" && (
                  <Check className="w-5 h-5 text-orange-500" />
                )}
              </div>
              <p className="text-sm text-zinc-500 mt-0.5">
                Proposez vos services professionnels et développez votre activité.
              </p>
            </div>
          </div>
        </button>

        <div className="bg-zinc-50 rounded-2xl p-4 flex items-start gap-3">
          <span className="text-zinc-400 text-lg mt-0.5">ℹ️</span>
          <p className="text-xs text-zinc-500 leading-relaxed">
            L'inscription en tant qu'administrateur n'est pas disponible publiquement. Contactez l'équipe DJOULIA si nécessaire.
          </p>
        </div>
      </div>

      <div className="px-6 pb-12 pt-6">
        <Button
          size="full"
          disabled={!selected}
          onClick={() => selected && navigate(selected === "client" ? "register-client" : "register-provider")}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Continuer
        </Button>
      </div>
    </div>
  );
}

// ─── Register Client ──────────────────────────────────────────────────────────
function RegisterClient({ navigate, login }: ScreenProps) {
  const [step, setStep] = useState(1);
  const TOTAL = 5;
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFinish = () => {
    setLoading(true);
    setTimeout(() => {
      login("client");
      navigate("client-dashboard");
    }, 1000);
  };

  const steps = [
    { label: "Téléphone", content: (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3">📱</div>
          <h2 className="text-xl font-black text-zinc-900 font-display">Votre numéro</h2>
          <p className="text-zinc-500 text-sm mt-1">Nous vous enverrons un code de vérification.</p>
        </div>
        <Input
          label="Numéro de téléphone"
          placeholder="+223 XX XX XX XX"
          value={phone}
          onChange={setPhone}
          type="tel"
          icon={<Phone className="w-4 h-4" />}
        />
      </div>
    )},
    { label: "Identité", content: (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3">👤</div>
          <h2 className="text-xl font-black text-zinc-900 font-display">Vos informations</h2>
        </div>
        <Input label="Prénom" placeholder="Amadou" value={firstName} onChange={setFirstName} icon={<User className="w-4 h-4" />} />
        <Input label="Nom" placeholder="Keïta" value={lastName} onChange={setLastName} icon={<User className="w-4 h-4" />} />
      </div>
    )},
    { label: "Mot de passe", content: (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3">🔐</div>
          <h2 className="text-xl font-black text-zinc-900 font-display">Choisissez un mot de passe</h2>
        </div>
        <Input
          label="Mot de passe"
          placeholder="Au moins 8 caractères"
          value={password}
          onChange={setPassword}
          type={showPass ? "text" : "password"}
          icon={<Lock className="w-4 h-4" />}
          iconRight={
            <button onClick={() => setShowPass(!showPass)}>
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />
      </div>
    )},
    { label: "Profil", content: (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3">📍</div>
          <h2 className="text-xl font-black text-zinc-900 font-display">Votre localisation</h2>
        </div>
        <Select
          label="Ville"
          value={city}
          onChange={setCity}
          options={[
            { value: "bamako", label: "Bamako" },
            { value: "sikasso", label: "Sikasso" },
            { value: "segou", label: "Ségou" },
            { value: "mopti", label: "Mopti" },
          ]}
          placeholder="Sélectionnez votre ville"
        />
      </div>
    )},
    { label: "Confirmation", content: (
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto">✅</div>
        <div>
          <h2 className="text-xl font-black text-zinc-900 font-display mb-2">Tout est prêt !</h2>
          <p className="text-zinc-500 text-sm">Votre compte client est créé. Commencez à découvrir des prestataires autour de vous.</p>
        </div>
        <div className="bg-zinc-50 rounded-2xl p-4 text-left space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Nom</span>
            <span className="font-medium text-zinc-900">{firstName} {lastName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Téléphone</span>
            <span className="font-medium text-zinc-900">{phone || "+223 XX XX XX XX"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Ville</span>
            <span className="font-medium text-zinc-900 capitalize">{city || "Non renseigné"}</span>
          </div>
        </div>
      </div>
    )},
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : navigate("register-choice")}
            className="w-9 h-9 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-50"
          >
            <ChevronLeft className="w-4 h-4 text-zinc-600" />
          </button>
          <div className="flex-1">
            <ProgressSteps current={step} total={TOTAL} />
          </div>
          <span className="text-sm text-zinc-400">{step}/{TOTAL}</span>
        </div>
      </div>

      <div className="flex-1 px-6 animate-fade-in">
        {steps[step - 1].content}
      </div>

      <div className="px-6 pb-12 pt-6">
        {step < TOTAL ? (
          <Button size="full" onClick={() => setStep(step + 1)}>
            Continuer
          </Button>
        ) : (
          <Button size="full" loading={loading} onClick={handleFinish}>
            Créer mon compte
          </Button>
        )}
      </div>
    </div>
  );
}

// ─── Register Provider ────────────────────────────────────────────────────────
function RegisterProvider({ navigate, login }: ScreenProps) {
  const [step, setStep] = useState(1);
  const TOTAL = 8;
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profession, setProfession] = useState("");
  const [category, setCategory] = useState("");
  const [bio, setBio] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  const handleFinish = () => {
    setLoading(true);
    setTimeout(() => {
      login("provider");
      navigate("provider-dashboard");
    }, 1200);
  };

  const stepTitles = [
    "Compte",
    "Identité",
    "Profession",
    "Vérification",
    "Localisation",
    "Réseaux sociaux",
    "Vérification finale",
    "Confirmation",
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="mb-6">
              <h2 className="text-xl font-black text-zinc-900 font-display">Créez votre compte</h2>
              <p className="text-zinc-500 text-sm mt-1">Rejoignez DJOULIA en tant que prestataire</p>
            </div>
            <Input label="Numéro de téléphone" placeholder="+223 XX XX XX XX" value={phone} onChange={setPhone} type="tel" icon={<Phone className="w-4 h-4" />} />
            <Input label="Mot de passe" placeholder="Au moins 8 caractères" value="" onChange={() => {}} type="password" icon={<Lock className="w-4 h-4" />} />
            <Input label="Confirmer le mot de passe" placeholder="Répétez le mot de passe" value="" onChange={() => {}} type="password" icon={<Lock className="w-4 h-4" />} />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="mb-4">
              <h2 className="text-xl font-black text-zinc-900 font-display">Votre identité</h2>
              <p className="text-zinc-500 text-sm mt-1">Ces informations seront visibles sur votre profil</p>
            </div>
            <div className="flex flex-col items-center mb-4">
              <div className="w-20 h-20 rounded-2xl bg-zinc-100 border-2 border-dashed border-zinc-300 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-50 transition-colors">
                <Camera className="w-6 h-6 text-zinc-400 mb-1" />
                <span className="text-xs text-zinc-400">Photo</span>
              </div>
            </div>
            <Input label="Prénom" placeholder="Aminata" value={firstName} onChange={setFirstName} icon={<User className="w-4 h-4" />} />
            <Input label="Nom" placeholder="Kouyaté" value={lastName} onChange={setLastName} icon={<User className="w-4 h-4" />} />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="mb-4">
              <h2 className="text-xl font-black text-zinc-900 font-display">Votre profession</h2>
            </div>
            <Input label="Nom professionnel" placeholder="Ex: Maquilleuse professionnelle" value={profession} onChange={setProfession} />
            <Select label="Catégorie" value={category} onChange={setCategory} options={[
              { value: "beaute", label: "Beauté & Bien-être" },
              { value: "mode", label: "Mode & Couture" },
              { value: "maison", label: "Maison & Réparation" },
              { value: "informatique", label: "Informatique & Digital" },
              { value: "photo", label: "Photographie & Vidéo" },
              { value: "evenementiel", label: "Événementiel" },
              { value: "transport", label: "Transport" },
              { value: "education", label: "Éducation & Formation" },
            ]} placeholder="Choisissez une catégorie" />
            <Textarea label="Biographie" placeholder="Décrivez votre activité, votre expérience..." value={bio} onChange={setBio} rows={4} />
            <Input label="Années d'expérience" placeholder="Ex: 5" value="" onChange={() => {}} type="number" />
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="mb-4">
              <h2 className="text-xl font-black text-zinc-900 font-display">Vérification d'identité</h2>
              <p className="text-zinc-500 text-sm mt-1">Pour la sécurité de nos utilisateurs</p>
            </div>
            <Select label="Type de document" value="" onChange={() => {}} options={[
              { value: "cni", label: "Carte Nationale d'Identité" },
              { value: "passeport", label: "Passeport" },
              { value: "permis", label: "Permis de conduire" },
            ]} placeholder="Choisissez le type" />
            <Input label="Numéro du document" placeholder="N° du document" value="" onChange={() => {}} />
            <div className="border-2 border-dashed border-zinc-200 rounded-2xl p-8 flex flex-col items-center gap-3 cursor-pointer hover:bg-zinc-50 transition-colors">
              <Upload className="w-8 h-8 text-zinc-400" />
              <div className="text-center">
                <p className="text-sm font-medium text-zinc-700">Téléversez votre document</p>
                <p className="text-xs text-zinc-400 mt-1">JPG, PNG ou PDF — Max 5 Mo</p>
              </div>
              <button className="bg-orange-500 text-white rounded-xl px-4 py-2 text-sm font-semibold">
                Parcourir
              </button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <div className="mb-4">
              <h2 className="text-xl font-black text-zinc-900 font-display">Votre localisation</h2>
            </div>
            <Select label="Région" value={region} onChange={setRegion} options={[
              { value: "bamako", label: "Bamako" },
              { value: "kayes", label: "Kayes" },
              { value: "koulikoro", label: "Koulikoro" },
              { value: "sikasso", label: "Sikasso" },
              { value: "segou", label: "Ségou" },
              { value: "mopti", label: "Mopti" },
            ]} placeholder="Choisissez votre région" />
            <Select label="Commune" value={city} onChange={setCity} options={[
              { value: "commune1", label: "Commune I (Banconi)" },
              { value: "commune2", label: "Commune II (Niarela)" },
              { value: "commune3", label: "Commune III (Boulkassoumbougou)" },
              { value: "commune4", label: "Commune IV (Lafiabougou)" },
              { value: "commune5", label: "Commune V (Badalabougou)" },
              { value: "commune6", label: "Commune VI (Magnambougou)" },
            ]} placeholder="Commune" />
            <Input label="Quartier" placeholder="Ex: Badalabougou" value={neighborhood} onChange={setNeighborhood} />
            <Input label="Adresse" placeholder="Rue, numéro..." value="" onChange={() => {}} />
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <div className="mb-4">
              <h2 className="text-xl font-black text-zinc-900 font-display">Réseaux sociaux</h2>
              <p className="text-zinc-500 text-sm mt-1">Optionnel — pour booster votre visibilité</p>
            </div>
            {[
              { label: "Facebook", placeholder: "Lien ou nom de page", emoji: "📘" },
              { label: "Instagram", placeholder: "@votre_compte", emoji: "📸" },
              { label: "TikTok", placeholder: "@votre_compte", emoji: "🎵" },
              { label: "WhatsApp", placeholder: "+223 XX XX XX XX", emoji: "💬" },
              { label: "Site web", placeholder: "https://votre-site.com", emoji: "🌐" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="text-xl w-8">{s.emoji}</span>
                <Input
                  className="flex-1"
                  label={s.label}
                  placeholder={s.placeholder}
                  value=""
                  onChange={() => {}}
                />
              </div>
            ))}
          </div>
        );
      case 7:
        return (
          <div className="space-y-4">
            <div className="mb-4">
              <h2 className="text-xl font-black text-zinc-900 font-display">Vérification finale</h2>
              <p className="text-zinc-500 text-sm mt-1">Vérifiez vos informations avant de soumettre</p>
            </div>
            <div className="bg-zinc-50 rounded-2xl p-4 space-y-3">
              {[
                { label: "Nom complet", value: `${firstName || "Aminata"} ${lastName || "Kouyaté"}` },
                { label: "Téléphone", value: phone || "+223 76 23 45 67" },
                { label: "Profession", value: profession || "Maquilleuse professionnelle" },
                { label: "Catégorie", value: category || "Beauté & Bien-être" },
                { label: "Localisation", value: `${neighborhood || "Badalabougou"}, Bamako` },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-start">
                  <span className="text-sm text-zinc-500">{item.label}</span>
                  <span className="text-sm font-medium text-zinc-900 text-right max-w-[60%]">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
              <p className="text-xs text-orange-700">
                En soumettant ce formulaire, vous acceptez les{" "}
                <button className="font-semibold underline">Conditions Générales</button> et la{" "}
                <button className="font-semibold underline">Politique de Confidentialité</button> de DJOULIA.
              </p>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="flex flex-col items-center text-center py-8 space-y-6">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-5xl">
              🎉
            </div>
            <div>
              <h2 className="text-2xl font-black text-zinc-900 font-display">Demande envoyée !</h2>
              <p className="text-zinc-500 mt-2 leading-relaxed">
                Votre demande de vérification a été transmise à l'équipe DJOULIA.
              </p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl px-4 py-3 flex items-center gap-3 w-full">
              <span className="text-2xl">⏳</span>
              <div className="text-left">
                <p className="text-sm font-bold text-yellow-800">En attente de validation</p>
                <p className="text-xs text-yellow-700">Délai : 24 à 48 heures ouvrées</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="px-6 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : navigate("register-choice")}
            className="w-9 h-9 rounded-full border border-zinc-200 flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4 text-zinc-600" />
          </button>
          <div className="flex-1">
            <ProgressSteps current={step} total={TOTAL} />
          </div>
          <span className="text-sm text-zinc-400">{step}/{TOTAL}</span>
        </div>
        <p className="text-xs text-zinc-400 mt-2 pl-12">{stepTitles[step - 1]}</p>
      </div>

      <div className="flex-1 px-6 py-4 animate-fade-in overflow-y-auto">
        {renderStep()}
      </div>

      <div className="px-6 pb-12 pt-4 shrink-0">
        {step < TOTAL ? (
          <Button size="full" onClick={() => setStep(step + 1)}>
            Continuer
          </Button>
        ) : (
          <Button size="full" loading={loading} onClick={handleFinish}>
            Accéder à mon espace
          </Button>
        )}
      </div>
    </div>
  );
}

// ─── Auth Router ──────────────────────────────────────────────────────────────
interface AuthProps extends ScreenProps {
  mode: "login" | "register-choice" | "register-client" | "register-provider";
}

export default function Auth(props: AuthProps) {
  switch (props.mode) {
    case "login":
      return <LoginScreen {...props} />;
    case "register-choice":
      return <RegisterChoice {...props} />;
    case "register-client":
      return <RegisterClient {...props} />;
    case "register-provider":
      return <RegisterProvider {...props} />;
  }
}
