<template>
  <div class="seats">
    <label>Seat Selection: {{ selectedSeat.price }} INR</label>
    <div class="seat-selection">
      <div
        v-for="(seat, index) in seats"
        :key="index"
        class="seat"
        :class="{ selected: seat.seatNo === selectedSeat.seatNo, unavailable: seat.available  }"
        @click="selectSeat(seat)"
      >
        <span>{{ seat.seatNo }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  props: ["seats", "selectedSeat"],
  emits: ["selectSeat"],
  setup(props, { emit }) {
    const selectedSeat = ref(props.selectedSeat);

    watch(
      () => props.selectedSeat,
      (newVal) => {
        selectedSeat.value = newVal;
      }
    );

    const selectSeat = (seat) => {
      selectedSeat.value = seat;
      emit("selectSeat", seat);
    };

    return {
      selectSeat,
      selectedSeat,
    };
  },
};
</script>

<style scoped>
.seat-selection {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin-top: 10px;
}
.seat {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
}
.seat.selected {
  background-color: var(--primary);
  color: white;
}
.seat.selected span {
  color: white;
}
.seat.unavailable {
  background-color: #ccc;
  color: #999;
  cursor: not-allowed;
}
.seat.unavailable span {
  color: #999;
}
</style>