import { AdminSettings } from "@/components/mainComponents/Dashboard/Admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Setting",
};
export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Admin Panel – Settings
      </h1>
      <AdminSettings />
    </div>
  );
}
