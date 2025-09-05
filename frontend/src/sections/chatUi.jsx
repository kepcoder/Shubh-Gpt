import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X, MoreVertical, Send, Plus } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { io } from "socket.io-client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ChatUi() {
  const [socket, setSocket] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: { message: "" },
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newChatName, setNewChatName] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState({}); // FIXED: should be object not string
  const messagesRef = useRef(null);

  const activeChatName = chats.find((c) => c.id === activeChat)?.name || "";

  // Handle Send Message
  const handleSend = (data) => {
    const content = (data?.message || "").trim();
    if (!content) return;

    socket.emit("user-message", {
      chat: activeChat,
      content: content,
    });
    setMessages((prev) => ({
      ...prev,
      [activeChat]: [
        ...(prev[activeChat] || []),
        { role: "user", text: content },
      ],
    }));

    setIsTyping(true);


    reset();
    setTimeout(() => setValue("message", ""), 0);
  };

  // handle New Chat Create
  const handleAddChat = async () => {
    if (!newChatName.trim()) return;
    try {
      await axios.post(
        "http://localhost:3000/user/chat",
        { title: newChatName },
        { withCredentials: true }
      );
      fetchChat();
    } catch (error) {
      console.error(error);
    }

    setNewChatName("");
    setIsDialogOpen(false);
  };

  // Reusable fetchChat function
  const fetchChat = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/chat", {
        withCredentials: true,
      });

      const chatTitle = res.data.chats.map((elem) => ({
        id: elem._id,
        name: elem.title,
      }));
      setChats(chatTitle);
      setActiveChat(chatTitle[0]?.id);
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  // Reusable FetchMessages function
  const fetchMessages = useCallback(async (chatId) => {
    try {
      const res = await axios.get(`http://localhost:3000/user/${chatId}`, {
        withCredentials: true,
      });
      res.data.map((elem) => {
        setMessages((prev) => ({
          ...prev,
          [chatId]: [
            ...(prev[chatId] || []),
            { role: elem.role, text: elem.content },
          ],
        }));
      });
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  // 🔄 Fetch Chats and initialize socket server
  useEffect(() => {
    fetchChat();
    try {
      const tempSocket = io("http://localhost:3000", {
        withCredentials: true,
      });
      tempSocket.on("ai-response", (data) => {
        const { chatId, content } = data;
        setMessages((prev) => ({
          ...prev,
          [chatId]: [...(prev[chatId] || []), { role: "model", text: content }],
        }));

        setIsTyping(false);

      });
      setSocket(tempSocket);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (activeChat) {
      fetchMessages(activeChat);
    }
  }, [activeChat, fetchMessages]);

  // auto-scroll to bottom whenever messages for activeChat change
  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;
    // small timeout to wait for render
    const t = setTimeout(() => {
      el.scrollTop = el.scrollHeight;
    }, 50);
    return () => clearTimeout(t);
  }, [messages, activeChat]);

  return (
    <div className="flex h-screen overflow-x-hidden bg-[#212121] text-slate-900 dark:text-slate-100 sidebar-scroll">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#212121] text-white transform 
        transition-transform duration-300 ease-in-out 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:relative md:translate-x-0`}
        aria-label="sidebar"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <h2 className="text-lg font-semibold">ShubhGpt</h2>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-2">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center w-full gap-2 p-2 mb-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            <Plus size={18} /> New Chat
          </button>
        </div>

        {/* Chat List */}
        <div className="p-2 space-y-2 overflow-y-auto max-h-[calc(100vh-120px)] sidebar-scroll">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`flex items-center justify-between p-2 rounded cursor-pointer 
                hover:bg-gray-800 ${
                  activeChat === chat.id ? "bg-gray-800" : ""
                }`}
            >
              <span>{chat.name}</span>
              <MoreVertical size={18} />
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1 relative w-full ">
        {/* Topbar (Mobile) */}
        <div className="flex items-center justify-between p-3 border-b md:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h2 className="font-semibold">{activeChatName}</h2>
          <div />
        </div>

        {/* Chat Name Top (Desktop) */}
        <div className="hidden md:block p-3 border-b font-semibold">
          {activeChatName}
        </div>

        {/* Chat messages */}
<div
  ref={messagesRef}
  className="flex-1 overflow-y-auto p-2 md:p-4 pt-5 pb-24"
>
  {(messages[activeChat] || []).length === 0 ? (
    // 👉 Intro screen
    <div className="h-full flex flex-col items-center justify-center text-center text-slate-600 dark:text-slate-300">
      <h1 className="text-2xl font-bold mb-2">Shubh GPT</h1>
      <p>Best for coders, Content Creators & researchers</p>
    </div>
  ) : (
    <>
      {(messages[activeChat] || []).map((msg, i) => (
        <div
          key={i}
          className={`mb-4 px-2 flex w-full ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`p-3 rounded-lg break-words whitespace-pre-wrap
              ${
                msg.role === "user"
                  ? "bg-emerald-600 text-white w-fit max-w-[75%] xs:max-w-[85%] sm:max-w-2xl"
                  : "bg-slate-900 text-slate-100 w-full sm:w-fit sm:max-w-2xl"
              }`}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline ? (
                    <div className="w-full max-w-full overflow-x-auto rounded-lg my-2 text-sm md:text-base">
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match ? match[1] : "javascript"}
                        PreTag="div"
                        wrapLongLines={true}
                        customStyle={{
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                        }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code className="bg-gray-800 px-1 py-0.5 rounded text-xs md:text-sm">
                      {children}
                    </code>
                  );
                },
              }}
            >
              {msg.text}
            </ReactMarkdown>
          </div>
        </div>
      ))}

      {/* 👉 Typing Indicator */}
      {isTyping && activeChat && (
        <div className="mb-4 px-2 flex w-full justify-start">
          <div className="bg-slate-900 text-slate-100 p-3 rounded-lg flex items-center space-x-1">
            <h2>Thinking</h2>
            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
          </div>
        </div>
      )}
    </>
  )}
</div>


        {/* Chat input (Always at bottom) */}
        <div className="sticky bottom-0 left-0 right-0 flex justify-center px-4 pb-4 bg-[#212121]">
          <form
            onSubmit={handleSubmit(handleSend)}
            className="flex items-center gap-2 w-full max-w-3xl p-3 bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-200 dark:border-slate-700"
          >
            <textarea
              {...register("message")}
              rows={1}
              placeholder="Start the conversation... (Shift+Enter for newline)"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(handleSend)();
                }
              }}
              className="flex-1 resize-none bg-transparent outline-none p-2 rounded text-sm"
            />
            <button
              type="submit"
              className="p-2 bg-blue-600 rounded text-white"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Popup Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-lg shadow-lg p-6 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Create New Chat
            </Dialog.Title>
            <input
              type="text"
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
              placeholder="Enter chat name..."
              className="w-full border rounded-lg p-2 mb-4 dark:bg-slate-800 dark:border-slate-700"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAddChat}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
