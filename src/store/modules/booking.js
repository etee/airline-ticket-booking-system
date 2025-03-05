const state = {
    bookingData: null
  };
  
  const mutations = {
    setBookingData(state, bookingData) {
      state.bookingData = bookingData;
    }
  };
  
  const actions = {
    saveBookingData({ commit }, bookingData) {
      commit('setBookingData', bookingData);
    }
  };
  
  const getters = {
    bookingData: (state) => state.bookingData
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };