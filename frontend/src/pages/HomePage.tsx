import { Collection } from "@/components/Collection";
import { Hero } from "@/components/Hero";
import { NewArrivals } from "@/components/NewArrivals";

const HomePage = () => {
  return (
    <>
      <Hero />
      <NewArrivals />
      <Collection />
    </>
  );
};

export default HomePage;
