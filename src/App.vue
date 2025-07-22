<script setup lang="ts">
import Header from './components/Header.vue'

</script>

<template>
  <div id="app">
    <Header />
    <!-- Main Content -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>

</style>
