import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

// local
import logo from "../../../../images/logo/logo.svg";
import SidebarLinkGroup from "./SidebarLinkGroup";

const DashboardSideBarNavigation = ({ menu, tools }) => {
  const router = useRouter();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <div>
      {/* Logo */}
      <div className="flex h-16 w-full items-center bg-primary pl-5">
        <Link href="/">
          <Image src={logo} alt="" className="cursor-pointer" height="40" priority />
        </Link>
      </div>
      <div className="h-[93.4vh] w-full bg-white shadow-lg">
        <ul className="flex  flex-col gap-1.5 px-3">
          <h2 className="select-none pb-3 pt-10 pl-4 text-base font-semibold uppercase text-primary">Menu</h2>
          {menu.map((item, i) => (
            <SidebarLinkGroup key={i} activeCondition={router.asPath.includes(item.title.toLocaleLowerCase())}>
              {(handleClick, open) => {
                return (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-2.5 rounded-sm py-2 px-4 font-medium   duration-300 ease-in-out hover:bg-slate-200 hover:text-primary 
                    ${router.asPath.includes(item.title.toLocaleLowerCase()) && "bg-slate-200 text-primary"}
                    `}
                      onClick={(e) => {
                        sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        item?.href && router.push(item?.href);
                      }}
                    >
                      {item.icon}
                      {item.title}
                      {item?.children?.length > 0 && (
                        <>
                          {open ? (
                            <BiChevronUp className="absolute right-4 top-1/2 -translate-y-1/2 fill-current text-2xl" />
                          ) : (
                            <BiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 fill-current text-2xl" />
                          )}
                        </>
                      )}
                    </div>
                    {/* DropDown */}
                    <div className={`translate transform overflow-hidden ${!open && "hidden"}`}>
                      <ul className="">
                        {item?.children?.map((menu, i) => (
                          <Link key={i} href={menu.href}>
                            <li
                              className={`flex cursor-pointer items-center gap-x-2 py-2 px-4 pl-8 text-sm duration-100 ease-in-out hover:text-primary ${
                                router.asPath === menu.href && "bg-slate-50 font-semibold text-primary"
                              }`}
                            >
                              <span className="text-lg">{menu.icon}</span>
                              {menu.title}
                            </li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  </>
                );
              }}
            </SidebarLinkGroup>
          ))}

          <h2 className="select-none pb-3 pt-10 pl-4 text-base font-semibold uppercase text-primary">Tools</h2>
          {tools.map((item, i) => (
            <SidebarLinkGroup key={i} activeCondition={router.asPath.includes(item.title.toLocaleLowerCase())}>
              {(handleClick, open) => {
                return (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-2.5 rounded-sm py-2 px-4 font-medium   duration-300 ease-in-out hover:bg-slate-200 hover:text-primary 
                    ${router.asPath.includes(item.title.toLocaleLowerCase()) && "bg-slate-200 text-primary"}
                    `}
                      onClick={(e) => {
                        sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        item?.href && router.push(item?.href);
                      }}
                    >
                      {item.icon}
                      {item.title}
                      {item?.children?.length > 0 && (
                        <>
                          {open ? (
                            <BiChevronUp className="absolute right-4 top-1/2 -translate-y-1/2 fill-current text-2xl" />
                          ) : (
                            <BiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 fill-current text-2xl" />
                          )}
                        </>
                      )}
                    </div>
                    {/* DropDown */}
                    <div className={`translate transform overflow-hidden ${!open && "hidden"}`}>
                      <ul className="">
                        {item?.children?.map((menu, i) => (
                          <Link key={i} href={menu.href}>
                            <li
                              className={`flex cursor-pointer items-center gap-x-2 py-2 px-4 pl-8 text-sm duration-100 ease-in-out hover:text-primary ${
                                router.asPath === menu.href && "bg-slate-50 font-semibold text-primary"
                              }`}
                            >
                              <span className="text-lg">{menu.icon}</span>
                              {menu.title}
                            </li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  </>
                );
              }}
            </SidebarLinkGroup>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardSideBarNavigation;
