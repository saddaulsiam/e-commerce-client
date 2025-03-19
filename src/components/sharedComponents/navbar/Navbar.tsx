"use client";

import { SideBarShoppingCart } from "@/components/mainComponents/Home";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
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
import AnnouncementBar from "../announcementBar/AnnouncementBar";
import CategoriesDropDownContent from "../DropDown/CategoriesDropDownContent";
import LoginModal from "../modal/Loginmodal";
import MobileMenu from "./MobileMenu";
import NavMegaMenu from "./NavMegaMenu";
import { myAccount, vendorAccount } from "@/data/navbar.navigation";

const Navbar = () => {
  const router = useRouter();
  const { logOut } = useAuth();
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);

  const { cartItems } = useAppSelector(({ state }) => state.cart);
  const { user } = useAppSelector(({ state }) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
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
    <header className="sticky left-0 top-0 z-50 w-full">
      <AnnouncementBar />
      <nav
        className={`bg-white py-1.5 transition-all duration-300 ease-in-out ${isScrolled ? "shadow-lg" : "shadow-sm"}`}
      >
        <div className="container mx-auto flex items-center justify-between py-4">
          {/* Left Section (Logo & Categories) */}
          <div className="flex items-center gap-2">
            <MobileMenu user={user} />
            <Link href="/" className="shrink-0">
              <Image
                src="/logo/logo.svg"
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
                  disabled={isScrolled ? false : true}
                  className={`${isScrolled ? "" : "disabled:bg-white disabled:text-white"} text-2xl text-my-gray-100`}
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
            {/* Cart Icon (Triggers Sidebar) */}
            <Sheet>
              <SheetTrigger asChild>
                <div className="relative cursor-pointer p-2 text-gray-700 transition-colors hover:text-primary">
                  <FiShoppingCart className="h-6 w-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                      {cartItems.length}
                    </span>
                  )}
                </div>
              </SheetTrigger>
              <SideBarShoppingCart />
            </Sheet>
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
                        src={user?.profile?.photo}
                        alt={user?.displayName}
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
                  <DropdownMenuLabel>
                    {user.displayName || user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {user?.role === USER_ROLE.customer &&
                    myAccount.map((account) => (
                      <Link href={account.href} key={account.name}>
                        <DropdownMenuItem className="cursor-pointer">
                          {account.name}
                        </DropdownMenuItem>
                      </Link>
                    ))}

                  {user?.role === USER_ROLE.vendor &&
                    vendorAccount.map((account) => (
                      <Link href={account.href} key={account.name}>
                        <DropdownMenuItem className="cursor-pointer">
                          {account.name}
                        </DropdownMenuItem>
                      </Link>
                    ))}

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
                <Button
                  variant="ghost"
                  className="text-sm font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setOpenLoginModal((pre) => !pre)}
                >
                  <HiOutlineUserCircle className="h-5 w-5" />
                  <span className="hidden lg:inline">Sign In</span>
                </Button>
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
      <LoginModal
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
      />
    </header>
  );
};

export default Navbar;
