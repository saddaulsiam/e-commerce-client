import CompareList from "@/components/mainComponents/Compare/CompareList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare",
};
const Compare = () => {
  return <CompareList />;
};

export default Compare;
