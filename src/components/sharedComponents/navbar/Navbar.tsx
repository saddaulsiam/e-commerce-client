"use client";

import { useAppSelector } from "@/redux/hooks";
import { Menu } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { GrCompare } from "react-icons/gr";
import { MdKeyboardArrowDown, MdOutlineAccountCircle } from "react-icons/md";
import { useDispatch } from "react-redux";

// local
import { USER_ROLE } from "@/types/common";
import logo from "../../../../public/logo/logo.svg";
import useAuth from "../../../hooks/useAuth";
import { logOutUser } from "../../../redux/features/auth/customer/authSlice";
import SideBarShoppingCart from "../../mainComponents/Home/SideBarShoppingCart";
import Announcement from "../announcement/Announcement";
import HeadlessUICategoriesDPD from "../HeadlessUIDropDown/HeadlessUICategoriesDPD";
import LoginModal from "../modal/Login.modal";
import NavbarMenu from "./NavbarMenu";

const Navbar = () => {
  const router = useRouter();
  const { logOut } = useAuth();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [scroll, setScroll] = useState(null);
  const [searchProduct, setSearchProduct] = useState("");
  const [showProductCard, setShowProductCard] = useState(false);

  const { products } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 80) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }, []);

  const handleSearchProduct = (e) => {
    e.preventDefault();
    router.push(`/product?search=${searchProduct}`);
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full ">
      <Announcement scroll={scroll} />
      <nav className={`bg-white lg:px-5 xl:px-0 ${scroll && "shadow-lg"}`}>
        <div className="flex items-center justify-center py-4 lg:justify-between xl:container">
          <div className="hidden items-center justify-center lg:flex">
            <Link href="/">
              <Image height={35} width={100} src={logo} alt="" className="cursor-pointer" priority />
            </Link>

            <Menu as="div" className="relative z-50">
              <Menu.Button className="inline-flex items-center justify-center space-x-1 py-2">
                <BiCategory className={`ml-3 text-2xl text-my-gray-100 ${scroll ? "block" : "hidden"}`} />
                <MdKeyboardArrowDown className={`text-2xl text-my-gray-100 ${scroll ? "block" : "hidden"}`} />
              </Menu.Button>
              <HeadlessUICategoriesDPD />
            </Menu>
          </div>
          <div className="form-control mx-3 my-1 flex w-full lg:mx-0 lg:w-1/2">
            <form onSubmit={handleSearchProduct}>
              <div className="input-group w-full ">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Search and hit enter..."
                  onChange={(e) => setSearchProduct(e.target.value)}
                />
                <button
                  disabled={searchProduct === "" ? true : false}
                  type="submit"
                  className={`btn btn-square border-none bg-primary hover:bg-secondary disabled:bg-primary`}
                >
                  <BsSearch className="text-xl text-white" />
                </button>
              </div>
            </form>
          </div>
          <div className="hidden justify-center space-x-5 lg:block xl:flex">
            <p className="cursor-pointer rounded-full bg-slate-200 p-3" onClick={() => setShowProductCard(true)}>
              <GrCompare className="inline h-5 w-5" />
            </p>
            <p
              className="relative cursor-pointer rounded-full bg-slate-200 p-3"
              onClick={() => setShowProductCard(true)}
            >
              <FiShoppingCart className="inline h-5 w-5" />
              <span className="absolute -top-1 -right-2 rounded-full bg-primary px-2 text-sm text-white">
                {products.length}
              </span>
            </p>
            {user?.email ? (
              <details className="dropdown ">
                <summary className="btn m-0 border-0 bg-white p-0 hover:bg-white">
                  <span className="avatar cursor-pointer">
                    <div className="h-8 w-8 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
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
                <ul className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow">
                  <li>
                    <Link
                      href={
                        user.role === "customer"
                          ? "/customer/profile"
                          : user.role === USER_ROLE.vendor
                          ? `/shop/${user?.storeName?.split(" ").join("-")}`
                          : "/"
                      }
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        logOut();
                        dispatch(logOutUser());
                        localStorage.removeItem("access-token");
                      }}
                    >
                      LogOut
                    </button>
                  </li>
                </ul>
              </details>
            ) : (
              <span onClick={() => setIsOpen(true)} className="cursor-pointer rounded-full bg-slate-200 p-2">
                <MdOutlineAccountCircle className="text-[#rgb(125, 135, 156)] inline h-7 w-7" />
              </span>
            )}
          </div>
        </div>
        {/* navbar menu */}
        <NavbarMenu scroll={scroll} user={user} />
      </nav>
      <>
        {showProductCard && <SideBarShoppingCart setShowProductCard={setShowProductCard} />}
        <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </>
    </div>
  );
};

export default Navbar;
