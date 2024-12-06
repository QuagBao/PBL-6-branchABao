// DateViewModel.js
import DateModel from '../../models/Create_Trip_Models/date_Model.js';

export default class DateViewModel {
    constructor() {
        this.model = new DateModel();  // Tạo một Model mới
        const currentDate = new Date();
        this.currentMonth = currentDate.getMonth(); // Tháng hiện tại (0 - 11)
        this.currentYear = currentDate.getFullYear(); // Năm hiện tại
    }

    // Lấy danh sách các ngày trong tháng hiện tại
    getMonthDays() {
        return this.model.getMonthDays(this.model.month, this.model.year);
    }

    // Lấy danh sách các ngày trong tháng trước
    getPrevMonthDays() {
        const { prevMonth, prevYear } = this.model.getPrevMonth();
        return this.model.getMonthDays(prevMonth, prevYear);
    }

    // Lấy danh sách các ngày trong tháng sau
    getNextMonthDays() {
        const { nextMonth, nextYear } = this.model.getNextMonth();
        console.log('Da goi toi ham NextMonth', nextMonth, nextYear);
        return this.model.getMonthDays(nextMonth, nextYear);
    }

    // Lấy tên tháng hiện tại
    getCurrentMonthName() {
        const months = [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ];
        return months[this.model.month];
    }

    // Lấy hết tên tháng 
    getAllMonthNames() {
        return [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ];
    }

    // Lấy tên tháng tiếp theo
    getNextMonthName() {
        const months = [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ];
        const { nextMonth } = this.model.getNextMonth();
        return months[nextMonth];
    }

    // Lấy năm hiện tại
    getCurrentYear() {
        return this.model.year;
    }

    // Lấy năm của tháng tiếp theo
    getNextYear() {
        const { nextYear } = this.model.getNextMonth();
        return nextYear;
    }

    // Cập nhật tháng cho Model khi chuyển tháng
    updateMonth(direction) {
        if (direction === 'next') {
            this.model.setMonth(this.model.month + 1);
        } else if (direction === 'prev' && this.model.isMonthValid(this.model.month - 1, this.model.year)) {
            this.model.setMonth(this.model.month - 1);
        }
    }

    // Lấy số ngày đã chọn
    getSelectedDays() {
        return this.model.selectedDays;
    }

    // Cập nhật số ngày đã chọn
    setSelectedDays(days) {
        this.model.setSelectedDays(days);
    }
}
