<template>
  <div v-if="error">Error: {{ error }}</div>
  <div v-else-if="characters">
    <FilterComponent :name="filter?.name" :status="filter?.status" @filter-apply="handleFilter"/>
    <div class="list">
      <CharacterCard
        v-for="character in characters"
        :key="character.id"
        :character="character"
      />
    </div>
    <PaginationControls
      :page="currentPage"
      :total-pages="data?.info?.pages || 1"
      :is-loading="!!data ? false : true"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useFetch } from "src/composables/useFetch";
import CharacterCard from "./CharacterCard.vue";
import PaginationControls from "src/components/PaginationControls.vue";
import FilterComponent from "./FilterComponent.vue";

const currentPage = ref(1);
const filter = ref<{
  name?: string;
  status?: "Alive" | "Dead" | "unknown" | "";
} | null>(null);

const { data, error } = await useFetch({ page: currentPage.value });

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const handleFilter = (filterData: Required<typeof filter.value>) => {
  console.log(filterData)
  filter.value = filterData
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
