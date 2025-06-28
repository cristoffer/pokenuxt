<template>
  <div class=" pb-60">
    <div class="dark:bg-dark-bg-strong bg-light-bg-strong pt-2 pb-2 flex justify-center">
      <h1 class="text-light-primary dark:text-dark-primary text-4xl font-bold w-full max-w-200">
        <RouterLink to="/">
          PokeNuxt
        </RouterLink>
        <span
          v-if="pageMetaStore?.pageTitle"
          class="text-light-accent dark:text-dark-accent text-2xl capitalize"
        > - {{ pageMetaStore.pageTitle }}</span>
      </h1>
    </div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup>
import '@unocss/reset/tailwind.css' // Importing Tailwind CSS reset styles
import { pageMetaStore } from './store/pageMetaStore'

useHead({
  title: 'PokéNuxt',
  bodyAttrs: {
    class: 'bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico', // Setting the favicon for the website
    },
  ],
})
</script>
