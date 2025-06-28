<script setup lang="ts">
import { pageMetaStore } from '~/store/pageMetaStore'
import { searchFilterStore } from '~/store/searchFilterStore'
import { TypePill } from '#components'
import { getPokemonType } from '~/services/api'

const loading = ref<boolean>(false)
const error = ref<string | null>(null)
const page = ref<number>(0)
const pageSize = ref<number>(20)
const data = ref<any>({ results: [] })

const { data: types } = await getPokemonType()

const fetchProducts = async () => {
  loading.value = true
  try {
    const response = await $fetch('/api/pokemon', { method: 'POST', body: { skip: page.value * pageSize.value, take: pageSize.value, type: searchFilterStore.type, search: searchFilterStore.search, orderBy: searchFilterStore.orderBy } })
    data.value = {
      ...response,
      results: data.value.results.concat(response.results)
    }

    searchFilterStore.total = data.value.total
    searchFilterStore.results = data.value.results.length
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

const onClickPill = (type: string) => {
  searchFilterStore.type = searchFilterStore.type === type ? '' : type
}

const onIntersection = () => {
  if (!loading.value && (page.value + 1) * pageSize.value < options.value.total) {
    page.value++
  }
}

watch(searchFilterStore, () => {
  clearResults()
  page.value = 0
  fetchProducts()
})

onMounted(() => fetchProducts())

onMounted(() => pageMetaStore.pageTitle = 'Search')
</script>

<template>
  <div class="relative">
    <FilterBar />
    <div class="flex justify-center">
      <div class="w-full max-w-200">
        <div v-if="types" class="flex w-full scroll gap-4 overflow-auto mt-8 pb-8">
          <TypePill
            v-for="type in types.results"
            :key="type.name"
            :label="type.name"
            :active="searchFilterStore.type"
            :on-click="onClickPill"
          />
        </div>
        <div v-if="!pokemons.length">
          No data
        </div>
        <div v-else>
          <PaginatedList
            :pokemons="pokemons"
            :load-more="onIntersection"
          />
        </div>
      </div>
    </div>
  </div>
</template>
