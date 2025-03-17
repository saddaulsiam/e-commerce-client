import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { BsFillCameraFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";

const DashboardCustomersProfileEdit = () => {
  return (
    <div className="mb-10">
      <div className="grid grid-cols-2 gap-y-5">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold text-primary">
            <MdAccountCircle className="mr-3 inline text-primary" />
            <span> Edit Profile</span>
          </h2>
        </div>
        <div className="flex justify-end lg:hidden">
          <Button className="text-2xl font-thin">
            <GiHamburgerMenu />
          </Button>
        </div>
        <div className="flex lg:justify-end">
          <Link href="/profile">
            <Button className="button">Back Profile</Button>
          </Link>
        </div>
      </div>
      <div className="mt-5 rounded-md bg-white p-5">
        <div className="relative inline-flex">
          <Image
            height="60"
            width="60"
            className="rounded-full"
            src="https://bonik-react.vercel.app/assets/images/faces/ralph.png"
            alt="User profile picture"
            priority
          />
          <label htmlFor="user-profile">
            <span className="group absolute -right-5 bottom-0 rounded-full bg-slate-300 p-2 text-lg hover:bg-secondary">
              <BsFillCameraFill className="group-hover:text-white" />
            </span>
          </label>
          <input
            type="file"
            name="user-profile"
            id="user-profile"
            className="hidden"
          />
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm text-my-gray-200">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className="h-10 w-full rounded border px-2 text-sm outline-1 focus:outline-primary"
            />
          </div>
          <div>
            <label className="text-sm text-my-gray-200">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              className="h-10 w-full rounded border px-2 text-sm outline-1 focus:outline-primary"
            />
          </div>
          <div>
            <label className="text-sm text-my-gray-200">Email</label>
            <input
              type="email"
              disabled
              placeholder="Email"
              className="h-10 w-full rounded border px-2 outline-1 focus:outline-primary"
            />
          </div>
          <div>
            <label className="text-sm text-my-gray-200">Phone Number</label>
            <input
              type="number"
              placeholder="Contact Number"
              className="h-10 w-full rounded border px-2 outline-1 focus:outline-primary"
            />
          </div>
          <div>
            <label className="text-sm text-my-gray-200">Birth date</label>
            <input
              type="date"
              className="h-10 w-full rounded border px-2 outline-1 focus:outline-primary"
            />
          </div>
        </div>
        <Button className="mt-5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-all ease-in-out hover:bg-secondary">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default DashboardCustomersProfileEdit;
