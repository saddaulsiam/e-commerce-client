"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { BiBell, BiChat } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../../../redux/features/auth/authSlice";

const VendorNavbar = ({ setSideBarClose }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex h-16 items-center justify-between bg-secondary px-5 print:hidden">
      {/* Side bar Toggle */}
      <div>
        <label className="swap-rotate swap h-16 w-14 text-white transition duration-300 ease-in-out hover:bg-blue-700">
          <input
            type="checkbox"
            onChange={(e) => setSideBarClose(e.target.checked)}
          />
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
        </label>
      </div>
      {/* Navbar Menu */}
      <div>
        <ul className="flex h-16 items-center text-white">
          <li className="flex h-full w-16 cursor-pointer items-center justify-center text-xl hover:bg-blue-700">
            {/* <HeadlessUIDropDown btnText="EN" btnImg={us} dopData={dopData} /> */}
          </li>
          <li className="flex h-full w-14 cursor-pointer items-center justify-center text-2xl hover:bg-blue-700">
            <BiBell />
          </li>
          <li className="flex h-full w-14 cursor-pointer items-center justify-center text-2xl hover:bg-blue-700">
            <BiChat />
          </li>
          <li>
            <details className="dropdown dropdown-end">
              <summary className="btn border-none bg-inherit hover:bg-inherit">
                <span className="avatar cursor-pointer">
                  <div className="ring-offset-base-100 h-8 w-8 rounded-full ring ring-primary ring-offset-2">
                    <Image
                      alt=""
                      height="35"
                      width="35"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      priority
                    />
                  </div>
                </span>
              </summary>
              <ul className="dropdown-content menu rounded-box bg-base-100 w-52 p-2 text-primary shadow">
                <li>
                  <Link href="/customer/profile">Profile</Link>
                </li>
                <li>
                  <Button
                    onClick={() => {
                      dispatch(logOutUser());
                      localStorage.removeItem("token");
                    }}
                  >
                    LogOut
                  </Button>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VendorNavbar;
