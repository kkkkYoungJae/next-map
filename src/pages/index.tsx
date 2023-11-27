import Markers from "@/components/Markers";
import StoreBox from "@/components/StoreBox";
import { StoreType } from "@/interface";
import axios from "axios";
import { useState } from "react";
import Map from "../components/Map";

const Home = ({ stores }: { stores: StoreType[] }) => {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState<StoreType | null>(null);

  return (
    <>
      <Map setMap={setMap} />
      <Markers map={map} stores={stores} setCurrentStore={setCurrentStore} />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
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
