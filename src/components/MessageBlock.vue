<template>
  <div class="container">
    <RickAndMortySVG class="rnm" />
    <h2 v-if="props.message" class="message">{{ props.message }}</h2>
  </div>
</template>

<script setup lang="ts">
import RickAndMortySVG from "./svg/RickAndMortySVG.vue";

const props = defineProps({
  message: String,
});
</script>

<style scoped>
.container {
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.rnm {
  color: rgba(200, 200, 200, 0.1);
  position: absolute;
}
.message {
  font-size: 3rem;
  position: absolute;
  z-index: 2;
  text-align: center;
}
</style>
