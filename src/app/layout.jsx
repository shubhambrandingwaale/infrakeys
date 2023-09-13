import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/main.scss";
import "@/styles/responsive.css";
import "@/styles/sliders.css";
import MainLayout from "@/components/MainLayout";
export default function RootLayout({ children }) {
  return <MainLayout children={children} />;
}
