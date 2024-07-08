// src/KakaoMap.js
import React, { useEffect } from "react"

const KakaoMap = () => {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=331f267abebdb2ee317f9654a3c69c0b&autoload=false`
    script.onload = () => {
      window.kakao.maps.load(() => {
        console.log("KakaoMap loaded")
        const mapContainer = document.getElementById("map")
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        }
        new window.kakao.maps.Map(mapContainer, mapOption)
      })
    }
    document.head.appendChild(script)
  }, [])

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
    </div>
  )
}

export default KakaoMap
