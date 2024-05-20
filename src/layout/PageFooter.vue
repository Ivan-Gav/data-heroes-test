<template>
  <footer class="footer">
    <div>
      <span>©&nbsp;2024&nbsp;</span>
      <a href="https://gavrilin.online/" target="_blank" class="link">
        Иван Гаврилин
      </a>
    </div>
    <div>
      <span>content:&nbsp;</span>
      <a href="https://rickandmortyapi.com/" target="_blank" class="link">
        rickandmortyapi
      </a>
    </div>
    <a
      href="https://github.com/Ivan-Gav/data-heroes-test"
      target="_blank"
      class="link"
    >
      <GitSVG />
    </a>
  </footer>
</template>

<script setup lang="ts">
import GitSVG from "src/components/svg/GitSVG.vue";
</script>

<style scoped>
.footer {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: solid 1px #3c3e44;
  padding: 1rem;
  @media (max-width: 650px) {
    flex-direction: column;
    align-items: center;
  }
}
.link {
  color: white;
  text-decoration: none;
  opacity: 0.6;
  transition: opacity 0.3s ease-in;

  &:hover {
    opacity: 1;
  }
}
</style>
