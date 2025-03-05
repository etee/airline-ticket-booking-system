<template>
  <div class="home">
    <h1>Hi there, book your flight tickets seamlessly</h1>
    <form @submit.prevent="searchFlights">
      <!-- <div class="trip-type">
        <button>One way</button>
        <button>Round trip</button>
      </div> -->
      <div>
        <label for="departure">Departure</label>
        <input 
          type="text" 
          name="departure" 
          id="departure"
          v-model="departure" 
          v-bind="departureAttrs"
        />
        <div class="error" v-if="errors.departure">{{ errors.departure }}</div>
      </div>

      <div>
        <label for="arrival">Arrival</label>
        <input 
          type="text" 
          name="arrival" 
          id="arrival"
          v-model="arrival" 
          v-bind="arrivalAttrs"
        />
        <div class="error" v-if="errors.arrival">{{ errors.arrival }}</div>
      </div>
      
      <div>
        <label for="travelDate">Travel Date</label>
        <input 
          type="date" 
          id="travelDate"
          v-model="travelDate"
          name="travelDate"
          v-bind="travelDateAttrs" 
          :min="today"
        />
        <div class="error" v-if="errors.travelDate">{{ errors.travelDate }}</div>
      </div>

      <div>
        <label for="numPassengers">Passengers</label>
        <input 
          type="number" 
          id=""
          v-model="numPassengers" 
          placeholder="Passengers" 
          name="numPassengers"
          v-bind="numPassengersAttrs"
        />
        <div class="error" v-if="errors.numPassengers">{{ errors.numPassengers }}</div>
      </div>

      <button type="submit" :disabled="!isFormValid">Search Flights</button>
    </form>
    <FlightList :flights="flights" :numPassengers="numPassengers"/>
  </div>
</template>

<script>
import { useForm } from 'vee-validate' 
import * as yup from 'yup'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex';
import { Timestamp, where } from 'firebase/firestore';
import getCollection from '@/composables/getCollection';
import FlightList from '@/components/FlightList.vue';
import moment from 'moment';

export default {
  name: "HomeView",
  components: {
    FlightList
  },
  setup() {

    // Vuex Store access
    const store = useStore()
    const flights = ref([])
    const today = ref(null)

    // Using useField hook for validation
    const { errors, handleSubmit, defineField, meta } = useForm({
      validationSchema: yup.object({
        departure: yup.string().required('Departure is required'),
        arrival: yup.string().required('Arrival is required'),
        travelDate: yup.date().required('Travel Date is required').typeError('Invalid date format'),
        numPassengers: yup.number().required('Number of Passengers is required').min(1, 'At least one passenger is required')
      })
    })
    const [departure, departureAttrs] = defineField('departure')
    const [arrival, arrivalAttrs] = defineField('arrival')
    const [travelDate, travelDateAttrs] = defineField('travelDate')
    const [numPassengers, numPassengersAttrs] = defineField('numPassengers')

    // methods

    const searchFlights = handleSubmit(async () => {
      if (departure.value && arrival.value && travelDate.value && numPassengers.value) {
        // Convert travelDate to Firebase Timestamp
        const travelDateTimestamp = Timestamp.fromDate(new Date(travelDate.value))

        // Fetch flights from Firestore
        const flightSearchQuery = [
          where('departure', '==', departure.value),
          where('arrival', '==', arrival.value),
          where('travelDate', '>=', travelDateTimestamp)
        ]
        const { documents } = await getCollection('flights', flightSearchQuery)
        flights.value = documents        
        store.commit('setFlights', flights)
      } else {
        console.error('One or more search parameters are undefined')
      }
    })

    onMounted(() => {
      today.value = moment(new Date()).format("YYYY-MM-DD")
    })
    

    const isFormValid = computed(() => meta.value.valid)

    return {
      departure, arrival, travelDate, numPassengers,
      departureAttrs, arrivalAttrs, travelDateAttrs, numPassengersAttrs,
      errors, searchFlights, isFormValid, flights, today
    }
  }
};
</script>

<style scoped>
.home h1 {
  margin-bottom: 50px
}
.journey-dates {
  display: flex;
  justify-content: space-between;
  align-items: end;
}
.journey-dates input {
  margin-right: 10px;
}
</style>
