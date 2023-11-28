import { locationState, mapState } from "@/atom";
import Script from "next/script";
import { useRecoilValue, useSetRecoilState } from "recoil";

// global kakao
declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  lat?: string | null;
  lng?: string | null;
  zoom?: number | null;
}
const Map = ({ lat, lng, zoom }: MapProps) => {
  const setMap = useSetRecoilState(mapState);
  const location = useRecoilValue(locationState);

  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(
          lat ?? location.lat,
          lng ?? location.lng
        ),
        level: zoom ?? location.zoom,
      };

      const map = new window.kakao.maps.Map(container, options);

      setMap(map);
    });
  };

  return (
    <>
      <Script
        type="text/javascript"
        strategy="afterInteractive"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full h-screen" />
    </>
  );
};

export default Map;
