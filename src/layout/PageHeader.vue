<template>
  <header class="header">
    <h1 class="h">Trial Task for the FE-dev vacancy at Data Heroes</h1>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
.header {
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-bg-inverted);
  padding: 2rem;
}
.h {
  color: var(--color-text-inverted);
  font-size: clamp(2rem, 4vw, 6rem);
  font-weight: 900;
  text-align: center;
}
</style>
