import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import Hero from "./Hero";
import Pricing from "./Pricing";
import SubscriptionSection from "./SubscriptionSection";

function Home() {
  return (
    <div>
      <Hero/>
      <FeaturesSection/>
      <Pricing />
      <SubscriptionSection/>
      <Footer/>
    </div>
  );
}
export default Home;
