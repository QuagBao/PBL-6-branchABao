// FilterViewModel.js
import FilterOptionModel from '../models/FilterOptionModel';

export default class FilterViewModel {
    constructor() {
        // Khởi tạo các tùy chọn cho từng nhóm filter
        this.establishmentTypes = [
            new FilterOptionModel('restaurant', 'Restaurant'),
            new FilterOptionModel('coffee-tea', 'Coffee & Tea'),
            new FilterOptionModel('bar-pubs', 'Bar & Pubs'),
            new FilterOptionModel('dessert', 'Dessert'),
            new FilterOptionModel('bakeries', 'Bakeries'),
            new FilterOptionModel('delivery-only', 'Delivery Only'),
        ];

        this.meals = [
            new FilterOptionModel('breakfast', 'Breakfast'),
            new FilterOptionModel('brunch', 'Brunch'),
            new FilterOptionModel('lunch', 'Lunch'),
            new FilterOptionModel('dinner', 'Dinner'),
        ];

        this.currency = 'VND';
        this.minPrice = 0;
        this.maxPrice = 0;
    }

    // Phương thức toggle chọn/bỏ chọn cho các tùy chọn của Establishment Type
    toggleEstablishmentType(id) {
        const option = this.establishmentTypes.find((item) => item.id === id);
        if (option) option.selected = !option.selected;
    }

    // Phương thức toggle chọn/bỏ chọn cho các tùy chọn của Meals
    toggleMeal(id) {
        const option = this.meals.find((item) => item.id === id);
        if (option) option.selected = !option.selected;
    }

    // Phương thức cập nhật currency
    updateCurrency(currency) {
        this.currency = currency;
    }

    // Phương thức cập nhật giá trị Min và Max Price
    updatePriceRange(minPrice, maxPrice) {
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
    }
}
