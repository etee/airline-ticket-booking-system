import { auth } from '@/firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { createStore } from 'vuex'
import booking from './modules/booking'

export default createStore({
  state: {
    user: null,
    flights: [],
    selectedFlight: null,
    passengerDetails: {
      name: '',
      email: '',
      phone: ''
    },
    bookingSummary: {
      totalPrice: 0
    }
  },
  modules: {
    booking
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setFlights(state, flights) {
      state.flights = flights
    },
    setSelectedFlight(state, flight) {
      state.selectedFlight = flight
    },
    setPassengerDetails(state, details) {
      state.passengerDetails = details
    },
    setBookingSummary(state, summary) {
      state.bookingSummary = summary
    }
  },
  actions: {
    listenAuthState({ commit }) {
      onAuthStateChanged(auth, (user) => {
        commit('setUser', user)
      })
    }
  }
})
