<script setup lang="ts">
import { PokemonItem } from '#components'
import { getPokemonType } from '~/services/api'

const loading = ref<boolean>(false)
const error = ref<string | null>(null)
const orderBy = ref<string>('asc')
const searchTerm = ref<string>('')
const typeFilter = ref<string>('')
const page = ref<number>(0)
const pageSize = ref<number>(20)
const data = ref<any>({ results: [] })

const { data: types } = await getPokemonType()

const fetchProducts = async () => {
  loading.value = true
  try {
    const response = await $fetch('/api/pokemon', { method: 'POST', body: { skip: page.value * pageSize.value, take: pageSize.value, type: typeFilter.value, search: searchTerm.value, orderBy: orderBy.value } })
    data.value = {
      ...response,
      results: data.value.results.concat(response.results)
    }
  }
  catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
  }
  finally {
    loading.value = false
  }
}

const pokemons = computed(() => {
  const o = { ...data.value }
  return o.results
})

const options = computed(() => {
  const o = { ...data.value }
  return { ...o.options, total: o.total }
})

const clearResults = () => {
  data.value.results = []
}

watch(page, () => {
  if (!loading.value) {
    fetchProducts()
  }
})

watch(orderBy, () => {
  clearResults()
  page.value = 0
  fetchProducts()
})

watch(typeFilter, () => {
  clearResults()
  page.value = 0
  fetchProducts()
})

const onSearch = () => {
  clearResults()
  page.value = 0
  fetchProducts()
}

const noMorePages = computed(() => {
  return (page.value + 1) * pageSize.value > options.value.total
})

const onIntersection = () => {
  if (!loading.value && (page.value + 1) * pageSize.value < options.value.total) {
    page.value++
  }
}

const readMarker = ref<HTMLSpanElement>()
let observer: IntersectionObserver

onMounted(() => {
  if (!readMarker.value)
    return
  observer = new IntersectionObserver(
    (e) => {
      if (e[0].isIntersecting) {
        onIntersection()
      }
    },
    {
      root: document,
    },
  )
  observer.observe(readMarker.value)
})

onDeactivated(() => observer.disconnect())

onMounted(() => fetchProducts())
</script>

<template>
  <div class="relative pt-20">
    <div class="pos-sticky top-0 flex pt-4 pb-4 pl-4 pr-4 bg-dark-bg-strong flex-wrap justify-center">
      <div class="w-full max-w-200">
        <div class="flex justify-between">
          <div class="flex gap-16">
            <div>
              <input
                v-model="searchTerm"
                class="text-white pl-2 border rounded-l-md border-r-0"
                type="search"
                placeholder="search..."
                @keyup.enter="onSearch"
              >
              <button
                class="border pl-6 pr-6 hover:bg-white hover:text-black rounded-r-md"
                @click="onSearch"
              >
                Search
              </button>
            </div>

            <select
              v-if="types"
              v-model="typeFilter"
              class="text-white pl-2 pr-2 border  capitalize cursor-pointer"
            >
              <option value="">
                Type
              </option>
              <option
                v-for="type in types.results"
                v-bind:key="type.name"
                :value="type.name"
              >
                {{ type.name }}
              </option>
            </select>
          </div>
          <div>
            <select
              v-model="orderBy"
              class="text-white pl-2 pr-2 border rounded capitalize cursor-pointer"
            >
              <option
                value=""
              >
                Order by:
              </option>
              <option value="asc">
                Ascending
              </option>
              <option value="desc">
                Descending
              </option>
            </select>
          </div>
        </div>
        <div class="w-full">
          <div class="text-xs pt-4">
            Showing: {{ pokemons.length }} / {{ options.total }}
          </div>
        </div>
      </div>
    </div>


    <div class="flex justify-center">
      <div class="w-full max-w-200">
        <div v-if="!pokemons.length">
          No data
        </div>
        <div v-else>
          <!-- <div class="w-full">
            <div>Total: {{ options.total }}</div>
            <div>
              Showing: {{ pokemons.length }}
              <span v-if="options.search"> for "{{ options.search }}"</span>
              <span v-if="options.type"> of type {{ options.type }}</span>
            </div>
          </div> -->

          
          <!-- <div class="flex gap-16 flex-wrap justify-center"> -->
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            <PokemonItem
              v-for="pokemon in pokemons"
              :key="pokemon.name"
              :pokemon="pokemon"
            />
          </div>

          <!-- <ul>
            <li v-for="pokemon in pokemons" v-bind:key="pokemon.name" class="border pl-m capitalize text-xl">
              <div>
                <span class="font-bold">{{ pokemon.name }}</span> <span v-for="type in pokemon.types" v-bind:key="type"> | {{ type }}</span>
              </div>
            </li>
          </ul> -->

          <div class="mt-16">
            <button class="border pl-6 pr-6" :disabled="noMorePages" @click="page++">Load more</button>
            <div>page: {{ page }}</div>
          </div>

          <!-- <pre>{{ pokemons }}</pre> -->
        </div>

        <span ref="readMarker">Read</span>
        <div class="pb-200"></div>
      </div>
    </div>
  </div>
</template>
