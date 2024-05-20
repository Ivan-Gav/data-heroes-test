<template>
  <div class="container">
    <form class="filter" @submit.prevent="() => handleFilter({ name, status })">
      <input
        id="name_filter_input"
        name="name_filter_input"
        type="text"
        v-model="name"
        placeholder="Искать по имени"
        class="input"
      />
      <select
        id="status_filter_input"
        name="status_filter_input"
        v-model="status"
        class="input"
      >
        <option value="">Выбрать статус</option>
        <option>Alive</option>
        <option>Dead</option>
        <option>unknown</option>
      </select>
      <button class="btn" :disabled="!name && !status">Применить</button>
    </form>
  </div>
  <div v-if="props.name || props.status" class="container">
    <div class="lbl_applied"><strong>Применен фильтр:</strong></div>
    <div class="applied">
      <div v-if="props.name" class="item_applied">
        Имя: <strong>{{ props.name }}</strong>
      </div>
      <div v-if="props.status" class="item_applied">
        Статус: <strong>{{ props.status }}</strong>
      </div>
      <button class="close" @click="clearFilter"><CloseSVG /></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CloseSVG from "./svg/CloseSVG.vue";

const props = defineProps<{
  name?: string;
  status?: "Alive" | "Dead" | "unknown" | "";
}>();

const emit = defineEmits(["filterApply"]);

const name = ref<string>(props.name || "");
const status = ref<"Alive" | "Dead" | "unknown" | "">(props.status || "");

const handleFilter = (filterData: Required<typeof props>) => {
  emit("filterApply", filterData);
  name.value = "";
  status.value = "";
};

const clearFilter = () => {
  emit("filterApply", { name: "", status: "" });
};
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding-block: 1rem;
}

.filter {
  align-self: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  @media (max-width: 650px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.input {
  background-color: var(--color-bg-input);
  color: var(--color-bg-main);

  @media (max-width: 650px) {
    width: 100%;
  }
}

.btn {
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

  @media (max-width: 650px) {
    width: 100%;
  }
}

.lbl_applied {
  display: inline-block;
  @media (max-width: 650px) {
    display: none;
  }
}

.applied {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.625rem;
  border-radius: 100vw;
  background-color: var(--color-bg-input);
  color: var(--color-bg-main);

  @media (max-width: 650px) {
    max-width: 90%;
    overflow: hidden;
  }
}

.item_applied {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.close {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
  background-color: var(--color-bg-inverted);
  border-radius: 100vw;
  color: var(--color-text-inverted);
  opacity: 0.8;
  padding: 0;

  & svg {
    transition: rotate 0.3s ease-in;
  }

  &:hover svg {
    rotate: 90deg;
  }
}
</style>
