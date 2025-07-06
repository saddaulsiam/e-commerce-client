import { AdminMainReports } from "@/components/mainComponents/Dashboard/Admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Reports",
};
const Reports = () => {
  return <AdminMainReports />;
};

export default Reports;
