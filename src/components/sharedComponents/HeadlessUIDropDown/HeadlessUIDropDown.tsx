import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Image from "next/image";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

const HeadlessUIDropDown = ({ btnImg, btnText, dopData }) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <Menu as="div" className="relative ">
      <Menu.Button className="inline-flex w-full items-center justify-center space-x-1 rounded-md py-2 text-sm font-medium">
        <Image
          src={btnImg}
          alt=""
          height="20"
          width="20"
          className="rounded"
          priority
        />
        <p>{btnText}</p>
        <MdKeyboardArrowDown className="text-lg" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {dopData?.map((menu, i) => (
            <Menu.Item key={i}>
              {({ active }) => (
                <a
                  href={menu.href}
                  className={classNames(
                    active ? "bg-primary text-gray-900" : "text-primary",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  <div className="flex space-x-3">
                    <Image
                      src={menu.img}
                      alt=""
                      height="15"
                      width="20"
                      className="rounded"
                      priority
                    />
                    <p>{menu.name}</p>
                  </div>
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default HeadlessUIDropDown;
