<template>
  <div class="flight-list">
    <div v-if="flights.length === 0">No flights found</div>
    <div v-else>
      <div class="flight-count">{{ filteredFlights.length }} flights found</div>
      <div v-for="flight of filteredFlights" :key="flight.id" class="flight-card">
        <div class="flight-info">
            <div class="flight-header">
            <h3 class="airline">{{ flight.airline }}</h3>
            <p class="price">₹{{ flight.price }}</p>
          </div>
          <div class="flight-details">
            <div class="flight-detail">
              <p class="label">Departure:</p>
              <p class="value">{{ flight.departure }}</p>
            </div>
            <div class="flight-detail">
              <p class="label">Arrival:</p>
              <p class="value">{{ flight.arrival }}</p>
            </div>
            <div class="flight-detail">
              <p class="label">Travel Date:</p>
              <p class="value">{{ formatDate(flight.travelDate.seconds) }}</p>
            </div>
          </div>
        </div>
        <router-link :to="'/booking/' + flight.id">Book Now</router-link>
      </div>
    </div>
  </div>
</template>

  
<script>
import moment from 'moment';
import { computed } from 'vue';

export default {
  props: ["flights", "numPassengers"],
  setup(props) {
    const formatDate = (seconds) => {
        return moment(seconds).format("D MMM, HH:mm A")
    }
    const filteredFlights = computed(() => {
      return props.flights.value.filter(flight => {
        const availableSeats = Object.values(flight.seats).filter(status => status.available).length
        return availableSeats >= props.numPassengers
      })
    })

    return { formatDate, filteredFlights }
  }
};
</script>

<style scoped>
.flight-list {
  padding: 20px 0px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}

.no-flights {
  text-align: center;
  font-size: 18px;
  color: #ff0000;
}

.flight-count {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
}

.flight-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.flight-info {
  display: flex;
  flex-direction: column;
}

.flight-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.airline {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}
.price {
  font-size: 20px;
  font-weight: bold;
  color: #ff5722;
}

.flight-details {
  display: flex;
  flex-direction: column;
}

.flight-detail {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.label {
  font-weight: bold;
  color: #555;
}

.value {
  color: #333;
}

.book-now {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #ff5722;
  color: #fff;
  text-align: center;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
}

.book-now:hover {
  background-color: #e64a19;
}
</style>