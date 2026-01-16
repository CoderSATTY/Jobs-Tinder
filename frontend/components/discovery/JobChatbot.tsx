"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Sparkles, RotateCcw, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { DatabaseJob } from "@/lib/resumeApi";

interface Message {
    role: "user" | "assistant";
    content: string;
}

interface JobChatbotProps {
    currentJob: DatabaseJob | null;
}

const BACKEND_URL = "http://localhost:8000";

const QUICK_PROMPTS = [
    "Am I a good fit for this role?",
    "What skills should I highlight?",
    "Help me prepare for an interview",
    "Draft a cover letter intro",
];

// Simple markdown to HTML converter
function formatMarkdown(text: string): string {
    return text
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^\* (.*$)/gm, '<li>$1</li>')
        .replace(/^- (.*$)/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br/>')
        .replace(/^(.*)$/, '<p>$1</p>')
        .replace(/<p><\/p>/g, '')
        .replace(/<p><br\/><\/p>/g, '');
}

export function JobChatbot({ currentJob }: JobChatbotProps) {
    const { getIdToken } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // New chat function
    const handleNewChat = () => {
        setMessages([]);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (messageText?: string) => {
        const text = messageText || input.trim();
        if (!text || !currentJob) return;

        const userMessage: Message = { role: "user", content: text };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        try {
            const token = await getIdToken();
            const response = await fetch(`${BACKEND_URL}/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    message: text,
                    job_id: currentJob.id,
                }),
            });

            if (!response.ok) throw new Error("Chat request failed");

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (!reader) throw new Error("No reader available");

            let fullResponse = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split("\n");

                for (const line of lines) {
                    if (line.startsWith("data: ")) {
                        const data = line.slice(6);
                        if (data === "[DONE]") continue;

                        try {
                            const parsed = JSON.parse(data);
                            if (parsed.text) {
                                fullResponse += parsed.text;
                                setMessages((prev) => {
                                    const newMessages = [...prev];
                                    newMessages[newMessages.length - 1] = {
                                        role: "assistant",
                                        content: fullResponse,
                                    };
                                    return newMessages;
                                });
                            }
                        } catch {
                            // Ignore parse errors
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                    role: "assistant",
                    content: "Sorry, I encountered an error. Please try again.",
                };
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (!currentJob) {
        return (
            <div className="h-full flex items-center justify-center text-white/40">
                <div className="text-center">
                    <Bot className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Select a job to start chatting</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-slate-800/30 rounded-l-2xl border border-slate-700/50 overflow-hidden">
            {/* Header */}
            <div className="p-3 border-b border-slate-700/50 bg-slate-800/50">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <Briefcase className="w-3.5 h-3.5 text-white" />
                            </div>
                            <span className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                                SwipeHire AI
                            </span>
                        </div>
                        <p className="text-xs text-white/50 truncate">
                            Discussing: {currentJob.title}
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleNewChat}
                        className="text-white/60 hover:text-white hover:bg-slate-700/50 h-8 px-2"
                    >
                        <RotateCcw className="w-3.5 h-3.5 mr-1" />
                        New Chat
                    </Button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                    <div className="space-y-4">
                        <div className="text-center text-white/40 text-sm py-8">
                            <Bot className="w-10 h-10 mx-auto mb-3 opacity-50" />
                            <p className="mb-4">Ask me anything about this job!</p>
                        </div>

                        {/* Quick prompts */}
                        <div className="grid grid-cols-2 gap-2">
                            {QUICK_PROMPTS.map((prompt) => (
                                <button
                                    key={prompt}
                                    onClick={() => handleSend(prompt)}
                                    className="p-3 text-left text-xs text-white/70 bg-slate-700/30 hover:bg-slate-700/50 rounded-xl border border-slate-600/30 transition-colors"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
                        >
                            {msg.role === "assistant" && (
                                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0 mt-1">
                                    <Bot className="w-4 h-4 text-indigo-400" />
                                </div>
                            )}
                            <div
                                className={`max-w-[85%] p-4 rounded-2xl text-sm ${msg.role === "user"
                                    ? "bg-indigo-600 text-white"
                                    : "bg-slate-700/50 text-white/90"
                                    }`}
                            >
                                {msg.content ? (
                                    msg.role === "assistant" ? (
                                        <div
                                            className="prose prose-invert prose-sm max-w-none
                                                prose-p:my-2 prose-p:leading-relaxed
                                                prose-ul:my-2 prose-ul:pl-4
                                                prose-li:my-0.5
                                                prose-strong:text-indigo-300 prose-strong:font-semibold
                                                prose-headings:text-white prose-headings:font-bold prose-headings:mt-3 prose-headings:mb-2
                                                [&>*:first-child]:mt-0"
                                            dangerouslySetInnerHTML={{
                                                __html: formatMarkdown(msg.content)
                                            }}
                                        />
                                    ) : (
                                        msg.content
                                    )
                                ) : (
                                    <Loader2 className="w-4 h-4 animate-spin text-white/50" />
                                )}
                            </div>
                            {msg.role === "user" && (
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                                    <User className="w-4 h-4 text-emerald-400" />
                                </div>
                            )}
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-slate-700/50 bg-slate-800/50">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                    }}
                    className="flex gap-2"
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about this job..."
                        className="flex-1 bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"
                        size="icon"
                        disabled={isLoading || !input.trim()}
                        className="bg-indigo-600 hover:bg-indigo-700 rounded-xl h-10 w-10"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Send className="w-4 h-4" />
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}
