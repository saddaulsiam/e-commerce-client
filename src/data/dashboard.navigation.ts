import { BiSupport } from "react-icons/bi";
import { BsBag, BsCreditCard2Back } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineAccountCircle } from "react-icons/md";

// Dashboard Menu
export const userDashboard = [
  {
    title: "Orders",
    route: "/customer/orders",
    icon: BsBag,
  },
  {
    title: "Wishlists",
    route: "/customer/wishlists",
    icon: FiHeart,
  },
  {
    title: "Support Tickets",
    route: "/customer/support-tickets",
    icon: BiSupport,
  },
];

// Account Settings Menu
export const userAccounts = [
  {
    title: "Profile Info",
    route: "/customer/profile",
    icon: MdOutlineAccountCircle,
  },
  {
    title: "Addresses",
    route: "/customer/addresses",
    icon: HiOutlineLocationMarker,
  },
  {
    title: "Payment Methods",
    route: "/customer/payment-methods",
    icon: BsCreditCard2Back,
  },
];
