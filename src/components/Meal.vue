<template>
    <div class="meal-selection">
      <div
        v-for="meal in mealOptions"
        :key="meal.value"
        :class="['meal-card', { selected: selectedMeal.value === meal.value }]"
        @click="selectMeal(meal)"
      >
        <img :src="meal.image" :alt="meal.label" class="meal-image" />
        <p>{{ meal.label }}</p>
        <p>{{ meal.price }} INR</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  
  export default {
    props: {
        selectedMeal: {
        type: Object,
        required: true,
        default: () => ({ value: '', price: 0 })
        }
    },
    emits: ['selectMeal'],
    setup(props, { emit }) {
      const mealOptions = ref([
        { value: 'vegetarian', label: 'Vegetarian Meal', price: 450, image: require('@/assets/images/vegetarian.jpeg') },
        { value: 'non-vegetarian', label: 'Non-Vegetarian Meal', price: 600, image: require('@/assets/images/non-vegetarian.jpg') },
        { value: 'vegan', label: 'Vegan Meal', price: 350, image: require('@/assets/images/vegan.jpg') },
      ]);
      const selectedMeal = ref(props.selectedMeal);

      watch(() => props.selectedMeal, (newVal) => {
        selectedMeal.value = newVal;
    });
  
      const selectMeal = (meal) => {
        selectedMeal.value = meal;
        emit('selectMeal', meal);
      };
  
      return {
        selectedMeal, mealOptions, selectMeal
      };
    }
  };
  </script>
  
  <style scoped>
  .meal-selection {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  .meal-card {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    flex: 1;
  }
  .meal-card.selected {
    background-color: var(--primary);
    color: white;
  }
  .meal-card.selected p{
    color: white;
  }
  .meal-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-bottom: 10px;
  }
  </style>