<script setup lang="ts">
import { searchFilterStore } from '~/store/searchFilterStore'
import { searchResultsStore } from '~/store/searchResultsStore'
import { API_BASE_URL } from '~/services/api'
import type { TypesResponse } from '~/types/response'

const orderBy = ref<string>('asc')
const searchTerm = ref<string>('')
const typeFilter = ref<string>('')
const types = ref<TypesResponse | null>(null)

const fetchTypes = async () => {
  try {
    types.value = await $fetch<TypesResponse>(`${API_BASE_URL}/type/`)
  }
  catch (err) {
    console.log(err)
  }
}

watch(orderBy, () => {
  searchFilterStore.orderBy = orderBy.value
})

watch(typeFilter, () => {
  searchFilterStore.type = typeFilter.value
})

watch(searchFilterStore, () => {
  typeFilter.value = searchFilterStore.type
})

const onSearch = () => {
  searchFilterStore.search = searchTerm.value
}

onMounted(() => fetchTypes())
</script>

<template>
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
          Showing: {{ searchResultsStore.results }} / {{ searchResultsStore.total }}
        </div>
      </div>
    </div>
  </div>
</template>
