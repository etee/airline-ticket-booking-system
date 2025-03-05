<template>
    <div class="booking-summary">
      <h2>Review Your Flight</h2>
      <p>All flight times are shown in local time</p>
      <div class="flight-details" v-if="flight">
        <div class="flight-header">
          <img :src="getImage(flight.airline)" alt="Airline logo" />
          <p>{{ flight.airline }}</p>
        </div>
        <div class="flight-body">
          <div class="flight-departure">
            <p>{{ formatDate(flight.travelDate.seconds, 0) }}</p>
            <p>Departure: {{ flight.departure }}</p>
          </div>
          <div class="flight-duration">
            <p class="hours">{{ flight.duration }}h</p>
            <div class="line"></div>
            <p>Non stop</p>
          </div>          
          <div class="flight-arrival">
            <p>{{ formatDate(flight.travelDate.seconds, flight.duration) }}</p>
            <p>Arrival: {{ flight.arrival }}</p>
          </div>
        </div>
      </div>
      <form @submit.prevent="submitBooking">
        <input v-model="passengerName" type="text" v-bind="passengerNameAttrs" placeholder="Name" required />
        <span class="error">{{ errors.passengerName }}</span>
        <input v-model="email" type="email" v-bind="emailAttrs" placeholder="Email" required />
        <span class="error">{{ errors.email }}</span>
        <input v-model="phone" type="tel" v-bind="phoneAttrs" placeholder="Phone" required />
        <span class="error">{{ errors.phone }}</span>
        
        <div class="tabs">
          <button type="button" :class="{ active: activeTab === 'baggage' }" @click="activeTab = 'baggage'">Baggage</button>
          <button type="button" :class="{ active: activeTab === 'seat' }" @click="activeTab = 'seat'">Seat Selection</button>
          <button type="button" :class="{ active: activeTab === 'meal' }" @click="activeTab = 'meal'">Meals</button>
        </div>

        <div v-if="activeTab === 'baggage'" class="tab-content">
          <Baggage :selectedBaggage="selectedBaggage" @selectBaggage="selectBaggage"/>
        </div>
        
        <div v-if="activeTab === 'seat'" class="tab-content">
          <SelectSeat :seats="flight.seats" :selectedSeat="selectedSeat" @selectSeat="selectSeat" />
        </div>

        <div v-if="activeTab === 'meal'" class="tab-content">
          <Meal :selectedMeal="selectedMeal" @selectMeal="selectMeal"/>
        </div>

        <div class="pricing-section">
          <h3>Pricing</h3>
          <p v-if="flight && flight.price">Flight: {{ flight.price }} INR</p>
          <p>Baggage: {{ selectedBaggagePrice }} INR</p>
          <p>Seat: {{ selectedSeatPrice }} INR</p>
          <p>Meal: {{ selectedMealPrice }} INR</p>
          <p>Total: {{ totalPrice }} INR</p>
        </div>
          
        <button class="confirm-booking" type="submit">Confirm Booking</button>
      </form>
    </div>
  </template>
  
  <script>
  import Baggage from '@/components/Baggage.vue'
  import Meal from '@/components/Meal.vue'
  import SelectSeat from '@/components/SelectSeat.vue'
  import getDocument from '@/composables/getDocument'
  import { useForm } from 'vee-validate'
  import { useRouter } from 'vue-router'
  import moment from 'moment'
  import { ref, computed } from 'vue'
  import * as yup from 'yup'
  import useCollection from '@/composables/useCollection'
  import { timestamp } from '@/firebase/config'
  import store from '@/store'
  
  export default {
    props: ['id'],
    components: {
      Baggage,
      SelectSeat,
      Meal
    },
    setup(props) {
      const selectedMeal = ref({ value: '', price: 0 });
      const selectedSeat = ref({ value: '', price: 0 });
      const selectedBaggage = ref({ value: '0', price: 0 });
      const activeTab = ref('baggage');
      const { document: flight } = getDocument('flights', props.id)
      const router = useRouter()

      const { errors, handleSubmit, defineField } = useForm({
          validationSchema: yup.object({
              passengerName: yup.string().required(),
              email: yup.string().email().required(),
              phone: yup.string().required().min(10)
          }),
          
      })

      const [passengerName, passengerNameAttrs] = defineField('passengerName');
      const [email, emailAttrs] = defineField('email');
      const [phone, phoneAttrs] = defineField('phone');

      const getImage = (airline) => {
        const formattedAirline = airline.replace(/\s+/g, '-').toLowerCase();
        try {
          return require(`@/assets/images/${formattedAirline}.png`);
        } catch (e) {
          console.error('Image not found:', e);
          return '';
        }
      }

      const formatDate = (seconds, duration) => {
        if(duration) return moment(seconds + duration*60*60*1000 ).format("D MMM, HH:mm A")
        return moment(seconds).format("D MMM, HH:mm A")
      }

      const selectSeat = (seat) => {
        const {seatNo, price} = seat
        selectedSeat.value = {seatNo, price};
      };

      const selectBaggage = (baggage) => {
        selectedBaggage.value = baggage;
      };

      const selectMeal = (meal) => {
        const { price, value} = meal
        selectedMeal.value = { price, value};
      };

      const selectedBaggagePrice = computed(() => {
        return parseInt(selectedBaggage.value.price) || 0;
      });

      const selectedSeatPrice = computed(() => {
        return selectedSeat.value.price;
      });

      const selectedMealPrice = computed(() => {
        return selectedMeal.value.price;
      });

      const totalPrice = computed(() => {
        return flight?.value?.price + selectedBaggagePrice.value + parseInt(selectedSeatPrice.value) + selectedMealPrice.value;
      });
  
      const submitBooking = handleSubmit(async values => {
        try {
         console.log('Total Price:', totalPrice.value);
         const bookingData = {
            passengerName: values.passengerName,
            email: values.email,
            phone: values.phone,
            flightId: flight.value.id,
            timestamp: timestamp(),
            baggage: selectedBaggagePrice.value,
            seat: selectedSeat.value,
            meal: selectedMeal.value,
            totalPrice: totalPrice.value
          }
          await useCollection('bookings').addDocument(bookingData);
          // Store booking data in Vuex store
          store.dispatch('booking/saveBookingData', bookingData);
          // Redirect to confirmation page
          router.push('/confirmation');
          console.log(bookingData)
        } catch (error) {
          console.error('Error submitting booking', error);
        }
      });
  
      return { 
        flight, passengerName, email, phone,
        submitBooking, getImage, formatDate, selectedBaggage,
        selectedMeal, activeTab, selectSeat, selectBaggage,
        selectMeal, selectedBaggagePrice, selectedSeatPrice,
        selectedMealPrice, totalPrice, selectedSeat,
        passengerNameAttrs, emailAttrs, phoneAttrs, errors
      };
    }
  };
  </script>
  <style scoped>
    .booking-summary{
      max-width: 800px;
      margin: 0 auto;
    }
    .flight-details {
      border-radius: 10px;
      margin: 20px 0;
      background: white;
    }
    .flight-details img {
      width: 30px;
      height: 30px;
    }
    .flight-header {
      display: flex;
      align-items: center;
      background: #ebebeb;
      border-radius: 10px 10px 0 0;
      height: 40px;
      padding: 10px;
    }
    .flight-header p {
      margin: 0 0.5em;
      font-size: 0.9em;
    }
    .flight-body {
      padding: 1em;
      display: flex;
      justify-content: space-between;
      align-items: end;      
      text-align: center;
    }
    .flight-arrival, .flight-departure {
      flex: 1;
    }
    .flight-duration {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
    }
    .flight-duration .hours {
      font-size: 1.5em;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .flight-duration .line {
      width: 30%;
      height: 1px;
      background: #000;
      margin: 0 auto;
    }    
    .tabs {
      display: flex;
      justify-content: flex-start;
      margin: 20px 0;
    }
    .tabs button {
      padding: 10px 20px;
      border: none;
      background: #f0f0f0;
      cursor: pointer;
      margin-right: 10px;
    }
    .tabs button.active {
      background: var(--primary);
      color: white;
    }
    .tab-content {
      margin-top: 20px;
    }
    .confirm-booking {
      margin-top: 20px;
    }
  </style>
  