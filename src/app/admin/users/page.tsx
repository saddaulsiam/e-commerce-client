import {
  AdminAllUsers,
  AdminDashboardLayout,
} from "../../../components/mainComponents/Dashboard/Admin";

const users = () => {
  return (
    <AdminDashboardLayout>
      <AdminAllUsers />
    </AdminDashboardLayout>
  );
};

export default users;
