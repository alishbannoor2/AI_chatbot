"use client";

import Image from "next/image";
import LandingPage from "./components/landingpage";
import ChatApp from "./components/landingpage"; // Adjust the path as needed

export default function Home() {
  return (
    <main className="flex flex-col h-screen bg-[#040d17] text-white">
      <nav className="flex justify-between items-center p-4">
      </nav>
      <div className="flex-grow overflow-hidden">
        <ChatApp />
      </div>
    </main>
  );
}
