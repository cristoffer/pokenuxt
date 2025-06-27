<script setup lang="ts">
import { getPokemon } from '~/services/api'

const { data } = await getPokemon({ skip: 0, take: -1 })
</script>

<template>
  <h2>Search</h2>
  <div v-if="data == null">
    No data
  </div>
  <div v-else>
    <pre>{{ data }}</pre>
  </div>
</template>
