<template>
  <div v-if="error">Error: {{ error }}</div>
  <div v-else-if="characters" class="list">
    <CharacterCard v-for="character in characters" :key="character.id" :character="character"/>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useFetch } from "src/composables/useFetch";
import CharacterCard from "./CharacterCard.vue";

const { data, error } = await useFetch();

const characters = computed(() => data?.results);

</script>

<style scoped>
.list{
  display: grid;
  grid-template-columns: repeat(auto-fill, 600px);
  justify-content: center;

  @media (max-width: 650px) {
      grid-template-columns: 1fr;
  }
}
</style>