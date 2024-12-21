import { ref, computed, onMounted } from 'vue';
import { fetchDestinationsByTag } from '../models/TopicModel';
import { fetchCities } from '../models/CityModel';
import { getTags } from '../models/TagModel';

export default function (topicName) {
  const topicId = ref(null);
  const destinations = ref([]);
  const tags = ref([]);
  const cities = ref([]);

  // Các button và lựa chọn từ Model
  const selectedIndex = ref(null); // Biến lưu chỉ mục duy nhất của nút đang được chọn

  const selectButton = (index) => {
    const actualIndex = index; // Tính chỉ số thực tế trong mảng buttons
    if (selectedIndex.value === actualIndex) {
      selectedIndex.value = null; // Nếu nhấn lại nút đã được chọn, bỏ chọn nó
    } else {
      selectedIndex.value = actualIndex; // Cập nhật nút mới được chọn
    }
  };
  // Khi component được mount, tải dữ liệu
  onMounted(async () => {
    switch (topicName) {
      case 'culture':
        topicId.value = 2;
        break;
      case 'great-food':
        topicId.value = 1;
        break;
      case 'must-see-attraction':
        topicId.value = 5;
        break;
      case 'shopping':
        topicId.value = 9;
        break;
      default:
        topicId.value = 11;
        break;
    }
    const fetchedDestinations = await fetchDestinationsByTag(topicId.value);

    // Sắp xếp theo popularity_score giảm dần
    destinations.value = fetchedDestinations.sort((a, b) => b.popularity_score - a.popularity_score);
    tags.value = await getTags();
    cities.value = await loadCities();

  });


  // Hàm rút gọn mô tả sau 25 từ
  const truncatedDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 25) {
      return words.slice(0, 25).join(' ') + '...';
    }
    return description;
  };

  const loadCities = async () => {
    try {
        const cities = await fetchCities();
        return cities;
    } catch (error) {
        console.error('Error getting city list:', error);
        return [];
    }
};
const selectedCityId = ref(null); // Giá trị mặc định (null = tất cả tours)
const dropdownVisibleRegion = ref(false); // Trạng thái hiển thị dropdown
// Danh sách tours được lọc theo `selectedCityId`
const filteredDestinations = computed(() => {
  // Lọc theo thành phố và tag (nếu có)
  return destinations.value.filter(destination => {
      const matchesCity = selectedCityId.value
          ? destination.address.city_id === selectedCityId.value
          : true;

      const matchesTag = selectedIndex.value !== null
          ? destination.tags.some(tag => tag.id === selectedIndex.value)
          : true;

      return matchesCity && matchesTag;
  });
});

// Tên thành phố hiển thị trên nút dropdown
const selectedCityName = computed(() => {
    if (!selectedCityId.value) return 'Việt Nam';
    const city = cities.value.find(c => c.id === selectedCityId.value);
    return city ? city.name : 'Việt Nam';
});

// Toggle trạng thái dropdown
const toggleDropDownRegion = () => {
    dropdownVisibleRegion.value = !dropdownVisibleRegion.value;
};

// Chọn thành phố
const selectCity = (cityId) => {
    selectedCityId.value = cityId; // Cập nhật ID thành phố được chọn
    dropdownVisibleRegion.value = false; // Đóng dropdown
};

  return {
    cities,
    destinations,
    selectedIndex, selectButton,
    truncatedDescription,
    loadCities,
    tags,
    selectedCityId,
    dropdownVisibleRegion,
    filteredDestinations,
    selectedCityName,
    toggleDropDownRegion,
    selectCity,
  };
}
