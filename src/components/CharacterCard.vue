<template>
  <article class="card">
    <img
      class="image"
      :src="props.character.image"
      :alt="props.character.name"
    />
    <div class="content">
      <h3 class="name">{{ props.character.name }}</h3>
      <div class="statusbar">
        <div class="indicator" :class="props.character.status.toLowerCase()"></div>
        <div class="statustext">
          {{ props.character.status }} - {{ props.character.species }}
        </div>
      </div>
      <div class="textblock">
        <div class="label">Last known location:</div>
        <div class="text">{{ props.character.location.name }}</div>
      </div>
      <div class="textblock">
        <div class="label">First seen in:</div>
        <div class="text">{{ props.character.episode[0] }}</div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Character } from "rickmortyapi";
const props = defineProps<{ character: Character }>();
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: 220px;
  color: #ffffff;
  background: rgb(60, 62, 68);
  border-radius: 0.5rem;
  margin: 0.75rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}
.content {
  flex: 3 1 0%;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 500;
}
.name {
  font-size: 1.5rem;
  font-weight: 800;
}
.statusbar {
  display: flex;
  align-items: center;
}
.indicator {
  height: 0.5rem;
  width: 0.5rem;
  margin-right: 0.375rem;
  margin-top: 0.1875rem;
  background: rgb(158, 158, 158);
  border-radius: 50%;

  &.dead{
    background: rgb(214, 61, 46);
  }

  &.alive{
    background: rgb(85, 204, 68);
  }
}
.textblock {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.label {
  color: rgb(158, 158, 158);
}
.text {
  font-size: 1rem;
  font-weight: 400;
}
</style>
