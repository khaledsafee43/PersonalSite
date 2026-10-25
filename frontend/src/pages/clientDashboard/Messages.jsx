import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  ArrowLeft,
  MessageCircle,
  Check,
  CheckCheck,
  Plus,
  Smile,
  Image as ImageIcon,
  Circle,
  X,
} from "lucide-react";

const initialConversations = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Project Manager",
    avatar: "AM",
    color: "bg-blue-600",
    project: "E-commerce Website",
    online: true,
    unread: 2,
    messages: [
      {
        id: 1,
        text: "Hello! Welcome to your project workspace.",
        time: "09:15 AM",
        sender: "other",
        read: true,
      },
      {
        id: 2,
        text: "I've reviewed the initial requirements for your e-commerce website.",
        time: "09:16 AM",
        sender: "other",
        read: true,
      },
      {
        id: 3,
        text: "Great! I would like the homepage to look modern and clean.",
        time: "09:20 AM",
        sender: "me",
        read: true,
      },
      {
        id: 4,
        text: "Absolutely! We can use a clean layout with a clear product section and simple navigation.",
        time: "09:22 AM",
        sender: "other",
        read: true,
      },
      {
        id: 5,
        text: "That sounds perfect. Please also make sure the website works well on mobile.",
        time: "09:25 AM",
        sender: "me",
        read: true,
      },
      {
        id: 6,
        text: "Of course! Responsive design is included. I'll share the next update with you soon.",
        time: "09:28 AM",
        sender: "other",
        read: true,
      },
    ],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "UI/UX Designer",
    avatar: "SJ",
    color: "bg-purple-600",
    project: "Personal Portfolio",
    online: true,
    unread: 1,
    messages: [
      {
        id: 1,
        text: "I've finished the first draft of your portfolio design.",
        time: "Yesterday",
        sender: "other",
        read: true,
      },
      {
        id: 2,
        text: "Could you review the colors and typography?",
        time: "Yesterday",
        sender: "other",
        read: true,
      },
    ],
  },
  {
    id: 3,
    name: "Daniel Smith",
    role: "Backend Developer",
    avatar: "DS",
    color: "bg-emerald-600",
    project: "Management System",
    online: false,
    unread: 0,
    messages: [
      {
        id: 1,
        text: "The API endpoints are ready for testing.",
        time: "Yesterday",
        sender: "other",
        read: true,
      },
      {
        id: 2,
        text: "Thank you! I'll test them and send you feedback.",
        time: "Yesterday",
        sender: "me",
        read: true,
      },
    ],
  },
  {
    id: 4,
    name: "Emily Carter",
    role: "Support Specialist",
    avatar: "EC",
    color: "bg-orange-500",
    project: "General Support",
    online: false,
    unread: 0,
    messages: [
      {
        id: 1,
        text: "Let us know if you need any help with your workspace.",
        time: "Oct 20",
        sender: "other",
        read: true,
      },
    ],
  },
];

function getCurrentTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ConversationItem({ conversation, active, onClick }) {
  const lastMessage = conversation.messages[conversation.messages.length - 1];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-start gap-3 border-b border-slate-100 p-4 text-left transition ${
        active ? "bg-blue-50" : "bg-white hover:bg-slate-50"
      }`}
    >
      <div className="relative shrink-0">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-full text-xs font-bold text-white ${conversation.color}`}
        >
          {conversation.avatar}
        </div>

        {conversation.online && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-sm font-semibold text-slate-800">
            {conversation.name}
          </h3>

          <span className="shrink-0 text-[10px] text-slate-400">
            {lastMessage?.time}
          </span>
        </div>

        <p className="mt-1 truncate text-[11px] text-slate-500">
          {conversation.role}
        </p>

        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="truncate text-xs text-slate-500">
            {lastMessage?.sender === "me" ? "You: " : ""}
            {lastMessage?.text}
          </p>

          {conversation.unread > 0 && (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
              {conversation.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

function MessageBubble({ message }) {
  const isMine = message.sender === "me";

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] sm:max-w-[75%] ${
          isMine ? "items-end" : "items-start"
        } flex flex-col`}
      >
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
            isMine
              ? "rounded-br-sm bg-blue-600 text-white"
              : "rounded-bl-sm border border-slate-200 bg-white text-slate-700"
          }`}
        >
          {message.text}
        </div>

        <div className="mt-1.5 flex items-center gap-1.5 px-1">
          <span className="text-[10px] text-slate-400">{message.time}</span>

          {isMine &&
            (message.read ? (
              <CheckCheck size={13} className="text-blue-500" />
            ) : (
              <Check size={13} className="text-slate-400" />
            ))}
        </div>
      </div>
    </div>
  );
}

export default function Messages() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const [conversations, setConversations] = useState(() => {
    try {
      const saved = localStorage.getItem("clientPortalMessages");

      return saved ? JSON.parse(saved) : initialConversations;
    } catch {
      return initialConversations;
    }
  });

  const [activeId, setActiveId] = useState(1);
  const [search, setSearch] = useState("");
  const [messageText, setMessageText] = useState("");
  const [showConversationInfo, setShowConversationInfo] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false);

  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeId,
  );

  useEffect(() => {
    localStorage.setItem("clientPortalMessages", JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [activeId, activeConversation?.messages.length]);

  function openConversation(id) {
    setActiveId(id);
    setShowMobileChat(true);
    setShowConversationInfo(false);

    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === id ? { ...conversation, unread: 0 } : conversation,
      ),
    );
  }

  function sendMessage(event) {
    event.preventDefault();

    const text = messageText.trim();

    if (!text || !activeConversation) {
      return;
    }

    const newMessage = {
      id: Date.now(),
      text,
      time: getCurrentTime(),
      sender: "me",
      read: false,
    };

    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === activeId
          ? {
              ...conversation,
              messages: [...conversation.messages, newMessage],
              unread: 0,
            }
          : conversation,
      ),
    );

    setMessageText("");
  }

  const filteredConversations = conversations.filter((conversation) => {
    const query = search.trim().toLowerCase();

    return (
      conversation.name.toLowerCase().includes(query) ||
      conversation.role.toLowerCase().includes(query) ||
      conversation.project.toLowerCase().includes(query)
    );
  });

  if (!activeConversation) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-slate-500">
        Conversation not found.
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-[calc(100dvh-100px)] min-h-[520px] max-w-[1600px] flex-col gap-5">
      {/* Page Header */}
      <header className="flex shrink-0 items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Workspace</span>
            <span>/</span>
            <span className="font-medium text-blue-600">Messages</span>
          </div>

          <h1 className="mt-2 text-2xl font-bold text-slate-800">Messages</h1>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Communicate with your team and manage project conversations.
          </p>
        </div>

        <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 sm:flex">
          <MessageCircle size={17} className="text-blue-600" />

          <span className="text-xs font-semibold text-slate-600">
            Team Chat
          </span>
        </div>
      </header>

      {/* Messenger */}
      <section className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[320px_minmax(0,1fr)]">
        {/* Conversation Sidebar */}
        <aside
          className={`min-h-0 flex-col border-r border-slate-200 ${
            showMobileChat ? "hidden lg:flex" : "flex"
          }`}
        >
          {/* Sidebar Header */}
          <div className="border-b border-slate-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-800">
                  Conversations
                </h2>

                <p className="mt-1 text-[11px] text-slate-400">
                  {conversations.length} conversations
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  alert(
                    "New conversation creation will be connected to the backend later.",
                  )
                }
                aria-label="New conversation"
                className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Search */}
            <div className="relative mt-4">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search conversations..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="px-4 pb-2 pt-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Recent conversations
              </p>
            </div>

            {filteredConversations.length > 0 ? (
              filteredConversations.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  active={conversation.id === activeId}
                  onClick={() => openConversation(conversation.id)}
                />
              ))
            ) : (
              <div className="px-4 py-10 text-center">
                <Search size={24} className="mx-auto text-slate-300" />

                <p className="mt-3 text-xs text-slate-500">
                  No conversations found.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar Footer */}
          <div className="border-t border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <Circle size={10} className="fill-emerald-500 text-emerald-500" />

              <span className="text-[11px] text-slate-500">
                Workspace messages
              </span>
            </div>
          </div>
        </aside>

        {/* Chat Area */}
        <div
          className={`min-h-0 min-w-0 flex-col ${
            showMobileChat ? "flex" : "hidden lg:flex"
          }`}
        >
          {/* Chat Header */}
          <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setShowMobileChat(false)}
                aria-label="Back to conversations"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
              >
                <ArrowLeft size={18} />
              </button>

              <div className="relative shrink-0">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white ${activeConversation.color}`}
                >
                  {activeConversation.avatar}
                </div>

                {activeConversation.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                )}
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-sm font-bold text-slate-800">
                  {activeConversation.name}
                </h2>

                <p className="mt-1 truncate text-[11px] text-slate-500">
                  {activeConversation.online ? "Online" : "Offline"} ·{" "}
                  {activeConversation.role}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() =>
                  alert("Voice calling will require a calling service.")
                }
                aria-label="Voice call"
                className="hidden rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600 sm:block"
              >
                <Phone size={18} />
              </button>

              <button
                type="button"
                onClick={() =>
                  alert("Video calling will require a video service.")
                }
                aria-label="Video call"
                className="hidden rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600 sm:block"
              >
                <Video size={18} />
              </button>

              <button
                type="button"
                onClick={() => setShowConversationInfo((previous) => !previous)}
                aria-label="Conversation details"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600"
              >
                <MoreVertical size={19} />
              </button>
            </div>
          </header>

          {/* Project Information */}
          {showConversationInfo && (
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-blue-100 bg-blue-50 px-5 py-3">
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-wide text-blue-500">
                  Related project
                </p>

                <p className="mt-1 truncate text-xs font-bold text-slate-700">
                  {activeConversation.project}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowConversationInfo(false)}
                aria-label="Close project details"
                className="rounded-lg p-1.5 text-slate-500 hover:bg-blue-100"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Messages */}
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto bg-slate-50/70 px-4 py-5 sm:px-6">
            <div className="flex justify-center">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-medium text-slate-400">
                Conversation history
              </span>
            </div>

            {activeConversation.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Composer */}
          <form
            onSubmit={sendMessage}
            className="shrink-0 border-t border-slate-200 bg-white p-3 sm:p-4"
          >
            <div className="flex items-end gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2 transition focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-50 sm:gap-3">
              <button
                type="button"
                onClick={() =>
                  alert(
                    "File uploads will be enabled when storage is connected.",
                  )
                }
                aria-label="Attach a file"
                className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
              >
                <Paperclip size={19} />
              </button>

              <button
                type="button"
                onClick={() =>
                  alert(
                    "Image sharing will be enabled when uploads are implemented.",
                  )
                }
                aria-label="Attach an image"
                className="hidden shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600 sm:block"
              >
                <ImageIcon size={19} />
              </button>

              <textarea
                rows={1}
                value={messageText}
                onChange={(event) => setMessageText(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey &&
                    !event.nativeEvent.isComposing
                  ) {
                    event.preventDefault();
                    event.currentTarget.form?.requestSubmit();
                  }
                }}
                placeholder="Type your message..."
                aria-label="Message"
                className="max-h-28 min-h-10 flex-1 resize-y bg-transparent px-1 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />

              <button
                type="submit"
                disabled={!messageText.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <Send size={17} />
              </button>
            </div>

            <div className="mt-2 flex items-center justify-between gap-2 px-1">
              <p className="text-[10px] text-slate-400">
                Press Enter to send · Shift + Enter for a new line
              </p>

              <p className="hidden text-[10px] text-slate-400 sm:block">
                ClientPortal Workspace
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
