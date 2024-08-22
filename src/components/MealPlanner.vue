<template>
    <div>
      <h1>Meal Planner</h1>
      <input v-model="dietType" placeholder="Enter diet type (e.g., vegan, keto)" />
      <button @click="getMealPlan">Get Meal Plan</button>
  
      <div v-if="mealPlan">
        <h2>Meal Plan:</h2>
        <pre>{{ mealPlan }}</pre>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        dietType: '',
        mealPlan: null,
      };
    },
    methods: {
      async getMealPlan() {
        try {
          const response = await axios.get('http://localhost:8080/api/edamam/meal-planner', {
            params: { dietType: this.dietType },
          });
          this.mealPlan = response.data;
        } catch (error) {
          console.error('Error retrieving meal plan:', error);
        }
      },
    },
  };
  </script>
  