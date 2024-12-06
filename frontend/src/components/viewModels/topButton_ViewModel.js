// viewModels/TopButtonViewModel.js
import { computed } from 'vue';

export default function (name) {
    console.log('Received name:', name);

    // Computed property to check if the `name` button should be displayed
    const showNameButton = computed(() => Boolean(name));

    // Array of buttons with conditional display based on `name`
    const buttons = computed(() => {
        const buttonList = [
        showNameButton.value && { label: name, key: 'name' },
        { label: 'Things to do', key: 'things-to-do' },
        { label: 'Restaurants', key: 'restaurants' },
        { label: 'Resorts & Hotels', key: 'resorts-hotels' },
        ];
        return buttonList.filter(Boolean); // Filter out any `false` entries
    });

    return {
        buttons,
        showNameButton,
    };
}
