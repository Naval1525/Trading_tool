import Hero from "./Hero";
import Register from "./Register ";
import StockTrading from "./StockTrading";
import SubscriptionSection from "./SubscriptionSection";

function Home() {
  return <div>
    {/* <Hero></Hero>
    <SubscriptionSection></SubscriptionSection> */}
    <Register></Register>
    <StockTrading></StockTrading>
  </div>;
}
export default Home;
