<script setup lang="ts">
import { getPokemon } from '~/services/api'

const { data } = await getPokemon({ skip: 20, take: 20 })
</script>

<template>
  paginated list
  <div v-if="data == null">
    No data
  </div>
  <div v-else>
    <ul>
      <PokemonItem />
    </ul>
  </div>
</template>
