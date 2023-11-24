import { Dispatch, SetStateAction, useEffect } from "react";

interface MarkerProps {
  map: any;
  storeDatas: any[];
  setCurrentStore: Dispatch<SetStateAction<any>>;
}

const Markers = ({ map, storeDatas, setCurrentStore }: MarkerProps) => {
  const loadKakaoMarkers = () => {
    if (map) {
      storeDatas.map((store) => {
        const imageSrc = store?.bizcnd_code_nm
          ? `/images/markers/${store?.bizcnd_code_nm}.png`
          : "/images/markers/default.png";
        const imageSize = new window.kakao.maps.Size(40, 40);
        const imageOption = { offset: new window.kakao.maps.Point(27, 69) };

        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
        const markerPosition = new window.kakao.maps.LatLng(store?.y_dnts, store?.x_cnts);

        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        // 마커 커서가 오버되었을 때 윈포윈도우 생성
        const content = `<div class="infowindow">${store?.upso_nm}</div>`;

        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          xAnchor: 0.6,
          yAnchor: 0.91,
        });

        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
          customOverlay.setMap(map);
        });

        // 마커에 마우스아웃 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
          customOverlay.setMap(null);
        });

        // 선택한 가게 저장
        window.kakao.maps.event.addListener(marker, "click", function () {
          setCurrentStore(store);
        });
      });
    }
  };

  useEffect(() => {
    loadKakaoMarkers();
  }, [map]);

  return null;
};

export default Markers;
