<template>
  <div class="group grow hover:bg-dark-bg-strong p-6 rounded flex flex-col items-center">
    <div>
      <img
        :src="pokemon.sprites.front_default"
        height="300"
        class="bg-white rounded"
      />
    </div>
    <div class="mt-4 ">
      <h4 class="capitalize text-lg font-bold group-hover:underline">
        {{ pokemon.name }}
      </h4>
      <span
        v-for="type in pokemon.types"
        :key="type"
        class="text-dark-text-dimm text-xs"
      >
        {{ type }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(['pokemon'])
</script>