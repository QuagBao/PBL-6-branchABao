import axios from "axios";
export async function addTrip(name, month_time, duration, user_id, destination_ids) {
    try {
        // Gửi request để thêm chuyến đi mới
        const response = await axios.post(
            `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/trip/`,
            {
                name: name,
                month_time: month_time,
                duration: duration,
                user_id: user_id,
                isAI: false,
            }
        );

        // Kiểm tra phản hồi từ server
        if (response.status === 200) {
            console.log("Tour added successfully");

            // Nhận dữ liệu từ response
            const tripData = response.data;
            const tripId = tripData.id; // Lấy ID của chuyến đi

            // Lặp qua từng destination_id để thêm vào chuyến đi
            for (const destination_id of destination_ids) {
                const addDestResponse = await addDestToTrip(tripId, destination_id);

                if (!addDestResponse.success) {
                    console.error(`Failed to add destination ${destination_id} to trip ${tripId}`);
                    return { success: false, message: `Failed to add destination ${destination_id}` };
                }
            }

            // Trả về kết quả thành công
            return { success: true, data: tripData };
        }
    } catch (error) {
        console.error("Error adding tour:", error);
        return { success: false, message: "Failed to add tour" };
    }
}

export async function addDestToTrip(trip_id, destination_id) {
    try {
        const response = await axios.post(
            `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/trip/add_destination`,
            {
                destination_id: destination_id,
                trip_id: trip_id,
                order: 0,
                day: 0,
            }
        );

        if (response.status === 200) {
            console.log("Destination added successfully");
            return { success: true, message: "Destination added successfully" };
        }
    } catch (error) {
        console.error("Error adding destination:", error);
        return { success: false, message: "Failed to add destination" };
    }
}

