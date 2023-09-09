import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/main.scss";
import "@/styles/responsive.scss";
import "@/styles/sliders.css";
import MainLayout from "@/components/MainLayout.1";
export default function RootLayout({ children }) {
  return <MainLayout children={children} />;
}
