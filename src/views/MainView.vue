<template>
  <main class="main">
    <CharacterList />
  </main>
</template>

<script setup lang="ts">
import CharacterList from "src/components/CharacterList.vue";
</script>

<style scoped>
.main {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
