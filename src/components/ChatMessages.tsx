import React, { useRef, useEffect } from "react";
import { DoubleCheck, SingleCheck } from "./icons";
import { isEmojiOnly } from "../utils";
import type { Message } from "../types";

export interface ChatMessagesProps {
  messages: Message[];
  activeChatId: string;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  activeChatId,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChatId, messages]);

  return (
    <div className="flex-1 bg-transparent p-4 flex flex-col overflow-y-auto min-h-0">
      <div className="flex flex-col gap-2 mt-auto">
        {messages.map((message) => {
          const isMe = message.sender === "me";
          const isSingleEmoji = isEmojiOnly(message.text);

          if (isSingleEmoji) {
            return (
              <div
                key={message.id}
                className={`flex w-full mb-2 ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div className="relative group max-w-[70%] select-text">
                  {/* Big emoji size */}
                  <span className="text-emoji leading-tight select-all filter drop-shadow-sm">
                    {message.text}
                  </span>

                  {/* Sub-label time overlay */}
                  <span className="absolute -bottom-1 -right-8 bg-black/35 backdrop-blur-xs text-white text-xs px-1.5 py-0.5 rounded-full select-none font-medium flex items-center gap-0.5">
                    {message.time}
                    {isMe &&
                      (message.read ? (
                        <DoubleCheck className="text-white w-3 h-3" />
                      ) : (
                        <SingleCheck className="text-white w-3 h-3" />
                      ))}
                  </span>
                </div>
              </div>
            );
          }

          return (
            <div
              key={message.id}
              className={`flex w-full mb-1 ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-3.5 py-1.5 relative shadow-xs text-base leading-[1.4] select-text break-words 
                  ${
                    isMe
                      ? "bg-[#eeffde] text-gray-900 rounded-2xl rounded-br-[4px]"
                      : "bg-white text-gray-900 rounded-2xl rounded-bl-[4px]"
                  }`}
              >
                <div className="pb-1.5 pr-12">{message.text}</div>

                {/* Timestamp + status */}
                <div
                  className={`absolute bottom-1 right-2.5 flex items-center gap-1 text-xs select-none ${isMe ? "text-[#53864a]" : "text-gray-400"}`}
                >
                  <span>{message.time}</span>
                  {isMe &&
                    (message.read ? (
                      <DoubleCheck className="text-[#53864a] w-[13px] h-[13px]" />
                    ) : (
                      <SingleCheck className="text-gray-400 w-[13px] h-[13px]" />
                    ))}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
