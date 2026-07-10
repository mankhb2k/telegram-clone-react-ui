# Telegram Clone React UI

A pixel-perfect, highly modular React implementation of the Telegram Desktop UI. Built with React (Vite), TypeScript, Lucide Icons, and styled with utility-first Tailwind CSS.

This project focuses on visual excellence, modular component architecture, and advanced UI interactions (such as concentric circular designs and scrolling transition states) modeled directly from the Telegram Desktop app.

## 🚀 Live Demo & Visuals

Here are some key design aesthetics implemented in this project:

- **Layered Card UI**: Panel background color of `#F4F4F5` with individual content sections isolated into rounded white cards (`bg-white rounded-3xl`).
- **Concentric Circular Layouts**: Precise geometric calculations applied to UI elements (Avatar wrapper, toggle switches, tab controls, dropdown hovers) to achieve mathematically concentric shapes.
- **Header Scroll States (3 States)**: Smooth transition of header title, borders, and close/back buttons dynamically computed based on the panel's scroll position.

---

## 🏗️ Architecture & Component Split

To keep code maintainable and extensible, the monolithic layout has been decoupled into dedicated components under `src/components/`:

1. **`App.tsx`**: Serves as the global State Manager and layout container.
2. **`ChatList.tsx`**: Left sidebar sidebar containing real-time search filtering, folder categorization tab groups, and the Hamburger dropdown menu.
3. **`ChatHeader.tsx`**: Floating pill-shaped header with concentric avatar placement, chat status details, and drop-down menu controls.
4. **`ChatMessages.tsx`**: Scrollable chat history window overlaying the green doodle wallpaper, handling bubble alignment, read receipts, and auto-scrolling.
5. **`ChatComposer.tsx`**: Text entry container equipped with attachment clips, emojis, and toggleable send/mic buttons.
6. **`UserInfo.tsx`**: Detailed right-hand slider displaying contact credentials, dynamic scroll-state headers, sticky navigation tabs, and shared media lists.
7. **`icons.tsx`**: Shared SVG definitions specifically designed to capture the unique geometry of Telegram's checkmarks, phone styles, and slash-share controls.
8. **`ui/Dropdown/Dropdown.tsx`**: A set of reusable dropdown components (`DropdownContent`, `DropdownItem`, `DropdownSeparator`) supporting animations, glassmorphism, and concentric hover states.
9. **`mockData.ts`**: Holds all static chat arrays and message threads.
10. **`types.ts`**: Centrally exports shared TypeScript interfaces (`Chat`, `Message`).

---

## 📐 Concentric Design Mathematics

Concentric geometry requires the outer border radius ($R$), the padding offset ($d$), and the inner border radius ($r$) to align around a single center point:
$$R = r + d$$

This formula has been strictly applied across the interface:
- **Chat Header**: Header Pill (`p-[7px]` padding, circular curves) wrapping a circular Avatar (`38px`).
- **Toggle Switches**: Track (`w-9 h-5`, 20px height) wrapping a circular thumb (`14px`) positioned at `top-[3px]` and `left-[3px]/[19px]` to maintain a exact `3px` offset on all margins.
- **Dropdown Items**: Dropdown panel (`rounded-[14px]` with `p-[4px]`) containing hover highlight items (`rounded-[10px]`) giving a perfect concentric curve layout ($14\text{px} - 4\text{px} = 10\text{px}$).

---

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone git@github.com:mankhb2k/telegram-clone-react-ui.git
   cd telegram-clone-react-ui
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```
