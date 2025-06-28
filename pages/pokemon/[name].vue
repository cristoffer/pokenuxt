<script setup lang="ts">
import { API_BASE_URL } from '~/services/api'
import { pageMetaStore } from '~/store/pageMetaStore'
import type { PokemonFull } from '~/types/pokemon'

const loading = ref<boolean>(true)
const error = ref<string | null>(null)
const pokemon = ref<PokemonFull | null>(null)

const route = useRoute()

const fetchPokemon = async () => {
  loading.value = true

  try {
    pokemon.value = await $fetch(`${API_BASE_URL}/pokemon/${route.params!.name}`)
    pageMetaStore.pageTitle = pokemon.value?.name || ''
  }
  catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
  }
  finally {
    loading.value = false
  }
}

onMounted(() => fetchPokemon())
</script>

<template>
  <div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else-if="error" class="center text-light-alert dark:text-dark-alert">
      {{ error }}
    </div>
    <div v-else class="flex justify-center">
      <div class="w-full max-w-200">
        <div v-if="!pokemon">
          No data
        </div>
        <div v-else>
          <div
            v-if="pokemon.sprites?.other?.home?.front_default"
            class="flex justify-center"
          >
            <img
              :src="pokemon.sprites?.other.home.front_default"
              width="300"
              height="300"
            >
          </div>
          <div
            v-else
            class="flex justify-center"
          >
            <img
              v-if="pokemon.sprites?.front_default"
              :src="pokemon.sprites?.front_default"
            >
            <img
              v-if="pokemon.sprites?.back_default"
              :src="pokemon.sprites?.back_default"
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
  </div>
</template>
