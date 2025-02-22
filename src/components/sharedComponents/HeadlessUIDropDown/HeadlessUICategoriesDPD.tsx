import Image from "next/image";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useGetCategoriesQuery } from "../../../redux/features/categories/categoriesApi";
import Link from "next/link";

const HeadlessUICategoriesDPD = () => {
  const { data: categories } = useGetCategoriesQuery();
  return (
    <div className="fixed top-12 w-56 text-right">
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 mt-2 w-[17.5rem] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            {categories?.data.map(({ name, icon, _id }, i) => (
              <Link href={`/product?category=${name.toLowerCase()}`} key={i}>
                <Menu.Item key={i}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-primary text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <div className="flex w-full justify-between ">
                        <div className="flex space-x-3">
                          <Image
                            src={icon}
                            alt=""
                            width="20"
                            height="20"
                            priority
                          />
                          <p className="capitalize">{name}</p>
                        </div>
                        <MdKeyboardArrowRight className="text-xl" />
                      </div>
                    </button>
                  )}
                </Menu.Item>
              </Link>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </div>
  );
};

export default HeadlessUICategoriesDPD;
