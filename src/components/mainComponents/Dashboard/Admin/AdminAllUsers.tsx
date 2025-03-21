"use client";

import { Pagination } from "@/components/sharedComponents";
import { Loading } from "@/components/sharedComponents/loader";
import { Button } from "@/components/ui/button";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { TUser } from "@/types/common";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const AdminAllUsers = () => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);

  const { data: usersData, isLoading } = useGetAllUsersQuery({
    limit: 8,
    page: currentPage,
  });

  return (
    <div className="container overflow-x-auto">
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Status</th>
                <th>Verify</th>
                <th>User Id</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {usersData?.data?.users?.map((user: TUser) => (
                <tr key={user?._id}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="avatar">
                      <Image
                        className="rounded-lg"
                        src={
                          user?.profile?.photo ||
                          "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                        }
                        alt="user photo"
                        height="35"
                        width="35"
                        priority
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      <div className="text-sm opacity-50">{user.role}</div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    {user.profile.address.length > 0 ? (
                      <>
                        {user.profile.address[0].address}{" "}
                        {user.profile.address[0]?.area}
                        <br />
                        {user.profile.address[0]?.city}{" "}
                        {user.profile.address[0]?.street}
                      </>
                    ) : (
                      "Address not added"
                    )}
                  </td>
                  <td>{user.status}</td>
                  <td></td>
                  <td
                    onClick={() => {
                      navigator.clipboard.writeText(user._id).then(() => {
                        toast.success("copied");
                      });
                    }}
                    className="cursor-pointer"
                    title="copy"
                  >
                    {user?._id.slice(0, 5)}...{user?._id.slice(19, 30)}
                  </td>
                  <td>
                    <Button
                      onClick={() => router.push(`/admin/users/${user._id}`)}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <th>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={usersData?.data?.page}
                    onPageChange={setCurrentPage}
                  />
                </th>
                <th></th>
                <th></th>
                <th></th>
                <th>
                  {usersData?.data?.users?.length} items in page {currentPage} (
                  total
                  {usersData?.data?.total} items)
                </th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </>
      )}
    </div>
  );
};

export default AdminAllUsers;
