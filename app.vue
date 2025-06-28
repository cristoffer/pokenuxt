<template>
  <div class=" pb-60">
    <AppHeader />
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup>
import '@unocss/reset/tailwind.css' // Importing Tailwind CSS reset styles
// import { pageMetaStore } from './store/pageMetaStore'

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
