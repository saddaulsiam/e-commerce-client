import CreateAddressForm from "@/components/sharedComponents/forms/CreateAddressForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdLocationPin } from "react-icons/md";

const DashboardCustomersAddressNew = () => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-4 pb-6">
        <h2 className="text-2xl font-semibold text-primary">
          <MdLocationPin className="mr-3 inline text-3xl text-primary" />
          <span>New Address</span>
        </h2>
        <Link href="/addresses">
          <Button>Back To Addresses</Button>
        </Link>
      </div>

      <CreateAddressForm />
    </div>
  );
};

export default DashboardCustomersAddressNew;
