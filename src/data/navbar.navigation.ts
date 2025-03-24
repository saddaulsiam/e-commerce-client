type NavLink = {
  name: string;
  href: string;
};

export const myAccount: NavLink[] = [
  { name: "Profile", href: "/profile" },
  { name: "My Orders", href: "/orders" },
  { name: "Addresses", href: "/addresses" },
  { name: "Wishlist", href: "/wishlist" },
  { name: "Compare list", href: "/compare" },
];

export const vendorAccount: NavLink[] = [
  { name: "Dashboard", href: "/vendor/dashboard" },
  { name: "My Products", href: "/vendor/products" },
  { name: "Add New Products", href: "/vendor/products/new" },
  { name: "All Orders", href: "/vendor/orders/pending" },
  { name: "Accounts Settings", href: "/vendor/settings" },
];
