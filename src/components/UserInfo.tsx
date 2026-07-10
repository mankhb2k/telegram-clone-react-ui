import React, { useState } from "react";
import { X, Pen, Bell, ArrowLeft } from "lucide-react";
import { PhoneIcon } from "./icons";
import type { Chat } from "../types";

export interface UserInfoProps {
  activeChat: Chat;
  setIsRightPanelOpen: (isOpen: boolean) => void;
  onToggleNotifications: () => void;
}

export const UserInfo: React.FC<UserInfoProps> = ({
  activeChat,
  setIsRightPanelOpen,
  onToggleNotifications,
}) => {
  const [activeMediaTab, setActiveMediaTab] = useState<string>("Media");
  const [scrollTop, setScrollTop] = useState<number>(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const isScrolled = scrollTop > 0;
  const isFullyScrolled = scrollTop >= 310;

  return (
    <div className="w-[22.5rem] lg:w-[28.125rem] h-full bg-[#f4f4f5] rounded-2xl shadow-lg flex flex-col flex-shrink-0 overflow-hidden animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div
        className={`h-14 px-4 flex items-center justify-between flex-shrink-0 bg-[#f4f4f5] transition-all duration-200 ${
          isScrolled && !isFullyScrolled
            ? "border-b border-gray-200/80 shadow-xs"
            : "border-b border-transparent"
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsRightPanelOpen(false)}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-all cursor-pointer"
          >
            {isFullyScrolled ? (
              <ArrowLeft size={20} className="stroke-[2.2]" />
            ) : (
              <X size={20} className="stroke-[2.2]" />
            )}
          </button>
          <h2 className="font-bold text-xl text-gray-900 transition-all duration-150">
            {isFullyScrolled ? activeMediaTab : "User Info"}
          </h2>
        </div>
        {!isFullyScrolled && (
          <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-all cursor-pointer">
            <Pen size={18} className="stroke-[2.2]" />
          </button>
        )}
      </div>

      <div
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto thin-scrollbar pb-3"
      >
        {/* Large Avatar & Contact Name */}
        <div className="flex flex-col items-center pt-2 pb-6">
          {activeChat.avatarUrl ? (
            <img
              src={activeChat.avatarUrl}
              alt={activeChat.name}
              className="w-[100px] h-[100px] rounded-full object-cover shadow-sm mb-3.5"
            />
          ) : (
            <div
              className={`w-[100px] h-[100px] rounded-full flex items-center justify-center text-3xl font-bold text-white uppercase shadow-sm mb-3.5 ${activeChat.avatarBg || "bg-gray-400"}`}
            >
              {activeChat.avatarText}
            </div>
          )}
          <h2 className="font-bold text-2xl text-gray-900 text-center px-4 leading-tight">
            {activeChat.name}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {activeChat.status}
          </p>
        </div>

        {/* Main Details (Phone & Notifications) */}
        <div className="bg-white rounded-3xl mx-3 mb-3 shadow-sm overflow-hidden py-1">
          {/* Phone Details Row */}
          <div className="flex items-center gap-5 px-5 py-3 hover:bg-gray-50/50 transition-colors cursor-pointer">
            <div className="flex-shrink-0">
              <PhoneIcon />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base text-gray-900 font-medium truncate">
                {activeChat.phone || "Hidden"}
              </p>
              <p className="text-sm text-gray-400 font-normal">Phone</p>
            </div>
          </div>

          {/* Notifications Row */}
          <div className="flex items-center justify-between px-5 py-3 hover:bg-gray-50/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-5 flex-1">
              <div className="flex-shrink-0 text-gray-400">
                <Bell size={20} className="stroke-[2]" />
              </div>
              <span className="text-base text-gray-800 font-medium">
                Notifications
              </span>
            </div>
            {/* Custom Toggle Switch to match Telegram style */}
            <div
              onClick={onToggleNotifications}
              className={`w-9 h-5 rounded-full relative transition-colors duration-200 cursor-pointer ${activeChat.notifications ? "bg-[#3390ec]" : "bg-gray-200"}`}
            >
              <div
                className={`absolute top-[3px] w-[14px] h-[14px] bg-white rounded-full shadow-sm transition-transform duration-200 ${activeChat.notifications ? "left-[19px]" : "left-[3px]"}`}
              />
            </div>
          </div>
        </div>

        {/* Shared Content Sub-tabs (Sticky) */}
        <div className="sticky top-0 bg-[#f4f4f5] pt-1 pb-3 z-10">
          <div className="bg-white rounded-full mx-3 shadow-sm flex gap-0.5 p-1 overflow-x-auto hide-scrollbar text-md font-semibold text-gray-500">
            {["Media", "Files", "Links", "Music", "GIF", "Voice"].map((tab) => {
              const isActive = activeMediaTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveMediaTab(tab)}
                  className={`px-4 py-1.5 rounded-full whitespace-nowrap cursor-pointer transition-colors ${
                    isActive
                      ? "bg-blue-light text-blue"
                      : "hover:text-gray-700 text-gray-400"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Wrapper (Centralized Scroll height) */}
        <div className="min-h-[calc(100vh-100px)] flex flex-col">
          {activeMediaTab === "Media" ? (
            activeChat.sharedMedia && activeChat.sharedMedia.length > 0 ? (
              <div className="grid grid-cols-3 gap-[2px] px-3">
                {activeChat.sharedMedia.map((url, idx) => (
                  <div
                    key={idx}
                    className="aspect-square bg-gray-100 overflow-hidden cursor-pointer hover:opacity-95 transition-opacity"
                  >
                    <img
                      src={url}
                      alt={`Shared ${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center flex-1 flex items-center justify-center text-gray-400 text-md">
                No shared media
              </div>
            )
          ) : (
            <div className="text-center flex-1 flex items-center justify-center text-gray-400 text-md">
              No shared {activeMediaTab.toLowerCase()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
