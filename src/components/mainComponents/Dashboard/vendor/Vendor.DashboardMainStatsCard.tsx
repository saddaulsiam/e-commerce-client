import { ReactNode } from "react";
import { FiArrowUpRight } from "react-icons/fi";

interface TProps {
  title: string;
  value: string | number;
  trend: string;
  positive: boolean;
  icon: ReactNode;
  color: string;
}

const DashboardMainStatsCard = ({
  title,
  value,
  trend,
  positive,
  icon,
  color,
}: TProps) => (
  <div
    className={`${color} rounded-2xl p-6 text-white transition-transform duration-500 hover:scale-[1.02]`}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium opacity-90">{title}</p>
        <p className="mt-2 text-3xl font-bold">{value}</p>
      </div>
      <div className="rounded-xl bg-white bg-opacity-20 p-3">{icon}</div>
    </div>
    <div className="mt-4 flex items-center">
      <span
        className={`text-sm ${positive ? "text-green-100" : "text-red-100"}`}
      >
        {positive ? "+" : "-"}
        {trend}
      </span>
      <FiArrowUpRight
        className={`ml-2 ${positive ? "text-green-100" : "text-red-100"}`}
      />
    </div>
  </div>
);

export default DashboardMainStatsCard;
