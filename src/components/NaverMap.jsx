import React, { useEffect, useRef } from 'react';

const NaverMap = () => {
    const mapRef = useRef(null);
    // 서울시청 위도, 경도 값
    const lat = 37.5665;
    const lng = 126.978;

    useEffect(() => {
        // .env에 설정한 클라이언트 아이디 불러오기
        const naverMapScript = document.createElement("script");
        naverMapScript.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}`;
        document.head.appendChild(naverMapScript);

        // 정상적으로 값을 가져오면 지도 그리기
        naverMapScript.onload = () => {
            // 네이버 지도 API가 로드되었는지 확인
            const { naver } = window;

            if (!naver) {
                console.log("네이버 지도 API가 로드되지 않음");
                return;
            }

            if (mapRef.current && naver) {
                const location = new naver.maps.LatLng(lat, lng);
                const map = new naver.maps.Map(mapRef.current, {
                    center: location, // 지도 중심 좌표
                    zoom: 17, // 지도 확대 정도(1 ~ 21)
                    mapTypeControl: true, // 지도 타입을 변경할 수 있는 컨트롤 활성화
                });

                // 마커
                new naver.maps.Marker({
                    position: location,
                    map, // 마커에 표시되는 지도 객체
                    title: "서울시청", // 마커에 마우스를 올렸을 때 표시되는 타이틀
                });
            }
        };
        
        naverMapScript.onerror = () => {
            console.error("네이버 지도 API 로드 실패");
        }

    }, []);

    return (
        <div
            className="naverMap"
            ref={mapRef}
            style={{ width: "100%", height: "400px" }}
        ></div>
    );
};

export default NaverMap;