import { useState } from "react";
import axios from "axios";
import { searchAddress } from "@/modules/maps/service";

const SearchBoxInMap = ({ onSelectPosition, className }) => {
  const [query, setQuery] = useState(""); // Dữ liệu tìm kiếm
  const [suggestions, setSuggestions] = useState([]); // Danh sách gợi ý
  const [isSearching, setIsSearching] = useState(false); // Trạng thái tìm kiếm

  // Hàm gọi API Nominatim để tìm kiếm địa chỉ
  const handleSearch = async (searchQuery) => {
    if (!searchQuery) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    console.log(`searchQuery: ${searchQuery}`);
    try {
      searchAddress(searchQuery).then((response) => {
        // if (response.status == 200)
        console.log(`features: ${JSON.stringify(response.features)}`)
        // su dung api nominatim
        setSuggestions(response);
        // su dung api openRouteService
        // setSuggestions(response.features.map((feature) => (
        //   {
        //     display_name: feature.properties.label,
        //     lat: feature.geometry.coordinates[1],
        //     lon: feature.geometry.coordinates[0],
        //   }
        // ) ));
      });
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Hàm xử lý khi người dùng chọn một vị trí từ danh sách
  const handleSelectPosition = (position) => {
    setQuery(position.display_name); // Cập nhật ô tìm kiếm với tên vị trí được chọn
    setSuggestions([]); // Xóa danh sách gợi ý
    console.log(`position: ${JSON.stringify(position)}`);
    onSelectPosition(position); // Gọi callback để truyền vị trí cho bản đồ
  };

  return (
    <div className={className}>
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value); // Cập nhật dữ liệu tìm kiếm
            // handleSearch(e.target.value); // Tìm kiếm khi người dùng nhập liệu
          }}
          placeholder="Tìm kiếm vị trí..."
          className="border border-gray-300 p-2 rounded mr-2"
        />
        <button type="button" onClick={() => handleSearch(query)}>Tìm kiếm</button>
      </div>
      {isSearching && <div>Đang tìm kiếm...</div>}

      <ul className="border border-gray-300 mt-2">
        {suggestions.map((suggestion, idx) => (
          <li
            key={idx}
            className="p-2 cursor-pointer hover:bg-gray-200"
            onClick={() => handleSelectPosition(suggestion)}
          >
            {suggestion.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBoxInMap;
