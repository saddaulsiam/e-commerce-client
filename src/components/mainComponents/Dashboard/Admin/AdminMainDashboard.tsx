import {
  Bar,
  Pie,
  Cell,
  Area,
  YAxis,
  XAxis,
  Tooltip,
  BarChart,
  PieChart,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";
import { toast } from "react-toastify";
import { FaUsers } from "react-icons/fa";
import { BiUpArrowAlt } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { BsEye, BsFillCreditCardFill } from "react-icons/bs";

// local
import { useGetAllUsersQuery } from "../../../../redux/features/auth/customer/cusAuthApi";

const AreaChartData = [
  {
    name: "Jan",
    uv: 5000,
    pv: 5000,
  },
  {
    name: "Feb",
    uv: 2000,
    pv: 1000,
  },
  {
    name: "Mar",
    uv: 5000,
    pv: 5000,
  },
  {
    name: "Apr",
    uv: 3000,
    pv: 2000,
  },
  {
    name: "May",
    uv: 5000,
    pv: 5000,
  },
  {
    name: "Jun",
    uv: 3000,
    pv: 5000,
  },
  {
    name: "Jul",
    uv: 3490,
    pv: 4300,
  },
  {
    name: "Aug",
    uv: 3490,
    pv: 4300,
  },
  {
    name: "Sep",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Oct",
    uv: 3490,
    pv: 4300,
  },
  {
    name: "Nov",
    uv: 1000,
    pv: 6000,
  },
  {
    name: "Dev",
    uv: 4000,
    pv: 5500,
  },
];

const LineChartData = [
  {
    name: "S",
    pv: 2400,
  },
  {
    name: "S",
    pv: 1398,
  },
  {
    name: "M",
    pv: 9800,
  },
  {
    name: "T",
    pv: 3908,
  },
  {
    name: "W",
    pv: 4800,
  },
  {
    name: "T",
    pv: 3800,
  },
  {
    name: "F",
    pv: 4300,
  },
];

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminMainDashboard = () => {
  const { data: userData } = useGetAllUsersQuery({
    limit: 3,
    page: 1,
  });
  return (
    <>
      {/* Card */}
      <section className="my-5 mx-10 grid grid-cols-4 gap-6">
        <div className="h-40 w-full rounded bg-primary py-5 px-10 shadow-md">
          <div className="flex items-center justify-between">
            <p className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-600">
              <BsEye className="text-2xl text-white" />
            </p>
            <p className="font-serif text-xl font-semibold italic text-white">
              Visitors
            </p>
          </div>
          <div className="mt-3 text-3xl font-bold text-white">$3.456K</div>
          <div className="flex justify-between">
            <p className="text-my-gray-100">Total views</p>
            <p className="flex items-center text-success">
              0.43%
              <BiUpArrowAlt className="text-2xl" />
            </p>
          </div>
        </div>
        <div className="h-40 w-full rounded bg-primary py-5 px-10 shadow-md">
          <div className="flex items-center justify-between">
            <p className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-600">
              <FiShoppingCart className="text-xl text-white" />
            </p>
            <p className="font-serif text-xl font-semibold italic text-white">
              Total Orders
            </p>
          </div>
          <div className="mt-3 text-3xl font-bold text-white">$3.456K</div>
          <div className="flex justify-between">
            <p className="text-my-gray-100">Total views</p>
            <p className="flex items-center text-success">
              0.43%
              <BiUpArrowAlt className="text-2xl" />
            </p>
          </div>
        </div>
        <div className="h-40 w-full rounded bg-primary py-5 px-10 shadow-md">
          <div className="flex items-center justify-between">
            <p className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-600">
              <BsFillCreditCardFill className="text-2xl text-white" />
            </p>
            <p className="font-serif text-xl font-semibold italic text-white">
              Sale
            </p>
          </div>
          <div className="mt-3 text-3xl font-bold text-white">$3.456K</div>
          <div className="flex justify-between">
            <p className="text-my-gray-100">Total views</p>
            <p className="flex items-center text-success">
              0.43%
              <BiUpArrowAlt className="text-2xl" />
            </p>
          </div>
        </div>
        <div className="h-40 w-full rounded bg-primary py-5 px-10 shadow-md">
          <div className="flex items-center justify-between">
            <p className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-600">
              <FaUsers className="text-2xl text-white" />
            </p>
            <p className="font-serif text-xl font-semibold italic text-white">
              Users
            </p>
          </div>
          <div className="mt-3 text-3xl font-bold text-white">$3.456K</div>
          <div className="flex justify-between">
            <p className="text-my-gray-100">Total views</p>
            <p className="flex items-center text-success">
              0.43%
              <BiUpArrowAlt className="text-2xl" />
            </p>
          </div>
        </div>
      </section>
      {/* Chart */}
      <section className="my-5 mx-10 grid grid-cols-3 gap-6 pt-5">
        <div className="col-span-3 h-96 bg-white p-4 lg:col-span-2">
          <div className="flex justify-between pb-6">
            <div className="flex gap-10">
              <div>
                <p className="flex items-center gap-1 text-lg text-[#8884d8]">
                  <span className="h-3 w-3 rounded-full bg-[#8884d8] ring-2 ring-[#8884d8] ring-offset-2" />
                  <span htmlFor="revenue">Total Revenue</span>
                </p>
                <p className="pl-6 text-base text-my-gray-100">
                  12.04.2022 - 12.05.2022
                </p>
              </div>
              <div>
                <p className="flex items-center gap-1 text-lg text-[#82ca9d]">
                  {/* <input
                    className="radio radio-sm checked:bg-[#82ca9d]"
                    checked
                    type="radio"
                    name="revenue"
                    id="revenue"
                  /> */}
                  <span className="h-3 w-3 rounded-full bg-[#82ca9d] ring-2 ring-[#82ca9d] ring-offset-2" />
                  <label htmlFor="revenue">Total Revenue</label>
                </p>
                <p className="pl-6 text-base text-my-gray-100">
                  12.04.2022 - 12.05.2022
                </p>
              </div>
            </div>
            <div className="btn-group">
              <button className="btn btn-active btn-sm">Day</button>
              <button className="btn btn-sm">Week</button>
              <button className="btn btn-sm">Month</button>
            </div>
          </div>

          <ResponsiveContainer width="100%" height="80%">
            <AreaChart
              width={500}
              height={400}
              data={AreaChartData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="pv"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="col-span-3 h-96 rounded bg-white p-3 lg:col-span-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={LineChartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="pv" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
      {/* Chart */}
      <section className="my-5 mx-10 grid grid-cols-3 gap-6 pt-5">
        {/* Pie Chart */}
        <div className="col-span-3 h-96 bg-white p-4 lg:col-span-1">
          <div className="flex items-center justify-between pb-6">
            <div className="flex gap-10">
              <p className="text-xl font-bold text-primary">
                Visitors Analytics
              </p>
            </div>
            <div className="btn-group">
              <button className="btn btn-active btn-sm">Monthly</button>
              <button className="btn btn-sm">Yearly</button>
            </div>
          </div>
          <ResponsiveContainer height="60%" width="100%">
            <PieChart>
              <Pie
                data={data01}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
              >
                {data01.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="pt-4">
            <ul className="gap-y- grid grid-cols-2 gap-x-10 text-sm  text-my-gray-100">
              <li className="flex justify-between">
                <span>Desktop</span>
                <span className="text-[#0088FE]">65%</span>
              </li>
              <li className="flex justify-between">
                <span>Tablet </span>
                <span className="text-[#00C49F]">34%</span>
              </li>
              <li className="flex justify-between">
                <span>Mobile</span>
                <span className="text-[#FFBB28]">45%</span>
              </li>
              <li className="flex justify-between">
                <span>Unknown</span>
                <span className="text-[#FF8042]">12%</span>
              </li>
            </ul>
          </div>
        </div>
        {/* User */}
        <div className="col-span-3 h-96  bg-white p-4 lg:col-span-2">
          <div className="flex items-center justify-between pb-6">
            <div className="">
              <p className="text-xl font-bold text-primary">
                Visitors Analytics
              </p>
            </div>
            <div className="">
              <p className="cursor-pointer text-base text-my-gray-100">
                See All
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Id</th>
                </tr>
              </thead>
              <tbody>
                {userData?.data?.users
                  .map(({ displayName, email, role, _id, photoURL }, i) => (
                    <tr key={i}>
                      <th>
                        <Image
                          height={50}
                          width={50}
                          src={
                            photoURL ||
                            "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                          }
                          alt="user image"
                          className="rounded-full object-cover"
                          priority
                        />
                      </th>
                      <td>{displayName}</td>
                      <td>{email}</td>
                      <td>{role}</td>
                      <td
                        onClick={() => {
                          navigator.clipboard.writeText(_id).then(() => {
                            toast.success("copied");
                          });
                        }}
                        className="cursor-pointer"
                        title="copy"
                      >
                        {_id}
                      </td>
                    </tr>
                  ))
                  .reverse()}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminMainDashboard;
