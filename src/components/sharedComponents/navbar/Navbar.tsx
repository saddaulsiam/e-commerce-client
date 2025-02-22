"use client";

import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { MdKeyboardArrowDown, MdOutlineAccountCircle } from "react-icons/md";
import { useDispatch } from "react-redux";

// Local imports
import { USER_ROLE } from "@/types/common";
import logo from "../../../../public/logo/logo.svg";
import useAuth from "../../../hooks/useAuth";
import { logOutUser } from "../../../redux/features/auth/customer/authSlice";
import Announcement from "../announcement/Announcement";
import NavbarMenu from "./NavbarMenu";

const Navbar = () => {
  const router = useRouter();
  const { logOut } = useAuth();
  const dispatch = useDispatch();

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { products } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/product?search=${searchQuery}`);
    }
  };

  const handleLogOut = async () => {
    await logOut();
    dispatch(logOutUser());
    localStorage.removeItem("access-token");
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full transition-all duration-300">
      <Announcement scroll={isScrolled} />
      <nav className={`bg-white shadow-md transition-all ${isScrolled ? "shadow-lg" : ""}`}>
        <div className="container mx-auto flex items-center justify-between py-4 px-5 lg:px-10">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="Logo" width={120} height={40} priority />
          </Link>

          {/* Search Bar */}
          <div className="hidden w-1/3 lg:flex">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                disabled={!searchQuery.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-primary p-2 text-white transition hover:bg-secondary"
              >
                <BsSearch className="text-lg" />
              </button>
            </form>
          </div>

          {/* Right Section (Icons & User Menu) */}
          <div className="flex items-center space-x-5">
            {/* Categories Dropdown */}
            <div className="relative hidden lg:flex items-center cursor-pointer hover:text-primary transition">
              <BiCategory className="text-2xl" />
              <MdKeyboardArrowDown className="text-lg ml-1" />
            </div>

            {/* Shopping Cart */}
            <Link href="/cart" className="relative p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition">
              <FiShoppingCart className="text-xl text-gray-700" />
              {products.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                  {products.length}
                </span>
              )}
            </Link>

            {/* User Profile / Login */}
            {user?.email ? (
              <div className="relative">
                <details className="dropdown">
                  <summary className="btn m-0 border-0 bg-white p-0 hover:bg-white">
                    <div className="h-9 w-9 overflow-hidden rounded-full border border-gray-300 ring-primary">
                      <Image
                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                        alt="User"
                        width={40}
                        height={40}
                      />
                    </div>
                  </summary>
                  <ul className="dropdown-content menu rounded-lg bg-white p-2 shadow-lg">
                    <li>
                      <Link
                        href={
                          user.role === USER_ROLE.customer
                            ? "/customer/profile"
                            : user.role === USER_ROLE.vendor
                            ? `/shop/${user?.storeName?.replace(/\s+/g, "-")}`
                            : "/"
                        }
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogOut} className="text-red-500">
                        Log Out
                      </button>
                    </li>
                  </ul>
                </details>
              </div>
            ) : (
              <Link href="/login" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
                <MdOutlineAccountCircle className="text-2xl text-gray-700" />
              </Link>
            )}
          </div>
        </div>

        {/* Navbar Menu */}
        <NavbarMenu scroll={isScrolled} user={user} />
      </nav>
    </header>
  );
};

export default Navbar;
