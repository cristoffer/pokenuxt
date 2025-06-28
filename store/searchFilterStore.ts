import { reactive } from 'vue'

export const searchFilterStore = reactive({
  search: '',
  orderBy: 'asc',
  type: '',
})
