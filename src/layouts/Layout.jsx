import React from "react";
import { useLocation } from "react-router-dom";
import SiteLayout from "./SiteLayout";
import DashboardLayout from "./DashboardLayout";

function Layout() {
  const location = useLocation().pathname;
  const is_dasboard = location.startsWith("/my-dashboard");
  return <>{is_dasboard ? <DashboardLayout /> : <SiteLayout/>}</>;
}

export default Layout;
