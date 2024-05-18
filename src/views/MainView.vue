<template>
  <main class="main">
    <Suspense>
      <CharacterList />
      <template #fallback> Loading... </template>
    </Suspense>
  </main>
</template>

<script setup lang="ts">
import CharacterList from "src/components/CharacterList.vue";
</script>

<style scoped>
.main {
  flex: 1;
  width: 100%;
}
</style>
