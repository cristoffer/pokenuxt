<template>
  <RouterLink :to="`/pokemon/${pokemon.name}`" tabindex="0" class="dark:focus:bg-dark-bg-strong focus:bg-light-bg-strong group grow dark:hover:bg-dark-bg-strong hover:bg-light-bg-strong p-6 rounded flex flex-col items-center">
    <div class="group-hover:scale-[1.05] duration-25 ease-out">
      <img
        :src="pokemon.sprites.front_default"
        height="300"
        class="bg-white rounded duration-25 ease-out"
      />
    </div>
    <div class="mt-4 text-center">
      <h4 class="capitalize text-lg font-bold group-hover:underline">
        {{ pokemon.name }}
      </h4>
    </div>
    <div>
      <span
        v-for="(type, index) in pokemon.types"
        :key="type"
        class="text-light-text-dimm dark:text-dark-text-dimm text-xs"
      >
        {{ type }} {{ index < pokemon.types.length - 1 ? ' | ' : '' }}
      </span>
    </div>
</RouterLink>
</template>

<script setup lang="ts">
defineProps(['pokemon'])
</script>