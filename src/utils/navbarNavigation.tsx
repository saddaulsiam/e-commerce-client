type NavLink = {
  title: string;
  href: string;
};

export const myAccount: NavLink[] = [
  { title: "Profile", href: "/profile" },
  { title: "My Orders", href: "/orders" },
  { title: "Addresses", href: "/addresses" },
  { title: "Wishlist", href: "/wishlist" },
  { title: "Compare list", href: "/compare" },
];

export const vendorAccount: NavLink[] = [
  { title: "Dashboard", href: "/vendor/dashboard" },
  { title: "My Products", href: "/vendor/products" },
  { title: "Add New Products", href: "/vendor/products/new" },
  { title: "All Orders", href: "/vendor/orders/pending" },
  { title: "Accounts Settings", href: "/vendor/settings" },
];

export const adminAccount: NavLink[] = [
  { title: "Dashboard", href: "/vendor/dashboard" },
  { title: "All Products", href: "/vendor/products" },
  { title: "All Orders", href: "/vendor/orders/pending" },
  { title: "Accounts Settings", href: "/vendor/settings" },
];
