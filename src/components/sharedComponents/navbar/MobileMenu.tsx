"use client";

import { TUser } from "@/types/common";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const MobileMenu = ({ user }: { user: TUser | null }) => {
  return (
    <Menu as="div" className="lg:hidden">
      {({ open }) => (
        <>
          <Menu.Button className="p-2 text-gray-700 hover:text-primary">
            {open ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-0 mt-2 w-full origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="p-4">
                <Menu.Item>
                  <Link
                    href="/"
                    className="block rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Home
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    href="/shop"
                    className="block rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Shop
                  </Link>
                </Menu.Item>
                {user ? (
                  <>
                    <Menu.Item>
                      <Link
                        href="/account"
                        className="block rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                      >
                        My Account
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link
                        href="/orders"
                        className="block rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                      >
                        My Orders
                      </Link>
                    </Menu.Item>
                  </>
                ) : (
                  <Menu.Item>
                    <Link
                      href="/login"
                      className="block rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      Sign In
                    </Link>
                  </Menu.Item>
                )}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default MobileMenu;
