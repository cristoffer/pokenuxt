import { reactive } from 'vue'

export const searchFilterStore = reactive({
  search: '',
  orderBy: 'asc',
  type: '',
  results: 0,
  total: 0,
})
