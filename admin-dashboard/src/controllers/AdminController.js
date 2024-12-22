import { get_ratings_of_cities } from "../models/AdminDashboardModel.js";

export default function () {
    const getRatingsOfCities = async () => {
        return await get_ratings_of_cities();
    };
    return {
        getRatingsOfCities,
    };
}