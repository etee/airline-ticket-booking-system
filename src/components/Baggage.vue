<template>
  <div class="baggage-selection">
    <div
      v-for="option in baggageOptions"
      :key="option.value"
      :class="['baggage-card', { selected: selectedBaggage.value === option.value }]"
      @click="selectBaggage(option)"
    >
      <p>{{ option.label }}</p>
      <p>{{ option.price }} INR</p>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    selectedBaggage: {
      type: Object,
      required: true,
      default: () => ({value: '', price: 0})
    }
  },
  emits: ['selectBaggage'],
  setup(props, {emit}) {
    const baggageOptions = ref([
      { value: '0', label: 'No Baggage', price: 0 },
      { value: '1650', label: '3 kg', price: 1650 },
      { value: '2750', label: '5 kg', price: 2750 },
      { value: '5495', label: '10 kg', price: 5495 },
    ]);

    const selectedBaggage = ref(props.selectedBaggage);

    watch(() => props.selectedBaggage, (newVal) => {
      selectedBaggage.value = newVal;
    });
    
    const selectBaggage = (value) => {
      selectedBaggage.value = value
      emit('selectBaggage', value)
    };

    return {
      selectedBaggage, baggageOptions, selectBaggage
    };
  }
}
</script>

<style scoped>
.baggage-selection {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
.baggage-card {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  flex: 1;
}
.baggage-card.selected {
  background-color: var(--primary);
  color: white;
}
.baggage-card.selected p{
 color:white
}
</style>