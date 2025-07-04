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
import { USER_ROLE } from "@/constants/common";
import { useLogOut } from "@/hooks/useLogOut";
import { useAppSelector } from "@/redux/hooks";
import {
  adminAccount,
  myAccount,
  vendorAccount,
} from "@/utils/navbarNavigation";
import { LogOut, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoIosGitCompare } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import AnnouncementBar from "../announcementBar/AnnouncementBar";
import CategoriesDropDownContent from "../DropDown/CategoriesDropDownContent";
import LoginModal from "../modal/LoginModal";
import NavMegaMenu from "./NavMegaMenu";
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
  const router = useRouter();
  const { logOut } = useAuth();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [showMobileSearch, setShowMobileSearch] = useState<boolean>(false);

  const { cartItems } = useAppSelector(({ state }) => state.cart);
  const { items: compareItems } = useAppSelector(({ state }) => state.compare);
  const { items: wishlist } = useAppSelector(({ state }) => state.wishlist);
  const { user } = useAppSelector(({ state }) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 400);
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

  return (
    <header className="sticky left-0 top-0 z-50 w-full bg-white">
      <AnnouncementBar />
      <nav
        className={`p-2 transition-all duration-300 ease-in-out ${
          isScrolled ? "shadow-lg" : "shadow-sm"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-4">
          {/* Left Section (Logo & Categories) */}
          <div className="flex items-center gap-2">
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

          {/* Center Section - Search (Hidden on Mobile) */}
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
          <div className="flex items-center space-x-4">
            <button
              className="text-gray-700 lg:hidden"
              onClick={() => setShowMobileSearch((pre) => !pre)}
            >
              <FiSearch className="h-5 w-5" />
            </button>

            <Link href="/wishlist" className="hidden sm:block">
              <div className="relative cursor-pointer p-2 text-gray-700 transition-colors hover:text-primary">
                <AiOutlineHeart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-white">
                    {wishlist.length}
                  </span>
                )}
              </div>
            </Link>

            <Link href="/compare" className="hidden sm:block">
              <div className="relative cursor-pointer p-2 text-gray-700 transition-colors hover:text-primary">
                <IoIosGitCompare className="h-5 w-5" />
                {compareItems.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-white">
                    {compareItems.length}
                  </span>
                )}
              </div>
            </Link>

            {/* Cart Icon (Triggers Sidebar) */}
            <Sheet>
              <SheetTrigger asChild className="hidden sm:block">
                <div className="relative cursor-pointer p-2 text-gray-600 transition-colors hover:text-primary">
                  <FiShoppingCart className="h-5 w-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-white">
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
                    <Avatar className="h-10 w-10 border-2 border-gray-100">
                      <AvatarImage
                        src={user?.profile?.photo}
                        alt={user?.displayName}
                      />
                      <AvatarFallback>
                        {user.displayName?.[0] || (
                          <HiOutlineUserCircle className="h-9 w-9" />
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

                  {user?.role === (USER_ROLE.CUSTOMER as string) &&
                    myAccount.map((account) => (
                      <Link href={account.href!} key={account.title}>
                        <DropdownMenuItem className="cursor-pointer">
                          {account.title}
                        </DropdownMenuItem>
                      </Link>
                    ))}

                  {user?.role === (USER_ROLE.VENDOR as string) &&
                    vendorAccount.map((account) => (
                      <Link href={account.href!} key={account.title}>
                        <DropdownMenuItem className="cursor-pointer">
                          {account.title}
                        </DropdownMenuItem>
                      </Link>
                    ))}

                  {user?.role === (USER_ROLE.ADMIN as string) &&
                    adminAccount.map((account) => (
                      <Link href={account.href!} key={account.title}>
                        <DropdownMenuItem className="cursor-pointer">
                          {account.title}
                        </DropdownMenuItem>
                      </Link>
                    ))}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logOut}
                    className="flex cursor-pointer items-center justify-center bg-red-100 font-medium text-red-500 hover:bg-red-200 hover:text-red-500"
                  >
                    <LogOut /> logout
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
                  <span>Sign In</span>
                </Button>
                <span className="hidden text-gray-300 lg:inline">|</span>
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

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="flex flex-col items-center bg-white p-3">
          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-md items-center space-x-2"
          >
            <Input
              type="search"
              placeholder="Search..."
              className="flex-1 rounded-full px-4 py-2 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <Button
              type="submit"
              size="icon"
              className="h-10 w-10 rounded-full"
            >
              <FiSearch className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="h-10 w-10 rounded-full"
              onClick={() => setShowMobileSearch(false)}
            >
              <X />
            </Button>
          </form>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
      />
    </header>
  );
};

export default Navbar;
