import Markers from "@/components/Markers";
import StoreBox from "@/components/StoreBox";
import { StoreType } from "@/interface";
import { useState } from "react";
import Map from "../components/Map";

const Home = ({ stores }: { stores: StoreType[] }) => {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);

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
  const stores = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`).then((res) =>
    res.json()
  );

  return {
    props: { stores },
    revalidate: 60 * 60,
  };
}
