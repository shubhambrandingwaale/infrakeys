"use client";
import React from "react";
import LoginPopup from "./LoginPopup";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  console.log(pathname);
  return (
    <html lang="en">
      <body>
        <LoginPopup />
        {!isAdminPage && <Header />}
        {children}
        {!isAdminPage && <Footer />}
        <Toaster />
      </body>
    </html>
  );
}
