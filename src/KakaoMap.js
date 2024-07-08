// src/KakaoMap.js
import React, { useEffect, useState, useRef } from "react"
import axios from "axios"


// 선택 해제 된 아이콘은 다시 회색이미지로 돌아가게
// 인포윈도우를 마커 위로 이동
// 거리별로 20km, 30km, 50km 드롭다운 생성 및 데이터 반영

const KakaoMap = () => {
  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState([])
  const [selectedMarker, setSelectedMarker] = useState(null) // 선택된 마커를 추적
  const overlaysRef = useRef([]) // 모든 오버레이를 추적

  // public 폴더 내 이미지 경로
  const selectedMarkerImage = "/assets/images/icMapMarkerOrange.png"
  const unselectedMarkerImage = "/assets/images/icMapMarkerGray.png"

  useEffect(() => {
    const script = document.createElement("script")
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=331f267abebdb2ee317f9654a3c69c0b&autoload=false`
    script.onload = () => {
      window.kakao.maps.load(() => {
        console.log("KakaoMap loaded")
        const mapContainer = document.getElementById("map")
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 12,
        }
        const kakaoMap = new window.kakao.maps.Map(mapContainer, mapOption)
        setMap(kakaoMap)
      })
    }
    document.head.appendChild(script)
  }, [])

  // GPS 데이터 받아오기
  useEffect(() => {
    if (map && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        const locPosition = new window.kakao.maps.LatLng(latitude, longitude)
        map.setCenter(locPosition)
        fetchLocations(latitude, longitude)
        console.log(latitude, longitude)
      })
    } else if (!navigator.geolocation) {
      alert("GPS를 지원하지 않습니다")
    }
  }, [map])

  // 백엔드 서버에서 위치 데이터 가져오기
  const fetchLocations = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        "https://api-rainbow-ribbon.com/api/map/company/near-by",
        {
          params: {
            lat: latitude,
            lng: longitude,
            radius: 1000000,
          },
        }
      )
      const locations = response.data.data // 데이터 형식에 맞게 수정
      console.log("Fetched locations:", locations)
      setMarkers(locations)
    } catch (error) {
      console.error("Failed to fetch locations", error)
    }
  }

  // 마커와 인포윈도우 생성 함수
  const createMarker = (map, position, index) => {
    const markerImageSrc = unselectedMarkerImage
    const markerImageSize = new window.kakao.maps.Size(24, 35) // 마커 이미지 크기 설정
    const markerImageOption = { offset: new window.kakao.maps.Point(12, 35) } // 마커 이미지의 중심 좌표 설정
    const markerImage = new window.kakao.maps.MarkerImage(
      markerImageSrc,
      markerImageSize,
      markerImageOption
    )

    const marker = new window.kakao.maps.Marker({
      map: map,
      position: new window.kakao.maps.LatLng(position.lat, position.lng),
      image: markerImage,
    })

    const content = document.createElement("div")
    content.innerHTML = `
    <div class="innerHtml" style="display: flex">
        <div><img src="${
          position.imgUrl || "default-image-url"
        }" alt="${"img"}" style="width:32px;height:32px; border-radius:5px; margin-right:10px;"/></div>
        <div style="margin-top:6px; font-size: 12px">${
          position.companyName
        }</div>
    </div>
    `
    content.style.borderRadius = "5px"
    content.style.border = "1px solid #EBEBEB"
    content.style.padding = "6px"
    content.style.backgroundColor = "white"

    const customOverlay = new window.kakao.maps.CustomOverlay({
      content: content,
      position: marker.getPosition(),
      zIndex: 3,
    })

    window.kakao.maps.event.addListener(marker, "click", () => {
      // 기존의 열려있는 모든 오버레이를 닫음
      overlaysRef.current.forEach((overlay) => overlay.setMap(null))
      // 새로운 인포윈도우 열기
      customOverlay.setMap(map)
      // 현재 열려있는 인포윈도우로 설정
      overlaysRef.current = [customOverlay]
      // 기존 선택된 마커를 회색으로 변경
      if (selectedMarker) {
        selectedMarker.setImage(
          new window.kakao.maps.MarkerImage(
            unselectedMarkerImage,
            markerImageSize,
            markerImageOption
          )
        )
      }
      // 현재 선택된 마커를 오렌지색으로 변경
      marker.setImage(
        new window.kakao.maps.MarkerImage(
          selectedMarkerImage,
          markerImageSize,
          markerImageOption
        )
      )
      // 선택된 마커 업데이트
      setSelectedMarker(marker)
    })

    // 인포윈도우가 닫힐 때 이벤트 리스너 추가
    window.kakao.maps.event.addListener(customOverlay, "close", () => {
      marker.setImage(
        new window.kakao.maps.MarkerImage(
          unselectedMarkerImage,
          markerImageSize,
          markerImageOption
        )
      )
      setSelectedMarker(null)
    })

    return marker
  }

  // 마커 표시하기
  useEffect(() => {
    if (map && markers.length > 0) {
      console.log("Markers to display:", markers)
      markers.forEach((location, index) => {
        createMarker(map, location, index)
      })
    }
  }, [map, markers])

  return (
    <div style={{ width: "100%", height: "125vh" }}>
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
    </div>
  )
}

export default KakaoMap
