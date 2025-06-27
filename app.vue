<template>
  <div class="bg-white text-black dark:bg-dark-bg dark:text-white">
    <NuxtRouteAnnouncer />
    <div class="">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import '@unocss/reset/tailwind.css' // Importing Tailwind CSS reset styles

useHead({
  title: 'PokéNuxt',
  bodyAttrs: {
    class: 'bg-stone-100', // Setting the background color and margin for the body
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
