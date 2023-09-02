import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/main.scss";
import "@/styles/responsive.scss";
import "@/styles/sliders.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import LoginPopup from "@/components/LoginPopup";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/MainLayout";

export default function RootLayout({ children }) {
  return <MainLayout children={children} />;
}
