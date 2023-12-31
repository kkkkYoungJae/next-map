import Markers from "@/components/Markers";
import StoreBox from "@/components/StoreBox";
import { StoreType } from "@/interface";
import axios from "axios";
import Map from "../components/Map";

const Home = ({ stores }: { stores: StoreType[] }) => {
  return (
    <>
      <Map />
      <Markers stores={stores} />
      <StoreBox />
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);

  return {
    props: { stores: stores.data },
    revalidate: 60 * 60,
  };
}
