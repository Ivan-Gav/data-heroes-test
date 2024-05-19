<template>
  <div v-if="error">Error: {{ error }}</div>
  <div v-else-if="characters">
    <div class="list">
      <CharacterCard
        v-for="character in characters"
        :key="character.id"
        :character="character"
      />
    </div>
    <PaginationControls :page="currentPage" :total-pages="data?.info?.pages || 1" :is-loading="!!data ? false : true" @page-change="(page)=>{handlePageChange(page)}"/>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useFetch } from "src/composables/useFetch";
import CharacterCard from "./CharacterCard.vue";
import PaginationControls from "src/components/PaginationControls.vue";

const currentPage = ref(1)

const { data, error } = await useFetch({ page: currentPage.value });

const handlePageChange = (page: number) => {
  currentPage.value = page
}

const characters = computed(() => data?.results);
</script>

<style scoped>
.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 600px);
  justify-content: center;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
}
</style>
