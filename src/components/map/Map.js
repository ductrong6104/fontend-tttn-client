"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  GeoJSON,
  useMap,
  Circle,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import L from "leaflet";
import SearchBoxInMap from "./SearchBoxInMap";

import { RightClickAddress } from "../contextmenu/RightClickAddress";
import { getAddressFromCoordinates } from "@/modules/maps/service";
import LocationCurrent from "./LocationCurrent";
const icon = L.icon({
  iconUrl: "/position-svgrepo-com.svg",
  iconSize: [38, 38],
});

const iconMarkerSearch = L.icon({
  iconUrl: "/position-gps-svgrepo-com.svg",
  iconSize: [20, 20],
});
// function LocationMarker() {
//   const [position, setPosition] = useState(null)
//   const map = useMapEvents({
//     click() {
//       map.locate()
//     },
//     locationfound(e) {
//       setPosition(e.latlng)
//       map.flyTo(e.latlng, map.getZoom())
//     },
//   })

//   return position === null ? null : (
//     <Marker position={position} icon={icon}>
//       <Popup>You are here</Popup>
//     </Marker>
//   )
// }
function FitBoundsToMarkers({ markers }) {
  const map = useMap();

  useEffect(() => {
    if (markers.length > 0) {
      const bounds = markers.map((marker) => [marker.lat, marker.lng]);
      map.fitBounds(bounds, { padding: [50, 50] }); // Thêm khoảng cách padding
    }
  }, [markers, map]);

  return null;
}
// Component để hiển thị Marker tại vị trí hiện tại
function LocationMarker({ onChangeAddress, onChangePosition }) {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null); // Vị trí của sub-menu
  // Reverse Geocoding: Chuyển tọa độ thành địa chỉ

  const handleMarkerContextMenu = (e, markerPosition) => {
    // e.preventDefault();
    if (menuPosition) {
      // Nếu menu đang mở thì đóng menu
      setMenuPosition(null);
    } else {
      // Nếu menu đang đóng thì mở tại vị trí click chuột
      setMenuPosition({ lat: e.clientX, lon: e.clientY, markerPosition });
    }
    console.log("menuPosition", menuPosition);
  };

  // Sử dụng useMapEvents để bắt sự kiện click
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng; // Lấy tọa độ từ lần click
      setPosition([lat, lng]); // Cập nhật vị trí Marker

      onChangePosition({ lat: e.latlng.lat, lon: e.latlng.lng });
      console.log("clickc corrdi");

      // Lấy địa chỉ từ tọa độ
      getAddressFromCoordinates(lat, lng).then((addr) => {
        setAddress(addr);
        onChangeAddress(addr);
        map.flyTo(e.latlng, map.getZoom()); // Di chuyển đến vị trí click
      });
    },
  });

  const handleSaveAddress = () => {
    const { lat, lng } = menuPosition.markerPosition;
    setPosition([lat, lng]);
    onChangePosition([lat, lng]);
    getAddressFromCoordinates(lat, lng)
      .then((addr) => {
        console.log(`Saved address: ${addr}`);
        setAddress(addr);
        onChangeAddress(addr);
        map.flyTo([lat, lng], map.getZoom()); // Di chuyển đến vị trí click

        // Ẩn menu sau khi lưu
        setMenuPosition(null);
      })
      .catch((error) => console.error("Error fetching address:", error));
  };

  // Hiển thị Marker tại vị trí đã click cùng với địa chỉ
  return position === null ? null : (
    <div>
      <Marker
        position={position}
        icon={icon}
        eventHandlers={{
          contextmenu: (e) => handleMarkerContextMenu(e, position), // Sự kiện nhấp chuột phải
        }}
      >
        <Popup>
          <span>Bạn đang ở vị trí: {address}</span>
          <br />
          <span>
            Tọa độ: {position[0]}, {position[1]}
          </span>
        </Popup>
      </Marker>
      {menuPosition && (
        <RightClickAddress
          lat={menuPosition.lat}
          lon={menuPosition.lon}
          onSaveAddress={handleSaveAddress}
        />
      )}
    </div>
  );
}

const Map = ({ addresses, onChangeAddress, onChangePosition, defaultPosition }) => {
  // const defaultPosition = [10.8535886, 106.7878561]; // Tọa độ mặc định
  const [route, setRoute] = useState([]);
  const [position, setPosition] = useState([]);
  const [geoJsonData, setGeoJsonData] = useState();
  const [installationLocation, setInstallationLocation] = useState("");
  const mapRef = useRef(); // Tham chiếu tới bản đồ
  useEffect(() => {
    setPosition(defaultPosition);


  }, [defaultPosition])
  // Callback khi chọn vị trí từ SearchBox
  const handleSelectPosition = (position) => {
    // const { lat, lon } = position; // Lấy tọa độ từ đối tượng position
    setPosition({
      lat: position.lat,
      lon: position.lon,
      display_name: position.display_name,
    }); // Cập nhật vị trí cho bản đồ
    setInstallationLocation(position.display_name);
    onChangeAddress(position.display_name);
    onChangePosition({
      lat: position.lat,
      lon: position.lon,
      display_name: position.display_name,
    });
    // Di chuyển bản đồ đến vị trí được chọn
    if (mapRef.current) {
      const map = mapRef.current;
      map.flyTo([position.lat, position.lon], 13);
    }
  };
  useEffect(() => {
    if (addresses.length > 1) {
      // Sử dụng một thuật toán để tìm đường đi ngắn
      const calculateShortestPath = () => {
        const sortedAddresses = addresses.sort((a, b) => a.id - b.id); // Cần áp dụng thuật toán tối ưu TSP
        // setRoute(sortedAddresses.map(a => [a.latitude, a.longitude]));
      };
      calculateShortestPath();
    }
  }, [addresses]);

  useEffect(() => {
    const fetchRoute = async () => {
      if (addresses.length < 2) {
        // Nếu không có đủ địa chỉ, không gọi API
        return;
      }
      const apiKey = "5b3ce3597851110001cf62485936d4d08ca54de09753cea13e91c09f"; // Thay thế bằng API key của bạn
      const start = `${addresses[0].longitude},${addresses[0].latitude}`;
      const end = `${addresses[1].longitude},${addresses[1].latitude}`;

      //   const start = "8.681495,49.41461";
      //   const end = "8.687872,49.420318";
      //   console.log(`start${start}, end${end}`)
      //   return;
      // const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start}&end=${end}`;
      const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}`;
      console.log(`url: ${url}`);
      const coordinates = addresses.map(({ latitude, longitude }) => [
        latitude,
        longitude,
      ]);

      console.log(JSON.stringify(coordinates));
      // console.log(`addresses in Mapjs: ${JSON.stringify(addresses)}`);
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Accept:
              "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
          },

          body: JSON.stringify({
            coordinates: coordinates,
            radiuses: [10000, -1, 30],
          }),
        });

        // console.log(`response${JSON.stringify(response)}`)
        // Lấy đường đi từ response
        // const data = await response.json();
        const data = await response.json();
        console.log(`data ${JSON.stringify(data)}`);
        // Kiểm tra đúng cấu trúc của GeoJSON
        if (data && data.features) {
          setGeoJsonData(data);
          // Tính toán bounds để di chuyển bản đồ tới phạm vi chứa tuyến đường
          const coordinates = data.features[0].geometry.coordinates;
          const bounds = coordinates.map((coord) => [coord[1], coord[0]]); // Đảo ngược tọa độ để phù hợp với Leaflet

          // Di chuyển tới phạm vi chứa tuyến đường
          if (mapRef.current) {
            mapRef.current.fitBounds(bounds);
          }
        }
        // const routeCoordinates = response.data.features[0];
        // console.log(`routeCoordinates${JSON.stringify(routeCoordinates)}`)
      } catch (error) {
        console.error("Error fetching the route:", error);
      }
    };

    fetchRoute();
  }, [addresses]);
  const [query, setQuery] = useState(""); // Dữ liệu tìm kiếm
  // const [suggestions, setSuggestions] = useState([]); // Danh sách gợi ý
  const [isSearching, setIsSearching] = useState(false); // Trạng thái tìm kiếm
  const handleSearch = async (searchQuery) => {
    if (!searchQuery) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    console.log(`searchQuery: ${searchQuery}`);
    try {
      const url = `https://api.openrouteservice.org/geocode/search?api_key=5b3ce3597851110001cf62485936d4d08ca54de09753cea13e91c09f&text=${searchQuery}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept:
            "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
        },
      });
      console.log(`url search open service ${url}`);
      // const url = `https://nominatim.openstreetmap.org/search?q=${searchQuery}&format=json&polygon_kml=1&addressdetails=1`
      //   const url = `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}&addressdetails=1&limit=5`;
      //   const response = await axios.get(url);
      const data = await response.json();
      console.log(`response.data: ${JSON.stringify(data)}`);
      setGeoJsonData(data);
      //   setSuggestions(response.data); // Cập nhật danh sách gợi ý từ kết quả API
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsSearching(false);
    }
  };
  // Hàm custom pointToLayer để tạo Marker với custom icon
  const pointToLayer = (feature, latlng) => {
    return L.marker(latlng, { icon: iconMarkerSearch }); // Sử dụng custom icon
  };
  const onSubmit = () => {
    console.log(`position ${JSON.stringify(position)}`);
    console.log(`address: ${installationLocation}`);
  };
  return (
    <div>
      {/* <div className="mb-2">
        <label className="mr-2">Vị trí cấp điện</label>
        <input type="text" value={installationLocation}></input>
        <button onClick={onSubmit}>Xác nhận</button>
      </div> */}
      <div className="flex mt-2">
        <MapContainer
          // center={[addresses[0]?.latitude, addresses[0]?.longitude]}
          center={defaultPosition}
          zoom={13}
          style={{ height: "500px", width: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {addresses &&
            addresses.map((address, idx) => (
              <Marker
                key={idx}
                position={[address.latitude, address.longitude]}
                icon={icon}
              >
                {/* <Image width={40} height={40} src="/position-svgrepo-com.svg" alt="icon-position"></Image> */}
                <Circle
                  center={[address.latitude, address.longitude]}
                  radius={10}
                  pathOptions={{ fillColor: "red" }}
                  stroke={false}
                ></Circle>
                <Popup>
                  <span className="text-red-500">
                    Mã đồng hồ: {address.powerMeterId}
                    <br /> Vị trí lắp đặt: {address.installationLocation}
                    <br /> Chỉ số cũ: {address.oldIndex}
                  </span>
                </Popup>
              </Marker>
            ))}
          {geoJsonData && (
            <GeoJSON data={geoJsonData} pointToLayer={pointToLayer} />
          )}
          <LocationMarker
            onChangeAddress={onChangeAddress}
            onChangePosition={onChangePosition}
          />
          {/* <LocationCurrent></LocationCurrent> */}
          {/* Hiển thị marker tại vị trí đã chọn */}
          <FitBoundsToMarkers markers={[position]} />
          <Marker position={position} icon={icon}>
            <Popup>
              <span>Bạn đang ở vị trí: {position.display_name}</span>
              <br />
              <span>
                Tọa độ: {position.lat}, {position.lon}
              </span>
            </Popup>
          </Marker>
        </MapContainer>
        <SearchBoxInMap
          onSelectPosition={handleSelectPosition}
          className="w-1/3 ml-2"
        ></SearchBoxInMap>
      </div>
    </div>
  );
};

export default Map;
