<script setup lang="ts">
import { getPokemon } from '~/services/api'

const route = useRoute()

const { data } = await getPokemon({ name: route.params!.name })
</script>

<template>
  <div v-if="data == null">
    No data
  </div>
  <div v-else>
    <h2 class="text-lg font-bold mb-4 capitalize dark:bg-red">
      {{ data.name }}
    </h2>
    <img :src="data.sprites.front_shiny" />

    <pre>{{ data }}</pre>
  </div>
</template>
