import {
  Banner,
  DiscountBanner,
  FlashDeals,
  NewArrivals,
  OurServices,
  RandomProducts,
  TopCategories,
} from "@/components/mainComponents/Home";
import { BottomBar, Footer, Navbar } from "@/components/sharedComponents";

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <FlashDeals />
      <TopCategories />
      <NewArrivals />
      <DiscountBanner />
      <RandomProducts />
      <OurServices />
      <BottomBar />
      <Footer />
    </>
  );
};

export default Home;
