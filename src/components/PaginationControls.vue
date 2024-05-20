<template>
  <div class="pagination_container">
    <button
      class="pbtn"
      :disabled="disabled.first"
      @click="() => onPaginationClick(1)"
    >
      1
    </button>
    <button
      class="pbtn"
      :disabled="disabled.prev"
      @click="() => onPaginationClick(currentPage - 1)"
    >
      <PrevSVG />
    </button>

    <form
      class="curr_page"
      @submit.prevent
      @submit="() => onPaginationClick(currentPage)"
    >
      <input
        class="page"
        id="current_page"
        name="current_page"
        type="number"
        title="ввести страницу"
        :min="1"
        :max="props.totalPages"
        step="1"
        v-model="currentPage"
        :disabled="props.isLoading || props.totalPages === 1"
      />
    </form>

    <button
      class="pbtn"
      :disabled="disabled.next"
      @click="() => onPaginationClick(currentPage + 1)"
    >
      <NextSVG />
    </button>
    <button
      class="pbtn"
      :disabled="disabled.last"
      @click="() => onPaginationClick(props.totalPages)"
    >
      {{ props.totalPages }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import NextSVG from "./svg/NextSVG.vue";
import PrevSVG from "./svg/PrevSVG.vue";

const props = defineProps<{
  page: number;
  totalPages: number;
  isLoading: boolean;
}>();

const emit = defineEmits(["pageChange"]);

const currentPage = ref(1);

watch(
  props,
  () => {
    currentPage.value = props.page;
  },
  { deep: true }
);

const onPaginationClick = (page: number) => {
  currentPage.value = page;
  emit("pageChange", page);
};

const disabled = computed(() => ({
  first: props.page < 2 || props.isLoading,
  prev: props.page < 2 || props.isLoading,
  next: props.page === props.totalPages || props.isLoading,
  last: props.page === props.totalPages || props.isLoading,
}));
</script>

<style scoped>
.pagination_container,
.curr_page {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.pagination_container {
  padding-block: 1rem;
}

.pbtn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 100vw;
  background-color: var(--color-bg-input);
  opacity: 0.8;

  &:disabled {
    pointer-events: none;
    opacity: 0.3;
  }

  &:active {
    outline: 2px solid var(--color-accent);
  }

  &:hover {
    opacity: 1;
  }
}

.page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 100vw;
  background-color: var(--color-bg-input);
  font-size: 1rem;
  transition: opacity 0.3s ease-in;
  -moz-appearance: textfield;
  -webkit-appearance: textfield;
  appearance: textfield;
  text-align: center;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
    opacity: 1;
  }
  &:focus-visible {
    outline: 2px solid var(--color-accent);
  }
  &:disabled {
    opacity: 0.3;
    pointer-events: none;
  }
}

.page::-webkit-outer-spin-button,
.page::-webkit-inner-spin-button {
  display: none;
}
</style>
