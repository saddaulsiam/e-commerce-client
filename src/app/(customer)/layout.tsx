import { BottomBar, Footer, Navbar } from "@/components/sharedComponents";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <BottomBar />
    </>
  );
};

export default Layout;
