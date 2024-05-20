<template>
  <footer class="footer">
    <div>
      <span>©&nbsp;2024&nbsp;</span>
      <a href="https://gavrilin.online/" target="_blank" class="link">
        Иван Гаврилин
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
  justify-content: space-between;
  border-top: solid 1px white;
  padding: 8px 10px;
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
