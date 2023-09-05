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
  const register = pathname.startsWith("/login");
  const login = pathname.startsWith("/register");
  console.log(pathname);
  return (
    <html lang="en">
      <body>
        <LoginPopup />
        {!isAdminPage && !register && !login && <Header />}
        {children}
        {!isAdminPage && !register && !login && <Footer />}
        <Toaster />
      </body>
    </html>
  );
}
