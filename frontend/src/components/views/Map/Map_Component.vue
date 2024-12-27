<template>
    <div class="map-container">
        <div v-if="!selectedLocations.length" class="loading-spinner">
            <p class="p-4">Loading Map...</p>
        </div>
        <div id="map"></div>
    </div>
</template>

<script>
import maplibregl from 'maplibre-gl';

export default {
    props: {
        selectedLocations: {
            type: Array,
            default: () => [] // Danh sách các địa điểm
        }
    },
    data() {
        return {
            map: null,
            apiUrl: 'https://rsapi.goong.io',
            mapUrl: 'https://tiles.goong.io/assets/',
            apiKey: 'ArPlUISaEBAdJFTABi9dcNGcue8WQ4cOAuGcNoBE',
            mapKey: 'tLyW2vk0aY3yfQLu8ZPy986mAgaW8igMYufv3BLY',
            zoom: 16 // Độ zoom mặc định
        };
    },
    mounted() {
        console.log('Mounted: Initial selectedLocations:', this.selectedLocations);
        if (this.selectedLocations.length > 0) {
            console.log('Calling initMap directly');
            this.initMap();
        } else {
            console.log('Watching for selectedLocations updates');
            this.$watch(
                'selectedLocations',
                (newLocations) => {
                    console.log('Updated selectedLocations:', newLocations);
                    if (newLocations.length > 0) {
                        console.log('Calling initMap from watcher');
                        this.initMap();
                    }
                },
                { immediate: true }
            );
        }
    },
    watch: {
        selectedLocations: {
            handler(newLocations) {
                console.log('Watcher triggered with new locations:', newLocations);
                if (!this.map && newLocations.length > 0) {
                    console.log('Calling initMap from watcher');
                    this.initMap();
                } else if (this.map && newLocations.length > 0) {    
                    console.log('Adding markers to existing map');
                    this.addMarkers(newLocations);
                }
            },
            immediate: true,
            deep: true,
        }
    },
    methods: {
        initMap() {
            const defaultCenter = this.selectedLocations[0] || [108.2434152, 16.0562963];
            console.log('InitMap started');
            this.map = new maplibregl.Map({
                container: 'map',
                style: `${this.mapUrl}goong_map_web.json?api_key=${this.mapKey}`,
                center: defaultCenter,
                zoom: this.zoom,
            });
            console.log('Map instance created:', this.map);
            this.map.on('load', () => {
                if (this.selectedLocations.length > 0) {
                    console.log('Selected Locations in MapComponent(child):', this.selectedLocations);
                    this.addMarkers(this.selectedLocations);
                }
            });
        },
        addMarkers(locations) {
            const features = locations.map((location, index) => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: location
                },
                properties: {
                    id: index + 1 // Số thứ tự
                }
            }));

            const geojsonData = {
                type: 'FeatureCollection',
                features: features
            };
            // Nếu nguồn đã tồn tại, chỉ cần cập nhật dữ liệu
            if (this.map.getSource('markers-source')) {
                this.map.getSource('markers-source').setData(geojsonData);
            } else {
                // Nếu chưa tồn tại, tạo mới nguồn
                this.map.addSource('markers-source', {
                    type: 'geojson',
                    data: geojsonData
                });
            }

            features.forEach((feature, index) => {
                const markerId = `marker-${index + 1}`; // Số thứ tự
                if (!this.map.hasImage(markerId)) {
                    // Tạo marker SVG với số thứ tự
                    const svgElement = `
                        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.0074 5.02083C17.2556 3.14583 14.6793 2 12 2C9.3207 2 6.74444 3.04167 4.99259 5.02083C3.54989 6.6875 2.82854 8.77083 3.03464 10.8542C3.03464 11.2708 3.13769 11.6875 3.24074 12C4.16819 16.375 8.9085 20.2292 10.9695 21.6875C11.2786 21.8958 11.5878 22 12 22C12.4122 22 12.7214 21.8958 13.0305 21.6875C14.9885 20.2292 19.8318 16.375 20.7593 12C20.8623 11.6875 20.8623 11.2708 20.9654 10.8542C21.1715 8.77083 20.4501 6.6875 19.0074 5.02083ZM12 13.9792C10.4542 13.9792 9.1146 12.7292 9.1146 11.0625C9.1146 9.39583 10.3512 8.14583 12 8.14583C13.6488 8.14583 14.8854 9.39583 14.8854 11.0625C14.8854 12.7292 13.5458 13.9792 12 13.9792Z" fill="#13357B"/>
                            <text x="12" y="20" font-size="8" fill="#EDF6F9" text-anchor="middle" font-family="Roboto">
                                ${feature.properties.id}
                            </text>    
                        </svg>
                    `;
                    const canvas = document.createElement('canvas');
                    canvas.width = 30;
                    canvas.height = 30;
                    const ctx = canvas.getContext('2d');
                    const svgBase64 = `data:image/svg+xml;base64,${btoa(svgElement)}`;
                    const img = new Image();
                    img.src = svgBase64;
                    img.onload = () => {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                        this.map.addImage(markerId, {
                            width: canvas.width,
                            height: canvas.height,
                            data: imageData.data
                        });
                        
                        this.map.addLayer({
                            id: `marker-layer-${index + 1}`,
                            type: "symbol",
                            source: "markers-source",
                            layout: {
                                "icon-image": markerId,
                                "icon-size": 1.5,
                                "icon-anchor": "bottom",
                            },
                            filter: ["==", "id", feature.properties.id],
                        });
                    };   
                }
            });
        },
        removeLayer(layerId) {
            if (this.map.getLayer(layerId) && layerId.startsWith('marker-layer-')) {
                this.map.removeLayer(layerId);
                console.log(`Layer ${layerId} removed successfully`);
            }
        },
        rremoveSource(sourceId) {
            if (this.map.getSource(sourceId)) {
                const layersUsingSource = this.map.getStyle().layers.filter(
                    (layer) => layer.source === sourceId
                );

                layersUsingSource.forEach((layer) => {
                    if (layer.id.startsWith('marker-layer-')) {
                        this.map.removeLayer(layer.id);
                        console.log(`Layer ${layer.id} removed successfully`);
                    }
                });

                this.map.removeSource(sourceId);
                console.log(`Source ${sourceId} removed successfully`);
            }
        }
    }
};
</script>

<style>
.map-container {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
}

#map {
    width: 100%;
    height: 100vh;
}
</style>
