import {
  Banner,
  FlashDeals,
  TopCategories,
} from "@/components/mainComponents/Home";
import { Navbar } from "@/components/sharedComponents";

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
      <Footer />
      <BottomBar /> 
      */}
    </>
  );
};

export default Home;
