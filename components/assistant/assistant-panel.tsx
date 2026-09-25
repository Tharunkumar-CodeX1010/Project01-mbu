"use client";

import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui";
import { askTac, ASSISTANT_STATUS, type TacAnswer } from "@/lib/assistant";

interface Message {
  role: "user" | "tac";
  text: string;
  sources?: TacAnswer["sources"];
}

const GREETING: Message = {
  role: "tac",
  text: "I'm TAC — the table, conditioned. Ask what to cook, about a dish, a region, or a technique.",
};

export function AssistantPanel() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = (raw?: string) => {
    const question = (raw ?? input).trim();
    if (!question) return;
    const answer = askTac(question);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: question },
      { role: "tac", text: answer.answer, sources: answer.sources },
    ]);
    setInput("");
  };

  return (
    <div className="border-edge bg-surface shadow-card overflow-hidden rounded-lg">
      <div className="border-edge flex items-center justify-between gap-2 border-b px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="bg-accent text-accent-ink flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold">
            T
          </span>
          <div>
            <p className="text-ink text-sm font-semibold leading-tight">TAC concierge</p>
            <p className="text-ink-faint text-xs">deterministic answer card</p>
          </div>
        </div>
        <Badge variant="orange">MOCKED</Badge>
      </div>

      <div
        ref={listRef}
        aria-live="polite"
        className="scroll-soft h-[360px] space-y-3 overflow-y-auto px-5 py-4"
      >
        {messages.map((message, index) =>
          message.role === "user" ? (
            <div key={index} className="flex justify-end">
              <p className="bg-accent text-accent-ink max-w-[80%] rounded-2xl rounded-br-sm px-4 py-2 text-sm">
                {message.text}
              </p>
            </div>
          ) : (
            <div key={index} className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-edge bg-elevated px-4 py-2 text-sm">
                <p className="text-ink-soft leading-relaxed">{message.text}</p>
                {message.sources && message.sources.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {message.sources.map((source) => (
                      <a
                        key={source.href}
                        href={source.href}
                        className="bg-accent text-accent-ink rounded-full px-2.5 py-0.5 text-xs"
                      >
                        {source.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          )
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="border-edge flex gap-2 border-t px-5 py-3"
      >
        <label htmlFor="ask-tac" className="sr-only">
          Ask TAC
        </label>
        <input
          id="ask-tac"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Try “what should I cook tonight”"
          className="border-edge bg-surface focus:border-accent text-ink placeholder:text-ink-faint h-10 flex-1 rounded-lg border px-4 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
        />
        <button
          type="submit"
          className="bg-accent text-accent-ink hover:bg-accent-strong h-10 rounded-lg px-5 text-sm font-medium"
        >
          Ask
        </button>
      </form>
      <p className="text-ink-faint border-edge border-t px-5 py-2 text-[11px]">
        {ASSISTANT_STATUS}
      </p>
    </div>
  );
}