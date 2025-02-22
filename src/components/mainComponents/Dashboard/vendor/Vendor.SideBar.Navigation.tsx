import { MdCreate, MdDashboard, MdOutlineArrowForwardIos } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiOutlineSetting } from "react-icons/ai";
import { BsCardText, BsCart2, BsUpload } from "react-icons/bs";

// local
import logo from "../../../../images/logo/logo.svg";

const VendorSideBarNavigation = () => {
  const router = useRouter();

  const dashboard = [
    {
      title: "Dashboard",
      icon: <MdDashboard />,
      arrow: <MdOutlineArrowForwardIos />,
      href: "/vendor/dashboard",
    },
  ];
  const pages = [
    {
      title: "Products",
      icon: <BsCardText />,
      arrow: <MdOutlineArrowForwardIos />,
      href: "/vendor/products",
    },
    {
      title: "Add New Products",
      icon: <BsUpload />,
      arrow: <MdOutlineArrowForwardIos />,
      href: "/vendor/add-product",
    },
    {
      title: "Orders",
      icon: <BsCart2 />,
      arrow: <MdOutlineArrowForwardIos />,
      href: "/vendor/orders",
    },
    {
      title: "Accounts Settings",
      icon: <AiOutlineSetting />,
      arrow: <MdOutlineArrowForwardIos />,
      href: "/vendor/account-settings",
    },
  ];
  const tools = [
    {
      title: "Create Brand",
      icon: <MdCreate />,
      arrow: <MdOutlineArrowForwardIos />,
      href: "/vendor/create-brand",
    },
  ];
  return (
    <div>
      {/* Logo */}
      <div className="flex h-16 w-full items-center bg-primary pl-5">
        <Link href="/">
          <Image src={logo} alt="" className="cursor-pointer" height="40" priority />
        </Link>
      </div>
      {/* Navigation */}
      <div className="h-[93.4vh] w-full bg-white shadow-lg">
        <div>
          <h2 className="select-none py-5 pl-5 text-base font-semibold uppercase text-primary">Dashboard</h2>
          <ul className="text-my-gray-100">
            {dashboard.map((link, index) => (
              <li
                onClick={() => router.push(link.href)}
                key={index}
                className="group flex cursor-pointer items-center justify-between py-3 px-5 text-sm transition duration-200 ease-in-out hover:bg-slate-200 hover:text-primary"
              >
                <span className="flex items-center gap-3">
                  <span className="text-xl group-hover:text-blue-600">{link.icon}</span>
                  <div className="">{link.title}</div>
                </span>
                <span>{link.arrow}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="select-none py-5 pl-5 text-base font-semibold uppercase text-primary">Pages</h2>
          <ul className="text-my-gray-100">
            {pages.map((link, index) => (
              <li
                onClick={() => router.push(link.href)}
                key={index}
                className={`group flex cursor-pointer items-center justify-between py-3 px-5 text-sm transition duration-200 ease-in-out hover:bg-slate-200 hover:text-primary
                ${router.route.split("/")[2] == link.href.split("/")[2] && "bg-slate-200 text-primary"}
                `}
              >
                <span className="flex items-center gap-3">
                  <span className="text-xl group-hover:text-blue-600">{link.icon}</span>
                  <div className="">{link.title}</div>
                </span>
                <span>{link.arrow}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="select-none py-5 pl-5 text-base font-semibold uppercase text-primary">Tools</h2>
          <ul className="text-my-gray-100">
            {tools.map((link, index) => (
              <li
                onClick={() => router.push(link.href)}
                key={index}
                className="group flex cursor-pointer items-center justify-between py-3 px-5 text-sm transition duration-200 ease-in-out hover:bg-slate-200 hover:text-primary"
              >
                <span className="flex items-center gap-3">
                  <span className="text-xl group-hover:text-blue-600">{link.icon}</span>
                  <div className="">{link.title}</div>
                </span>
                <span>{link.arrow}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VendorSideBarNavigation;
