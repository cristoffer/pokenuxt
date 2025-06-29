<script setup lang="ts">
const { pageTitle } = usePageTitle()
</script>

<template>
  <div class="dark:bg-dark-bg-strong bg-light-bg-strong pt-2 pb-2 flex justify-center">
    <h1 class="text-light-primary dark:text-dark-primary text-4xl font-bold w-full max-w-200">
      <RouterLink
        to="/"
        tabindex="0"
      >
        PokeNuxt
      </RouterLink>
      <span
        v-if="pageTitle"
        class="text-light-accent dark:text-dark-accent text-2xl capitalize"
      > - {{ pageTitle || '' }}</span>
    </h1>
  </div>
</template>
