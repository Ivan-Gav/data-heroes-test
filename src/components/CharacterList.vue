<template>
  <MessageBlock v-if="error" :message="`Error: ${error.message || '..Morty, something went wrong'} `" />
  <MessageBlock v-else-if="isLoading" message="Загрузка..." />
  <div v-else class="container">
    <FilterComponent
      :name="filter?.name"
      :status="filter?.status"
      @filter-apply="handleFilter"
    />
    <div class="list" v-if="characters">
      <CharacterCard
        v-for="character in characters"
        :key="character.id"
        :character="character"
      />
    </div>
    <PaginationControls
      :page="currentPage"
      :total-pages="data?.data?.info?.pages || 1"
      :is-loading="isLoading"
      @page-change="handlePageChange"
      v-if="characters"
    />
    <MessageBlock v-else message="Ничего не найдено" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
// import { useFetch } from "src/composables/useFetch";
import CharacterCard from "./CharacterCard.vue";
import PaginationControls from "src/components/PaginationControls.vue";
import FilterComponent from "./FilterComponent.vue";
import { fetchData } from "src/api/fetchData";
import MessageBlock from "./MessageBlock.vue";

const currentPage = ref(1);
const filter = ref<{
  name?: string;
  status?: "Alive" | "Dead" | "unknown" | "";
} | null>(null);


const queryParams = computed(() => ({
  page: currentPage.value,
  name: filter.value?.name,
  status: filter.value?.status,
}));

const { data, error, isLoading, refetch } = useQuery({
  queryKey: ["characters"],
  queryFn: () => fetchData(queryParams.value),
});

const handlePageChange = (page: number) => {
  currentPage.value = page;
  refetch();
};

const handleFilter = (filterData: Required<typeof filter.value>) => {
  currentPage.value = 1;
  filter.value = filterData;
  console.log(queryParams.value)
  refetch();
};

const characters = computed(() => data.value?.data.results);
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 627px);
  justify-content: center;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
}
</style>