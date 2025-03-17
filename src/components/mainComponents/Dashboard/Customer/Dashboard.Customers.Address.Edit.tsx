import CreateAddressForm from "@/components/sharedComponents/forms/CreateAddressForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdLocationPin } from "react-icons/md";

const DashboardCustomersAddressEdit = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-primary">
          <MdLocationPin className="mr-3 inline text-3xl text-primary" />
          <span>Edit Address</span>
        </h2>
        <Link href="/addresses">
          <Button>Back To Addresses</Button>
        </Link>
      </div>

      <CreateAddressForm />
    </div>
  );
};

export default DashboardCustomersAddressEdit;
