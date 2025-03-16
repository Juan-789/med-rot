// frontend/routes/Layout.tsx or similar
import React from "react";
import { MedChatBot } from "../components/MedChatBot.tsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
      
      {/* Chatbot sidebar */}
      <aside className="w-80 border-l bg-white shadow-inner">
        <MedChatBot />
      </aside>
    </div>
  );
}