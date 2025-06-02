import { BiUpArrowAlt } from "react-icons/bi";

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: string;
}) => (
  <div
    className="h-40 w-full rounded-lg p-6 shadow-md"
    style={{ backgroundColor: color }}
  >
    <div className="flex items-center justify-between">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/10">
        <Icon className="text-2xl text-white" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    <div className="mt-4 text-3xl font-bold text-white">{value}</div>
    <div className="flex justify-between text-sm">
      <span className="text-white/80">vs previous month</span>
      <span className="flex items-center font-medium text-green-300">
        {change} <BiUpArrowAlt className="ml-1 text-xl" />
      </span>
    </div>
  </div>
);

export default StatCard;
