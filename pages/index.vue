<script setup lang="ts">
import { pageMetaStore } from '~/store/pageMetaStore'
import { searchFilterStore } from '~/store/searchFilterStore'
import { TypePill } from '#components'
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

const onClickPill = (type: string) => {
  typeFilter.value = typeFilter.value === type ? '' : type
}

const onSearch = () => {
  searchFilterStore.search = searchTerm.value

  clearResults()
  page.value = 0
  fetchProducts()
}

const onIntersection = () => {
  if (!loading.value && (page.value + 1) * pageSize.value < options.value.total) {
    page.value++
  }
}


watch(searchFilterStore, () => {
  console.log('###############', searchFilterStore)
})

onMounted(() => fetchProducts())

onMounted(() => pageMetaStore.pageTitle = 'Search')
</script>

<template>
  <div class="relative">
    <div class="pos-sticky top-0 flex pt-4 pb-4 pl-4 pr-4 dark:bg-dark-bg-strong bg-light-bg-strong flex-wrap justify-center">
      <div class="w-full max-w-200">
        <div class="flex justify-between">
          <div class="flex gap-16">
            <div>
              <input
                v-model="searchTerm"
                class="dark:text-dark-text text-light-text pl-2 border dark:border-dark-text border-light-text rounded-l-md border-r-0 box-content pt-0 pb-0"
                type="search"
                placeholder="search..."
                @keyup.enter="onSearch"
              >
              <button
                class="border dark:border-dark-text border-light-text border-r-0 pl-6 pr-6 hover:bg-white hover:text-black box-content pt-0 pb-0"
                @click="onSearch"
              >
                Search
              </button>
              <select
                v-if="types"
                v-model="typeFilter"
                class="dark:text-dark-text text-light-text pl-2 pr-2 border dark:border-dark-text border-light-text pt-0 pb-0 capitalize cursor-pointer pt-0 pb-0 rounded-r-md box-content h-[24px]"
              >
                <option value="">
                  Type
                </option>
                <option
                  v-for="type in types.results"
                  :key="type.name"
                  :value="type.name"
                >
                  {{ type.name }}
                </option>
              </select>
            </div>
          </div>
          <div>
            <select
              v-model="orderBy"
              class="dark:text-dark-text text-light-text pl-2 pr-2 border dark:border-dark-text border-light-text rounded capitalize cursor-pointer"
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
          <div class="text-xs pt-4 dark:text-dark-text-dimm">
            Showing: {{ pokemons.length }} / {{ options.total }}
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center">
      <div class="w-full max-w-200">
        <div v-if="types" class="flex w-full scroll gap-4 overflow-auto mt-8 pb-8">
          <TypePill
            v-for="type in types.results"
            :key="type.name"
            :label="type.name"
            :active="typeFilter"
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
