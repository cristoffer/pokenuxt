<script setup lang="ts">
import { getPokemon } from '~/services/api'
import { pageMetaStore } from '~/store/pageMetaStore'
import type { PokemonFull } from '~/types/pokemon'

const route = useRoute()

const { data } = await getPokemon({ name: route.params!.name as string })
const pokemon = data.value as PokemonFull
pageMetaStore.pageTitle = pokemon.name || ''
</script>

<template>
  <div class="flex justify-center">
    <div class="w-full max-w-200">
      <div v-if="pokemon == null">
        No data
      </div>
      <div v-else>
        <div
          v-if="pokemon.sprites.other?.home?.front_default"
          class="flex justify-center"
        >
          <img
            :src="pokemon.sprites.other.home.front_default"
          >
        </div>
        <div
          v-else
          class="flex justify-center"
        >
          <img
            v-if="pokemon.sprites.front_default"
            :src="pokemon.sprites.front_default"
          >
          <img
            v-if="pokemon.sprites.back_default"
            :src="pokemon.sprites.back_default"
          >
        </div>
        <h2 class="text-6xl font-bold mb-4 capitalize text-light-primary dark:text-dark-primary">
          {{ pokemon.name }}
        </h2>
        <div class="flex w-full scroll gap-2 overflow-auto mt-8 pb-8">
          <TypePill
            v-for="type in pokemon.types"
            :key="type.type.name"
            :label="type.type.name"
            size="xl"
            active
          />
        </div>
        <div class="grid grid-cols-[20%80%] gap-2">
          <div>Height:</div><div>{{ pokemon.height }}</div>
          <div>Weight:</div><div>{{ pokemon.weight }}</div>
          <div>Stats:</div>
          <div class="flex gap-1 flex-wrap">
            <ul>
              <li
                v-for="stat in pokemon.stats"
                :key="stat.stat.name"
              >
                {{ stat.stat.name }} - {{ stat.base_stat }}
              </li>
            </ul>
          </div>
          <div>Moves:</div>
          <div class="flex gap-1 flex-wrap">
            <TypePill
              v-for="move in pokemon.moves"
              :key="move.move.name"
              :label="move.move.name"
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
