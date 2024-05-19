<template>
  <div class="container">
    <form class="filter" @submit.prevent="() => handleFilter({ name, status })">
      <input
        type="text"
        v-model="name"
        placeholder="Искать по имени"
        class="input"
      />
      <select v-model="status" class="input">
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
      <div v-if="props.name">Имя: <strong>{{ props.name }}</strong></div>
      <div v-if="props.status">Статус: <strong>{{ props.status }}</strong></div>
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

const emit = defineEmits(['filterApply'])

const name = ref<string>(props.name || "");
const status = ref<"Alive" | "Dead" | "unknown" | "">(props.status || "");

const handleFilter = (filterData: Required<typeof props>) => {
  emit("filterApply", filterData)
  name.value = ''
  status.value = ''
}

const clearFilter = () => {
  emit("filterApply", { name: '', status: '' })
}




</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding-block: 1rem;
}

.filter {
  align-self: center;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.input {
  background-color: rgb(178, 178, 178);
  color: black;
}

.btn {
  background-color: rgb(178, 178, 178);
  opacity: 0.8;

  &:disabled {
    pointer-events: none;
    opacity: 0.3;
  }

  &:active {
    outline: 2px solid rgb(255, 152, 0);
  }

  &:hover {
    opacity: 1;
  }
}

.applied {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.625rem;
  border-radius: 100vw;
  background-color: rgb(178, 178, 178);
  color: black; 
}

.close {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  background-color: white;
  border-radius: 100vw;
  color: black;
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
