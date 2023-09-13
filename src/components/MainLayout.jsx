"use client";
import React from "react";
import LoginPopup from "./LoginPopup";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const register = pathname.startsWith("/login");
  const login = pathname.startsWith("/register");
  const otpverify = pathname.startsWith("/otpverify");
  console.log(pathname);
  return (
    <html lang="en">
      <body>
        <LoginPopup />
        {!isAdminPage && !register && !login && !otpverify && <Header />}
        {children}
        {!isAdminPage && !register && !login && !otpverify && <Footer />}
        <Toaster />
        <FloatingWhatsApp
          phoneNumber="123456789"
          accountName="Foo"
          notificationDelay={10}
          notification={true}
          notificationSound={true}
          onNotification
          chatMessage="Hello, How can i help you"
          statusMessage="Typically replies instantly"
          accountName="Ankit Goyal"
          phoneNumber="+918130376622"
          avatar="/icon.png"
        />
      </body>
    </html>
  );
}
