"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { USER_ROLE } from "@/contants/common";
import useAuth from "@/hooks/useAuth";
import { logOutUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch } from "react-redux";
import logo from "../../../../public/logo/logo.svg";
import AnnouncementBar from "../announcementBar/AnnouncementBar";
import CategoriesDropDownContent from "../DropDown/CategoriesDropDownContent";
import MobileMenu from "./MobileMenu";
import NavMegaMenu from "./NavMegaMenu";

const Navbar = () => {
  const router = useRouter();
  const { logOut } = useAuth();
  const dispatch = useDispatch();

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { cartItems } = useAppSelector(({ state }) => state.cart);
  const { user } = useAppSelector(({ state }) => state.auth);

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
    <header className="fixed left-0 top-0 z-50 w-full transition-all duration-300">
      <AnnouncementBar />
      <nav
        className={`bg-white shadow-sm transition-all ${isScrolled ? "shadow-lg" : ""}`}
      >
        <div className="container mx-auto flex items-center justify-between py-4">
          {/* Left Section (Logo & Categories) */}
          <div className="flex items-center gap-2">
            <MobileMenu user={user} />
            <Link href="/" className="shrink-0">
              <Image
                src={logo}
                alt="Company Logo"
                width={120}
                height={30}
                className="h-9 w-auto"
                priority
              />
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`${isScrolled ? "flex" : "hidden"} text-2xl text-my-gray-100`}
                >
                  <BiCategory />
                  <MdKeyboardArrowDown />
                </Button>
              </DropdownMenuTrigger>
              <CategoriesDropDownContent />
            </DropdownMenu>
          </div>

          {/* Center Section - Search */}
          <div className="hidden w-full max-w-2xl lg:block">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search products, brands, and categories..."
                className="h-10 rounded-full pl-6 pr-12 text-sm shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full"
              >
                <FiSearch className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Right Section (Icons & User Menu) */}
          <div className="flex items-center space-x-5">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 transition-colors hover:text-primary"
            >
              <FiShoppingCart className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Auth Section */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-10 w-10 rounded-full p-0"
                  >
                    <Avatar className="h-9 w-9 border-2 border-gray-100">
                      <AvatarImage
                        src={user.profile.photo}
                        alt={user.displayName}
                      />
                      <AvatarFallback>
                        {user.displayName?.[0] || (
                          <HiOutlineUserCircle className="h-6 w-6" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {user.displayName || user.email}
                  </div>
                  <DropdownMenuSeparator />
                  <Link
                    href={
                      user.role === USER_ROLE.customer
                        ? "/account"
                        : user.role === USER_ROLE.vendor
                          ? "/vendor/dashboard"
                          : "/"
                    }
                  >
                    <DropdownMenuItem className="cursor-pointer">
                      My Account
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/orders">
                    <DropdownMenuItem className="cursor-pointer">
                      My Orders
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogOut}
                    className="cursor-pointer text-red-600 hover:bg-red-50"
                  >
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <HiOutlineUserCircle className="h-5 w-5" />
                  <span className="hidden lg:inline">Sign In</span>
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  href="/register"
                  className="hover:bg-primary-dark hidden rounded-md bg-primary px-4 py-2 text-sm font-medium text-white lg:block"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Navbar Menu */}
        <NavMegaMenu isScrolled={isScrolled} user={user} />
      </nav>
    </header>
  );
};

export default Navbar;
