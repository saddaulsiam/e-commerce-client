import Link from "next/link";
import Image from "next/image";
import { HiOutlineMail } from "react-icons/hi";
import { AiTwotonePhone } from "react-icons/ai";

// local
import logo from "../../../../public/logo/logo.svg";
import bd from "../../../../public/country/bd.svg";
import us from "../../../../public/country/us.svg";
import HeadlessUIDropDown from "../HeadlessUIDropDown/HeadlessUIDropDown";

const Announcement = ({ scroll }) => {
  const dopData = [
    { name: "BD", img: bd, href: "#" },
    { name: "US", img: us, href: "#" },
  ];
  return (
    <div className={`bg-primary h-10${scroll && "hidden"} scroll-smooth `}>
      <div className="container flex items-center justify-between text-xs font-medium text-white">
        <div className="ml-0 lg:hidden">
          <Image src={logo} alt="" priority height={30} width={100} className="cursor-pointer" />
        </div>
        <div className="hidden lg:block">
          <div className="flex space-x-5">
            <p className="flex items-center">
              <AiTwotonePhone className="inline" /> +8801311333277
            </p>
            <p className="flex items-center">
              <HiOutlineMail className="inline" /> support@gmail.com
            </p>
          </div>
        </div>
        <div className="flex items-center sm:space-x-5">
          <Link href={"/vendor/login"} className="mr-10 sm:text-base">
            Join As Seller
          </Link>
          <HeadlessUIDropDown btnText="EN" btnImg={us} dopData={dopData} />
          <HeadlessUIDropDown btnText="USD" btnImg={us} dopData={dopData} />
        </div>
      </div>
    </div>
  );
};

export default Announcement;
