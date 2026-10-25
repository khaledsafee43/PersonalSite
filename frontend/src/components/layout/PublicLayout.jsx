import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import { PortfolioProvider } from "../../context/PortfolioContext";

export default function PublicLayout() {
  return (
    <PortfolioProvider>
      <Header />
      <main><Outlet /></main>
      <Footer />
    </PortfolioProvider>
  );
}
