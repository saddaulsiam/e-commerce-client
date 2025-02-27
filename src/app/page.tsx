import {
  Banner,
  FlashDeals,
  TopCategories,
} from "@/components/mainComponents/Home";
import { Footer, Navbar } from "@/components/sharedComponents";

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <FlashDeals />
      <TopCategories />
      {/*
      <NewArrivals />
      <DiscountBanner />
      <AllCatagories />
      <RandomProducts />
      <OurServices />
      <BottomBar /> 
      */}
      <Footer />
    </>
  );
};

export default Home;
