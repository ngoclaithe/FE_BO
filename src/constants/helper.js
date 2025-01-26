// File: src/constants/helper.js
export const getAddressFromCoordinates = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      {
        headers: {
          'User-Agent': 'giaongay.cloud'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch address');
    }

    const data = await response.json();
    
    if (!data.address) {
      return 'Địa chỉ không xác định';
    }

    const addressParts = [];
    if (data.address.road) addressParts.push(data.address.road);
    if (data.address.village) addressParts.push(data.address.village);
    if (data.address.city) addressParts.push(data.address.city);
    if (data.address.county) addressParts.push(data.address.county);
    if (data.address.state) addressParts.push(data.address.state);
    if (data.address.country) addressParts.push(data.address.country);

    return addressParts.join(', ') || data.display_name || 'Địa chỉ không xác định';
    
  } catch (error) {
    console.error('Geocoding error:', error);
    return 'Không thể lấy địa chỉ';
  }
};