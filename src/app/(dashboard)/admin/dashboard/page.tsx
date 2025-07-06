import { AdminMainDashboard } from "@/components/mainComponents/Dashboard/Admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};
const dashboard = () => {
  return <AdminMainDashboard />;
};

export default dashboard;
