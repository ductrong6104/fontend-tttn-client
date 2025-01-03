"use client"
import { useState } from "react"
import { Marker, Popup, useMapEvents } from "react-leaflet"
import L from "leaflet";
const icon = L.icon({
  iconUrl: "/position-man.svg",
  iconSize: [38, 38],
})
export default function LocationCurrent() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position} icon={icon}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }