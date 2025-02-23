import { AdminDashboardLayout } from "@/components/mainComponents/Dashboard/Admin";
import AdminMainDashboard from "@/components/mainComponents/Dashboard/Admin/Admin.Main.Dashboard";


const dashboard = () => {
  return (
    <div>
      <AdminDashboardLayout>
        <AdminMainDashboard />
      </AdminDashboardLayout>
    </div>
  );
};

export default dashboard;
