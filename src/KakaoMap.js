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
  const [currentPosition, setCurrentPosition] = useState(null) // 현재 위치 상태

  // public 폴더 내 이미지 경로
  const selectedMarkerImage = "/assets/images/icMapMarkerOrange.png"
  const unselectedMarkerImage = "/assets/images/icMapMarkerGray.png"
  const currentLocationImage = "/assets/images/icCurrentLocation.png" // 현재 위치 아이콘 경로

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
          draggable: true, // 드래그 가능하게 설정
        }
        const kakaoMap = new window.kakao.maps.Map(mapContainer, mapOption)
        setMap(kakaoMap)
      })
    }
    document.head.appendChild(script)
  }, [])

  useEffect(() => {
    if (map) {
      window.updateLocation = (latitude, longitude) => {
        const locPosition = new window.kakao.maps.LatLng(latitude, longitude)
        setCurrentPosition(locPosition) // 현재 위치 설정
        map.setCenter(locPosition)
        fetchLocations(latitude, longitude, distance)
        drawCircle(locPosition, distance)
      }
    }
  }, [map])

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
      if (currentPosition) {
        drawCircle(currentPosition, distance)
      }
    }
  }, [distance, map, currentPosition])

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
      const locations = response.data.data
      console.log("Fetched locations:", locations)
      setMarkers(locations)
    } catch (error) {
      console.error("Failed to fetch locations", error)
    }
  }

  const drawCircle = (position, distance) => {
    if (circleRef.current) {
      circleRef.current.setMap(null)
    }

    const circleOptions = {
      center: position,
      radius: distance * 1000,
      strokeWeight: 1,
      strokeColor: "#FC9974",
      strokeOpacity: 0.8,
      fillColor: "#FC997410",
      fillOpacity: 0.7,
    }

    const newCircle = new window.kakao.maps.Circle(circleOptions)
    newCircle.setMap(map)
    circleRef.current = newCircle
  }

  const createMarker = (map, position, index) => {
    const markerImageSrc = unselectedMarkerImage
    const markerImageSize = new window.kakao.maps.Size(25, 25)
    const markerImageOption = { offset: new window.kakao.maps.Point(12, 35) }
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
      overlaysRef.current.forEach((overlay) => overlay.setMap(null))
      customOverlay.setMap(map)
      overlaysRef.current = [customOverlay]

      if (selectedMarker) {
        selectedMarker.setImage(
          new window.kakao.maps.MarkerImage(
            unselectedMarkerImage,
            markerImageSize,
            markerImageOption
          )
        )
      }

      marker.setImage(
        new window.kakao.maps.MarkerImage(
          selectedMarkerImage,
          markerImageSize,
          markerImageOption
        )
      )

      setSelectedMarker(marker)
    })

    return marker
  }

  useEffect(() => {
    if (map && markers.length > 0) {
      console.log("Markers to display:", markers)
      markersRef.current.forEach((marker) => marker.setMap(null))
      overlaysRef.current.forEach((overlay) => overlay.setMap(null))
      markersRef.current = []
      overlaysRef.current = []
      markers.forEach((location, index) => {
        const marker = createMarker(map, location, index)
        markersRef.current.push(marker)
      })
    }
  }, [map, markers])

  // 현재 위치 마커 생성
  useEffect(() => {
    if (map && currentPosition) {
      const markerImageSrc = currentLocationImage
      const markerImageSize = new window.kakao.maps.Size(25, 25)
      const markerImageOption = { offset: new window.kakao.maps.Point(12, 35) }
      const markerImage = new window.kakao.maps.MarkerImage(
        markerImageSrc,
        markerImageSize,
        markerImageOption
      )

      const currentMarker = new window.kakao.maps.Marker({
        map: map,
        position: currentPosition,
        image: markerImage,
      })

      return () => {
        currentMarker.setMap(null)
      }
    }
  }, [map, currentPosition])

  const handleDropdownClick = (value) => {
    setDistance(value)
    setIsDropdownOpen(false)
  }

  return (
    <div style={{ width: "100%", height: "175vh", position: "relative" }}>
      <div className="dropdown" onClick={() => setIsDropdownOpen(true)}>
        <label>내 주변 {distance}km</label>
      </div>
      {isDropdownOpen && (
        <div className="dropdown-modal">
          <div className="dropdown-content">
            {[20, 30, 50, 100].map((value) => (
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
