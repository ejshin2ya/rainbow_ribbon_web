import React, { useEffect, useState, useRef } from "react"
import axios from "axios"
import "./KakaoMap.css" // CSS 파일 import

const KakaoMap = () => {
  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState([])
  const [selectedMarker, setSelectedMarker] = useState(null) // 선택된 마커를 추적
  const [distance, setDistance] = useState(20) // 기본 거리 값 20km
  const [isDropdownOpen, setIsDropdownOpen] = useState(false) // 드롭다운 열림 상태
  const circleRef = useRef(null) // 원 객체
  const overlaysRef = useRef([]) // 모든 오버레이를 추적
  const markersRef = useRef([]) // 모든 마커를 추적

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
          level: 10,
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
        fetchLocations(latitude, longitude, distance)
        drawCircle(latitude, longitude, distance) // 원 그리기
        console.log(latitude, longitude)
      })
    } else if (!navigator.geolocation) {
      alert("GPS를 지원하지 않습니다")
    }
  }, [map])

  useEffect(() => {
    if (map) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords
          fetchLocations(latitude, longitude, distance)
          drawCircle(latitude, longitude, distance) // 원 그리기
        })
      }
    }
  }, [distance, map])

  // 지도 레벨 변경 로직
  useEffect(() => {
    if (map) {
      let newLevel
      if (distance === 30) {
        newLevel = 11
      } else if (distance === 50) {
        newLevel = 12
      } else {
        newLevel = 10
      }
      map.setLevel(newLevel)
    }
  }, [distance, map])

  // 백엔드 서버에서 위치 데이터 가져오기
  const fetchLocations = async (latitude, longitude, distance) => {
    try {
      const response = await axios.get(
        "https://api-rainbow-ribbon.com/api/map/company/near-by",
        {
          params: {
            lat: latitude,
            lng: longitude,
            radius: distance * 1000, // km를 미터로 변환
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

  // 원 그리기 함수
  const drawCircle = (latitude, longitude, distance) => {
    if (circleRef.current) {
      circleRef.current.setMap(null) // 기존 원 제거
    }

    const circleOptions = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      radius: distance * 1000, // km를 미터로 변환
      strokeWeight: 1,
      strokeColor: "#FC9974",
      strokeOpacity: 0.8,
      fillColor: "#FC997420",
      fillOpacity: 0.7,
    }

    const newCircle = new window.kakao.maps.Circle(circleOptions)
    newCircle.setMap(map)
    circleRef.current = newCircle
  }

  // 마커와 인포윈도우 생성 함수
  const createMarker = (map, position, index) => {
    const markerImageSrc = unselectedMarkerImage
    const markerImageSize = new window.kakao.maps.Size(25, 25) // 마커 이미지 크기 설정
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
      yAnchor: 1.5,
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

    return marker
  }

  // 마커 표시하기
  useEffect(() => {
    if (map && markers.length > 0) {
      console.log("Markers to display:", markers)
      // 기존 마커 제거
      markersRef.current.forEach((marker) => marker.setMap(null))
      overlaysRef.current.forEach((overlay) => overlay.setMap(null))
      markersRef.current = []
      overlaysRef.current = []
      // 새 마커 생성
      markers.forEach((location, index) => {
        const marker = createMarker(map, location, index)
        markersRef.current.push(marker)
      })
    }
  }, [map, markers])

  const handleDropdownClick = (value) => {
    setDistance(value)
    setIsDropdownOpen(false)
  }

  return (
    <div style={{ width: "100%", height: "125vh", position: "relative" }}>
      <div className="dropdown" onClick={() => setIsDropdownOpen(true)}>
        <label className="dropdown-label">내 주변 {distance}km </label>
        <img
          className="icChevron"
          alt="ic_chevron"
          src="assets/images/ic_chevron.png"
        />
      </div>
      {isDropdownOpen && (
        <div className="dropdown-modal">
          <div className="dropdown-content">
            {[20, 30, 50].map((value) => (
              <div
                key={value}
                className="dropdown-item"
                onClick={() => handleDropdownClick(value)}
              >
                {value}km{" "}
                {value === distance && (
                  <img
                    className="icCheckOrange"
                    alt="ic_check_orange"
                    src="assets/images/ic_check.png"
                  />
                )}
              </div>
            ))}
            <button
              className="dropdown-confirm"
              onClick={() => setIsDropdownOpen(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
    </div>
  )
}

export default KakaoMap
