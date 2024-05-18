<template>
  <div class="container">
    <header><h1>Header</h1></header>
    <slot></slot>
    <footer><p>Footer</p></footer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container{
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
