import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' }); // Added variable option

export const metadata = {
  title: "MAAN - AI Chatbot",
  description: "Inspired by Courage the cowardly dog's computer interactions",
  // You can add more metadata here for better SEO
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* You can add additional meta tags here */}
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
