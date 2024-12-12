import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTripStore = defineStore('trip', {
    state: () => ({
        name: '',
        selectedDestination: () => ({ id: null, name: '' }),
        selectedLength: 1,
        selectedMonth: null,
        selectedTags:  [],
        listDestination: [],
        userId: 4,
        description: 'Quá là tuyệt vời ',
        ids_destination: '',
    }),
    actions: {
        setName(name) {
            this.name = name;
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
            this.selectedTags = JSON.parse(JSON.stringify(tags)); // deep copy tags;
        },

        setListDestination(listDestination) {
            this.listDestination = Object.values(listDestination);
        },
        setDestinationIds() {
            this.ids_destination = this.listDestination.slice().join(', ');
            this.ids_destination = this.ids_destination.split(', ').map(id => id.trim());
        },
    }
});
