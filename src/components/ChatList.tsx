import React, { useState } from "react";
import { Menu, Search, Plus, User, Bookmark, Users, Wallet, Settings, MoreVertical, ChevronRight } from "lucide-react";
import { DoubleCheck, SingleCheck } from "./icons";
import { DropdownContent, DropdownItem, DropdownSeparator } from "./ui/Dropdown/Dropdown";
import type { Chat } from "../types";

export interface ChatListProps {
  chats: Chat[];
  activeChatId: string;
  setActiveChatId: (id: string) => void;
}

export const ChatList: React.FC<ChatListProps> = ({
  chats,
  activeChatId,
  setActiveChatId,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("All");
  const [isSidebarMenuOpen, setIsSidebarMenuOpen] = useState(false);

  // Real-time Chat List Filtering
  const filteredChats = chats.filter((chat) => {
    const nameMatches = chat.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const messageMatches = chat.messages.some((m) =>
      m.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesQuery = nameMatches || messageMatches;

    // Optional tab-based categorization
    if (activeTab === "All") return matchesQuery;
    if (activeTab === "Video")
      return matchesQuery && (chat.id === "van_chay" || chat.id === "edit_f5");
    if (activeTab === "Demo 2")
      return matchesQuery && (chat.id === "ds_uid" || chat.id === "me");
    if (activeTab === "Demo 3")
      return matchesQuery && (chat.id === "giang" || chat.id === "c_tuyet");
    if (activeTab === "Demo 4")
      return matchesQuery && chat.id.startsWith("deleted_");
    if (activeTab === "Demo 6") return matchesQuery && chat.id === "van_chay";

    return matchesQuery;
  });

  return (
    <div className="w-[360px] md:w-[380px] bg-white rounded-2xl shadow-lg flex flex-col flex-shrink-0 overflow-hidden">
      {/* Top Header */}
      <div className="p-3 pb-2 flex flex-col gap-2.5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setIsSidebarMenuOpen(!isSidebarMenuOpen)}
              className={`p-2.5 rounded-full transition-colors cursor-pointer ${isSidebarMenuOpen ? "bg-gray-100 text-[#08060d]" : "text-gray-500 hover:bg-gray-100 hover:text-[#08060d]"}`}
            >
              <Menu size={20} className="stroke-[2.2]" />
            </button>
            <DropdownContent 
              isOpen={isSidebarMenuOpen} 
              onClose={() => setIsSidebarMenuOpen(false)}
              align="left"
            >
              <div className="px-3 py-2 flex items-center gap-3 mb-1 cursor-pointer hover:bg-black/5 rounded-xl transition-all">
                <div className="w-[34px] h-[34px] rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                   M
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-semibold text-[14.5px] text-gray-900 truncate leading-none">mantv02</span>
                </div>
              </div>
              <DropdownSeparator />
              <DropdownItem icon={<Plus size={18} />} label="Add Account" />
              <DropdownSeparator />
              <DropdownItem icon={<User size={18} />} label="My Profile" />
              <DropdownItem icon={<Bookmark size={18} />} label="Saved Messages" />
              <DropdownItem icon={<Users size={18} />} label="Contacts" />
              <DropdownItem icon={<Wallet size={18} />} label="Wallet" />
              <DropdownItem icon={<Settings size={18} />} label="Settings" />
              <DropdownItem 
                icon={<MoreVertical size={18} />} 
                label={
                  <div className="flex items-center justify-between w-full">
                    <span>More</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                } 
              />
            </DropdownContent>
          </div>
          <div className="relative flex-1">
            <Search
              className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#f1f5f9] text-gray-800 rounded-full py-2 pl-10 pr-4 text-[14.5px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3390ec] transition-all"
            />
          </div>
          {/* User Profile Avatar in Header */}
          <div className="w-[38px] h-[38px] rounded-full overflow-hidden border border-gray-100 cursor-pointer hover:opacity-90 flex-shrink-0 bg-blue-500 flex items-center justify-center text-white font-semibold">
            U
          </div>
        </div>

        {/* Folder Tabs with Pill Styles */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar text-[13.5px] font-semibold text-gray-500 py-1">
          {["All", "Video", "Demo 2", "Demo 3", "Demo 4", "Demo 6"].map(
            (tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${isActive ? "bg-[#e4efff] text-[#2f80ed]" : "hover:bg-gray-100 text-gray-500"}`}
                >
                  {tab}
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Chat List Scroll Container */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-100/50">
        {filteredChats.map((chat) => {
          const isSelected = chat.id === activeChatId;
          const lastMsg = chat.messages[chat.messages.length - 1];

          return (
            <div
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors relative ${isSelected ? "bg-[#3390ec] text-white" : "hover:bg-gray-50 bg-white"}`}
            >
              {/* Avatar / Icon */}
              <div className="relative flex-shrink-0">
                {chat.avatarUrl ? (
                  <img
                    src={chat.avatarUrl}
                    alt={chat.name}
                    className="w-[48px] h-[48px] rounded-full object-cover"
                  />
                ) : (
                  <div
                    className={`w-[48px] h-[48px] rounded-full flex items-center justify-center text-lg font-bold text-white uppercase ${chat.avatarBg || "bg-gray-400"}`}
                  >
                    {chat.avatarText}
                  </div>
                )}
                {chat.status === "online" && (
                  <div className="absolute bottom-0 right-0 w-[12px] h-[12px] bg-[#4ec163] border-2 border-white rounded-full"></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3
                    className={`font-semibold text-[14.5px] truncate pr-1 ${isSelected ? "text-white" : "text-gray-900"}`}
                  >
                    {chat.name}
                  </h3>
                  <span
                    className={`text-[12px] whitespace-nowrap ${isSelected ? "text-blue-100" : "text-gray-400"}`}
                  >
                    {lastMsg ? lastMsg.time : ""}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <p
                    className={`text-[13.5px] truncate pr-2 ${isSelected ? "text-blue-100" : "text-gray-500"}`}
                  >
                    {lastMsg ? (
                      lastMsg.sender === "me" ? (
                        <span>
                          <span className="opacity-95 mr-1">You:</span>
                          {lastMsg.text}
                        </span>
                      ) : (
                        lastMsg.text
                      )
                    ) : (
                      ""
                    )}
                  </p>

                  {/* Read icons */}
                  {lastMsg && lastMsg.sender === "me" && (
                    <span className="flex-shrink-0">
                      {lastMsg.read ? (
                        <DoubleCheck
                          className={
                            isSelected ? "text-white" : "text-[#4ec163]"
                          }
                        />
                      ) : (
                        <SingleCheck
                          className={
                            isSelected ? "text-white" : "text-gray-400"
                          }
                        />
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {filteredChats.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm">
            No chats found
          </div>
        )}
      </div>
    </div>
  );
};
