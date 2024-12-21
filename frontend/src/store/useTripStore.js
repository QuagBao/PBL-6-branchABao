import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTripStore = defineStore('trip', {
    state: () => ({
        name: '',
        cityId: 0,
        selectedDestination: () => ({ id: null, name: '' }),
        selectedLength: 1,
        selectedMonth: null,
        selectedTags:  [],
        listDestination: [],
        userId: 4,
        description: '',
        ids_destination: '',
    }),
    actions: {
        setName(name) {
            this.name = name;
        },
        setCity(cityId) {
            this.cityId = cityId;
        },
        setDescription(description) {
            this.description = description;
        },
        setSelectedDestination(destination) {
            this.selectedDestination = JSON.parse(JSON.stringify(destination));
        },
        setSelectLength(length) {
            this.selectedLength = length;
        },
        setSelectedMonth(month) {
            this.selectedMonth = month;
        },
        setSelectTags(tags) {
            this.selectedTags = [...tags]; // Gán trực tiếp mảng mới
        },

        setListDestination(listDestination) {
            this.listDestination = [...listDestination];
        },
        setDestinationIds() {
            this.ids_destination = this.listDestination.slice().join(', ');
            this.ids_destination = this.ids_destination.split(', ').map(id => id.trim());
        },
        setUserId(userId) {
            this.userId = userId;
        },
        getAllInformation(){
            return {
                setCity: this.cityId,
                name: this.name,
                selectedDestination: this.selectedDestination,
                selectedLength: this.selectedLength,
                selectedMonth: this.selectedMonth,
                selectedTags: this.selectedTags,
                listDestination: this.listDestination,
                userId: this.userId,
                description: this.description,
                ids_destination: this.ids_destination,
            }
        }
    }
});
