import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Clock,
  Smile,
  User,
  Cat,
  Apple,
  Trophy,
  Car,
  Lightbulb,
  Hash,
  Flag,
  Search,
} from "lucide-react";
import emojiDataRaw from "./picker-emojis.json";

interface EmojiItem {
  emoji: string;
  name: string;
  codePoint: string;
  relativePath: string;
}

interface EmojiData {
  Smileys: EmojiItem[];
  People: EmojiItem[];
  "Animal-Natural": EmojiItem[];
  "Food-Drink": EmojiItem[];
  Activity: EmojiItem[];
  "Travel-Places": EmojiItem[];
  Objects: EmojiItem[];
  Symbols: EmojiItem[];
  Flags: EmojiItem[];
}

const emojiData: EmojiData = emojiDataRaw;

const TABS = [
  { id: "Recent", icon: Clock, label: "Gần đây" },
  { id: "Smileys", icon: Smile, label: "Biểu cảm" },
  { id: "People", icon: User, label: "Con người" },
  { id: "Animal-Natural", icon: Cat, label: "Động vật" },
  { id: "Food-Drink", icon: Apple, label: "Ẩm thực" },
  { id: "Activity", icon: Trophy, label: "Giải trí" },
  { id: "Travel-Places", icon: Car, label: "Du lịch" },
  { id: "Objects", icon: Lightbulb, label: "Đồ vật" },
  { id: "Symbols", icon: Hash, label: "Ký hiệu" },
  { id: "Flags", icon: Flag, label: "Lá cờ" },
];

export interface EmojiPickerProps {
  onSelectEmoji: (emoji: string) => void;
  onClose: () => void;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onSelectEmoji,
  onClose,
}) => {
  const pickerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Smileys");
  const [recentEmojis, setRecentEmojis] = useState<EmojiItem[]>([]);

  // Load recent emojis from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("telegram-clone-recent-emojis");
      if (saved) {
        setRecentEmojis(JSON.parse(saved) as EmojiItem[]);
      } else {
        // Default popular emojis
        const defaults: EmojiItem[] = [
          { emoji: "😂", name: "face with tears of joy", codePoint: "1f602", relativePath: "Smileys/1f602.webp" },
          { emoji: "👍", name: "thumbs up", codePoint: "1f44d", relativePath: "People/1f44d.webp" },
          { emoji: "❤️", name: "red heart", codePoint: "2764", relativePath: "Symbols/2764.webp" },
          { emoji: "🔥", name: "fire", codePoint: "1f525", relativePath: "Animal-Natural/1f525.webp" },
          { emoji: "🎉", name: "party popper", codePoint: "1f389", relativePath: "Activity/1f389.webp" },
          { emoji: "😆", name: "grinning squinting face", codePoint: "1f606", relativePath: "Smileys/1f606.webp" },
          { emoji: "🤣", name: "rolling on the floor laughing", codePoint: "1f923", relativePath: "Smileys/1f923.webp" },
          { emoji: "😊", name: "smiling face with smiling eyes", codePoint: "1f60a", relativePath: "Smileys/1f60a.webp" },
        ];
        setRecentEmojis(defaults);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Failed to load recent emojis", e);
    }
  }, []);

  // Handle click outside to close the picker
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSelectEmoji = (item: EmojiItem) => {
    // Call parent select
    onSelectEmoji(item.emoji);
    
    // Update recents
    const updated = [item, ...recentEmojis.filter((x) => x.emoji !== item.emoji)].slice(0, 32);
    setRecentEmojis(updated);
    localStorage.setItem("telegram-clone-recent-emojis", JSON.stringify(updated));
  };

  // Perform search filter
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase().trim();
    const results: EmojiItem[] = [];
    
    const categories: (keyof EmojiData)[] = [
      "Smileys",
      "People",
      "Animal-Natural",
      "Food-Drink",
      "Activity",
      "Travel-Places",
      "Objects",
      "Symbols",
      "Flags",
    ];

    for (const cat of categories) {
      const list = emojiData[cat];
      for (const item of list) {
        if (item.name.toLowerCase().includes(query)) {
          results.push(item);
          if (results.length >= 120) break; // cap search results for performance
        }
      }
      if (results.length >= 120) break;
    }
    return results;
  }, [searchQuery]);

  // Determine current items to render
  const currentItems = useMemo(() => {
    if (searchResults !== null) return searchResults;
    if (activeTab === "Recent") return recentEmojis;
    return emojiData[activeTab as keyof EmojiData] || [];
  }, [activeTab, searchResults, recentEmojis]);

  return (
    <div
      ref={pickerRef}
      className="absolute bottom-[calc(100%+12px)] left-0 w-[350px] h-[400px] bg-white rounded-2xl shadow-xl border border-gray-200/50 flex flex-col overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 duration-200 select-none"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Search Input */}
      <div className="px-3 pt-3 pb-2 border-b border-gray-100 flex items-center gap-2">
        <div className="flex-1 bg-gray-100 rounded-lg px-2.5 py-1.5 flex items-center gap-2">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm biểu tượng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Category Tabs */}
      {!searchQuery && (
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-100 overflow-x-auto scrollbar-none flex-shrink-0">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                title={tab.label}
                onClick={() => setActiveTab(tab.id)}
                className={`p-1.5 rounded-lg transition-all flex-shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-[#e4efff] text-[#3390ec]"
                    : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                }`}
              >
                <Icon size={18} className="stroke-[2]" />
              </button>
            );
          })}
        </div>
      )}

      {/* Emoji Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 min-h-0 custom-scrollbar">
        {searchQuery && (
          <div className="text-xs font-semibold text-gray-400 mb-2.5 uppercase tracking-wider">
            Kết quả tìm kiếm ({currentItems.length})
          </div>
        )}
        
        {!searchQuery && (
          <div className="text-xs font-semibold text-gray-400 mb-2.5 uppercase tracking-wider">
            {TABS.find((t) => t.id === activeTab)?.label}
          </div>
        )}

        {currentItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-sm text-gray-400 pt-8">
            Không tìm thấy biểu tượng nào
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-2.5">
            {currentItems.map((item) => (
              <button
                key={item.codePoint}
                type="button"
                onClick={() => handleSelectEmoji(item)}
                className="aspect-square flex items-center justify-center p-1 rounded-lg hover:bg-gray-100 transition-all active:scale-90 cursor-pointer"
                title={item.name}
              >
                <img
                  src={`/emoji/${item.relativePath}`}
                  alt={item.emoji}
                  className="w-7 h-7 object-contain select-none pointer-events-none"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to text rendering if the Noto image fails to load
                    const target = e.currentTarget;
                    const parent = target.parentElement;
                    if (parent) {
                      const span = document.createElement("span");
                      span.className = "text-xl leading-none select-none";
                      span.innerText = item.emoji;
                      parent.replaceChild(span, target);
                    }
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
