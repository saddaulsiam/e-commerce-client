"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu } from "@headlessui/react";
import { BiCategory } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import HeadlessUICategoriesDPD from "../HeadlessUIDropDown/HeadlessUICategoriesDPD";

const NavbarMenu = ({ scroll, user }) => {
  const { route } = useRouter();

  const myAccount = [
    { name: "My Profile", href: "/customer/profile" },
    { name: "My Orders", href: "/customer/orders" },
    { name: "Wishlists", href: "/customer/wishlists" },
    { name: "Support Tickets", href: "/customer/support-tickets" },
    { name: "Payment Methods", href: "/customer/payment-methods" },
  ];

  const vendorAccount = [
    { name: "Dashboard", href: "/vendor/dashboard" },
    { name: "Products", href: "/vendor/products" },
    { name: "Add New Products", href: "/vendor/add-product" },
    { name: "Orders", href: "/vendor/orders" },
    { name: "Accounts Settings", href: "/vendor/account-settings" },
  ];

  return (
    <div className="transform scroll-smooth transition duration-500 xl:container">
      <div className="hidden lg:block">
        <div className={`flex h-14 items-center justify-between ${scroll && "hidden"}`}>
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button
              className={`flex cursor-pointer space-x-2 rounded bg-slate-200 px-5 py-2 text-my-gray-200 transition-all ease-in hover:bg-my-gray-100`}
            >
              <BiCategory className="text-2xl" />
              <p className="font-semibold "> Categories</p>
              <MdKeyboardArrowDown className="text-2xl " />
            </Menu.Button>
            {route === "/" ? "" : <HeadlessUICategoriesDPD />}
          </Menu>
          <div>
            <ul className="font-OpenSans flex items-center space-x-10">
              <Link href={"/"}>
                <li className="cursor-pointer hover:text-secondary ">Home</li>
              </Link>

              <Link href={"/"}>
                <li className="cursor-pointer hover:text-secondary ">Pages</li>
              </Link>

              {user?.role === "vendor-admin" && (
                <li className="cursor-pointer ">
                  <details className="dropdown">
                    <summary className="btn m-0 border-0 bg-white p-0 hover:bg-white">
                      <p className="text-base font-normal capitalize text-black hover:text-secondary ">
                        Vendor Account
                      </p>
                    </summary>
                    <ul className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow">
                      {vendorAccount.map((menu, i) => (
                        <li key={i}>
                          <Link href={menu.href}>{menu.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              )}
              {user?.role === "customer" && (
                <li className="cursor-pointer ">
                  <details className="dropdown">
                    <summary className="btn m-0 border-0 bg-white p-0 hover:bg-white">
                      <p className="text-base font-normal capitalize text-black hover:text-secondary ">My Account</p>
                    </summary>
                    <ul className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow">
                      {myAccount.map((menu, i) => (
                        <li key={i}>
                          <Link href={menu.href}>{menu.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              )}

              {user?.role == "customer" && (
                <Link href={"/customer/orders"}>
                  <li className="cursor-pointer hover:text-secondary ">Track My Order</li>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarMenu;
