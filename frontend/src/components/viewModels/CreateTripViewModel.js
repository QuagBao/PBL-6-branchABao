import { ref, onMounted, watch, nextTick } from 'vue';
import { fetchDestinationsByCity, addTour as addTourAPI } from '../models/CreateTripModel';
