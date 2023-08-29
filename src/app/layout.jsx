import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/main.scss";
import "@/styles/responsive.scss";
import "@/styles/sliders.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import LoginPopup from "@/components/LoginPopup";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LoginPopup />
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
