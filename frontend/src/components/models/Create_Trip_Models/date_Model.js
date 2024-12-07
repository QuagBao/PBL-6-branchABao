// DateModel.js
export default class DateModel {
    constructor() {
        const currentDate = new Date();
        this.year = currentDate.getFullYear(); // Năm hiện tại
        this.month = currentDate.getMonth(); // Tháng hiện tại (0 - 11)
        this.selectedDate = null; // Ngày được chọn
        this.selectedDays = 1; // Số ngày mặc định là 1
    }

    // Lấy số ngày trong tháng
    getDaysInMonth(month, year) {
        console.log(month, year);
        console.log(new Date(year, month + 1, 0).getDate());
        return new Date(year, month + 1, 0).getDate(); // Trả về số ngày trong tháng
    }

    // Lấy ngày đầu tiên của tháng (thứ mấy)
    getFirstDayOfMonth(month, year) {
        return new Date(year, month, 1).getDay();
    }

    // Lấy danh sách các ngày trong tháng
    getMonthDays(month, year) {
        const daysInMonth = this.getDaysInMonth(month, year);
        const firstDay = this.getFirstDayOfMonth(month, year);
        const days = [];

        // Điền các ngày trống (trước ngày đầu tiên của tháng)
        for (let i = 0; i < firstDay; i++) {
            days.push(null);  // Thêm null cho các ô trống
        }

        // Điền các ngày trong tháng
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }

        // Điền các ngày trống sau khi kết thúc tháng (để làm đầy lưới)
        while (days.length < 35) {
            days.push(null);
        }

        return days;
    }

    // Cập nhật tháng (next/prev)
    setMonth(newMonth) {
        this.month = newMonth;
        if (this.month < 0) {
            this.month = 11;
            this.year--;
        } else if (this.month > 11) {
            this.month = 0;
            this.year++;
        }
    }

    // Kiểm tra nếu tháng hiện tại đã qua, không cho phép chọn các tháng trước tháng hiện tại
    isMonthValid(month, year) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            return false; // Không cho phép chọn các tháng trước tháng hiện tại
        }
        return true; // Tháng hợp lệ
    }

    // Lấy tháng tiếp theo
    getNextMonth() {
        let nextMonth = this.month + 1;
        let nextYear = this.year;
        if (nextMonth > 11) {
            nextMonth = 0;
            nextYear++;
        }
        return { nextMonth, nextYear };
    }

    // Lấy tháng trước
    getPrevMonth() {
        let prevMonth = this.month - 1;
        let prevYear = this.year;
        if (prevMonth < 0) {
            prevMonth = 11;
            prevYear--;
        }
        return { prevMonth, prevYear };
    }

    // Cập nhật số ngày
    setSelectedDays(days) {
        if (days >= 1 && days <= 7) {
            this.selectedDays = days;
        }
    }
}