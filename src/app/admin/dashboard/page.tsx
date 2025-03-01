import {
  AdminDashboardLayout,
  AdminMainDashboard,
} from "@/components/mainComponents/Dashboard/Admin";

const dashboard = () => {
  return (
    <AdminDashboardLayout>
      <AdminMainDashboard />
    </AdminDashboardLayout>
  );
};

export default dashboard;
