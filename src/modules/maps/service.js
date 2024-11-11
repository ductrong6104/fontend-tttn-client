import api from '@/utils/api';
export const searchAddress = async (address) => {
    try {
      const api_key = process.env.NEXT_PUBLIC_API_KEY_MAP;
        const response = await api.get(`https://nominatim.openstreetmap.org/search?q=${address}&format=json&polygon_kml=1&addressdetails=1`);
        // const response = await api.get(`https://api.openrouteservice.org/geocode/search?api_key=${api_key}&text=${address}`)
        console.log(`response.data: ${JSON.stringify(response.data)}`)
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}

export const getAddressFromCoordinates = async (lat, lon) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.display_name; // Trả về địa chỉ
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Không thể lấy địa chỉ";
    }
  };