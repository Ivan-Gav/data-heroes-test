<template>
  <div class="container">
    <PageHeader />
    <slot></slot>
    <PageFooter />
  </div>
</template>

<script setup lang="ts">
import PageHeader from './PageHeader.vue';
import PageFooter from './PageFooter.vue';


</script>

<style scoped>
.container{
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
