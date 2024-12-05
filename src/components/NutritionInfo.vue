<template>
  <div>
    <h1>Nutrition Information</h1>
    <div v-if="nutritionInfo">
      <h2>Nutrition Details:</h2>
      <pre>{{ nutritionInfo }}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['recipeUrl']),
  },
  data() {
    return {
      nutritionInfo: null,
    };
  },
  async mounted() {
    if (this.recipeUrl) {
      try {
        console.info("영양정보 불러오기!")
        const response = await axios.get('http://localhost:8080/api/edamam/nutrition', {
          params: { recipeUrl: this.recipeUrl },
        });
        this.nutritionInfo = response.data;
      } catch (error) {
        console.error('Error retrieving nutrition info:', error);
      }
    }
  },
};
</script>
