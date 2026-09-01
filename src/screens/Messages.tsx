import { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  Send,
  Image,
  Mic,
  MoreVertical,
  Phone,
  Search,
  CheckCheck,
  Plus,
} from "lucide-react";
import { Avatar, VerifiedBadge, EmptyState } from "../components/ui";
import { CONVERSATIONS } from "../data/mock";
import type { ScreenProps, Conversation, Message } from "../types";

interface MessagesProps extends ScreenProps {
  role: "client" | "provider";
}

// ─── Conversation List ────────────────────────────────────────────────────────
function ConversationList({
  conversations,
  onSelect,
  navigate,
  role,
}: {
  conversations: Conversation[];
  onSelect: (c: Conversation) => void;
  navigate: ScreenProps["navigate"];
  role: "client" | "provider";
}) {
  const [search, setSearch] = useState("");

  const filtered = conversations.filter(
    (c) =>
      !search ||
      c.otherUserName.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  const totalUnread = conversations.reduce((sum, c) => sum + c.unreadCount, 0);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-zinc-100 px-4 pt-10 pb-3">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate(role === "client" ? "client-dashboard" : "provider-dashboard")}
            className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4 text-zinc-600" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-zinc-900 font-display">Messages</h1>
            {totalUnread > 0 && (
              <p className="text-xs text-orange-500 font-medium">{totalUnread} non lu(s)</p>
            )}
          </div>
          <button className="w-9 h-9 bg-zinc-50 rounded-xl flex items-center justify-center border border-zinc-200">
            <Search className="w-4 h-4 text-zinc-600" />
          </button>
        </div>
        <div className="flex items-center gap-2 bg-zinc-50 rounded-xl px-3 py-2.5 border border-zinc-200">
          <Search className="w-4 h-4 text-zinc-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une conversation..."
            className="flex-1 bg-transparent text-sm placeholder:text-zinc-400 outline-none"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1">
        {filtered.length === 0 ? (
          <EmptyState
            icon="💬"
            title="Aucune conversation pour le moment."
            description="Commencez à échanger avec des prestataires !"
            action={{ label: "Explorer", onClick: () => navigate("search") }}
          />
        ) : (
          filtered.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelect(conv)}
              className="w-full flex items-center gap-3 px-4 py-4 hover:bg-zinc-50 border-b border-zinc-50 transition-colors text-left"
            >
              <div className="relative shrink-0">
                <img
                  src={conv.otherUserAvatar}
                  alt={conv.otherUserName}
                  className="w-12 h-12 rounded-xl object-cover bg-zinc-100"
                />
                <span
                  className={`absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                    conv.online ? "bg-green-500" : "bg-zinc-300"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-semibold text-zinc-900 text-sm truncate">
                      {conv.otherUserName}
                    </span>
                    {conv.otherUserVerified && <VerifiedBadge />}
                  </div>
                  <span className="text-xs text-zinc-400 shrink-0">{conv.lastMessageTime}</span>
                </div>
                {conv.otherUserProfession && (
                  <p className="text-xs text-orange-500 font-medium">{conv.otherUserProfession}</p>
                )}
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <p className="text-xs text-zinc-500 truncate flex-1">{conv.lastMessage}</p>
                  {conv.unreadCount > 0 && (
                    <span className="shrink-0 w-5 h-5 bg-orange-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

// ─── Chat View ────────────────────────────────────────────────────────────────
function ChatView({
  conversation,
  onBack,
  currentUserId,
  navigate,
}: {
  conversation: Conversation;
  onBack: () => void;
  currentUserId: string;
  navigate: ScreenProps["navigate"];
}) {
  const [messages, setMessages] = useState<Message[]>(conversation.messages);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: `m${Date.now()}`,
      senderId: currentUserId,
      content: input.trim(),
      type: "text",
      timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      read: false,
    };
    setMessages([...messages, newMsg]);
    setInput("");
  };

  const groupedMessages = messages.reduce<Array<{ date: string; msgs: Message[] }>>(
    (acc, msg) => {
      const last = acc[acc.length - 1];
      if (!last) return [{ date: "Aujourd'hui", msgs: [msg] }];
      last.msgs.push(msg);
      return acc;
    },
    []
  );

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-zinc-100 px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center shrink-0">
          <ChevronLeft className="w-4 h-4 text-zinc-600" />
        </button>
        <button
          onClick={() => navigate("provider-profile", { providerId: conversation.otherUserId })}
          className="flex items-center gap-2 flex-1 min-w-0"
        >
          <div className="relative shrink-0">
            <img
              src={conversation.otherUserAvatar}
              alt={conversation.otherUserName}
              className="w-9 h-9 rounded-xl object-cover bg-zinc-100"
            />
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
                conversation.online ? "bg-green-500" : "bg-zinc-300"
              }`}
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="font-semibold text-zinc-900 text-sm truncate">{conversation.otherUserName}</p>
              {conversation.otherUserVerified && <VerifiedBadge />}
            </div>
            <p className="text-xs text-zinc-500 truncate">
              {conversation.online ? "En ligne" : "Hors ligne"}
            </p>
          </div>
        </button>
        <div className="flex items-center gap-2 shrink-0">
          <button className="w-9 h-9 bg-zinc-50 rounded-xl flex items-center justify-center border border-zinc-200">
            <Phone className="w-4 h-4 text-zinc-600" />
          </button>
          <button
            onClick={() => setShowActions(!showActions)}
            className="w-9 h-9 bg-zinc-50 rounded-xl flex items-center justify-center border border-zinc-200"
          >
            <MoreVertical className="w-4 h-4 text-zinc-600" />
          </button>
        </div>
      </div>

      {/* Actions dropdown */}
      {showActions && (
        <div className="absolute top-16 right-4 z-20 bg-white rounded-2xl shadow-xl border border-zinc-100 overflow-hidden w-48">
          {[
            "Voir le profil",
            "Faire une demande",
            "Bloquer",
            "Signaler",
          ].map((action) => (
            <button
              key={action}
              onClick={() => {
                if (action === "Faire une demande") {
                  navigate("service-request", { providerId: conversation.otherUserId });
                }
                setShowActions(false);
              }}
              className="w-full px-4 py-3 text-sm text-left hover:bg-zinc-50 border-b border-zinc-50 last:border-0 text-zinc-700"
            >
              {action}
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 bg-zinc-50">
        {/* Quick action banner */}
        <div
          onClick={() => navigate("service-request", { providerId: conversation.otherUserId })}
          className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-2xl px-4 py-3 mb-4 cursor-pointer hover:bg-orange-100 transition-colors"
        >
          <span className="text-base">📋</span>
          <p className="text-sm text-orange-700 font-medium flex-1">
            Créer une demande de service
          </p>
          <ChevronLeft className="w-4 h-4 text-orange-500 rotate-180" />
        </div>

        {groupedMessages.map((group) => (
          <div key={group.date}>
            <div className="flex items-center gap-2 my-3">
              <div className="flex-1 h-px bg-zinc-200" />
              <span className="text-xs text-zinc-400 font-medium">{group.date}</span>
              <div className="flex-1 h-px bg-zinc-200" />
            </div>
            {group.msgs.map((msg) => {
              const isMine = msg.senderId === currentUserId;
              return (
                <div
                  key={msg.id}
                  className={`flex ${isMine ? "justify-end" : "justify-start"} mb-2`}
                >
                  {!isMine && (
                    <img
                      src={conversation.otherUserAvatar}
                      alt=""
                      className="w-7 h-7 rounded-full object-cover mr-2 mt-1 shrink-0"
                    />
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                      isMine
                        ? "bg-orange-500 text-white rounded-br-sm"
                        : "bg-white text-zinc-900 rounded-bl-sm border border-zinc-100 shadow-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    <div className={`flex items-center gap-1 mt-1 ${isMine ? "justify-end" : ""}`}>
                      <span className={`text-[10px] ${isMine ? "text-orange-200" : "text-zinc-400"}`}>
                        {msg.timestamp}
                      </span>
                      {isMine && (
                        <CheckCheck className={`w-3 h-3 ${msg.read ? "text-orange-200" : "text-orange-300/50"}`} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {/* Typing indicator */}
        {conversation.online && (
          <div className="flex items-center gap-2">
            <img src={conversation.otherUserAvatar} alt="" className="w-7 h-7 rounded-full object-cover" />
            <div className="bg-white border border-zinc-100 rounded-2xl rounded-bl-sm px-3 py-2 flex gap-1 items-center shadow-sm">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-zinc-100 px-3 py-3 pb-safe">
        <div className="flex items-end gap-2">
          <button className="w-9 h-9 bg-zinc-50 rounded-xl flex items-center justify-center border border-zinc-200 shrink-0">
            <Plus className="w-4 h-4 text-zinc-500" />
          </button>
          <div className="flex-1 flex items-end bg-zinc-50 border border-zinc-200 rounded-2xl px-3 py-2 gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Votre message..."
              rows={1}
              className="flex-1 bg-transparent text-sm placeholder:text-zinc-400 outline-none resize-none max-h-24"
            />
            <button className="shrink-0">
              <Image className="w-4 h-4 text-zinc-400" />
            </button>
          </div>
          {input.trim() ? (
            <button
              onClick={sendMessage}
              className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center hover:bg-orange-600 transition-colors shrink-0"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          ) : (
            <button
              onMouseDown={() => setIsRecording(true)}
              onMouseUp={() => setIsRecording(false)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                isRecording ? "bg-red-500 scale-110" : "bg-zinc-100 border border-zinc-200"
              }`}
            >
              <Mic className={`w-4 h-4 ${isRecording ? "text-white" : "text-zinc-500"}`} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Messages Screen ─────────────────────────────────────────────────────
export default function Messages({ navigate, user, params, role }: MessagesProps) {
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(
    params.conversationId
      ? CONVERSATIONS.find((c) => c.id === params.conversationId) || null
      : null
  );

  const currentUserId = role === "client" ? "client1" : "prov1";

  if (selectedConv) {
    return (
      <ChatView
        conversation={selectedConv}
        onBack={() => setSelectedConv(null)}
        currentUserId={currentUserId}
        navigate={navigate}
      />
    );
  }

  return (
    <ConversationList
      conversations={CONVERSATIONS}
      onSelect={setSelectedConv}
      navigate={navigate}
      role={role}
    />
  );
}
