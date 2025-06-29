// @vitest-environment nuxt
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import FilterBar from '~/components/filterBar.vue'
import { searchFilterStore } from '~/store/searchFilterStore'

describe('filterBar.vue', () => {
  it('FilterBar to update store search term', async () => {
    const wrapper = mount(FilterBar)
    await wrapper.find('input').setValue('Vite Test')
    await wrapper.find('button').trigger('click')

    expect(searchFilterStore.search).toEqual('Vite Test')
  })

  it('FilterBar to update store sort order', async () => {
    const wrapper = mount(FilterBar)
    const select = wrapper.findAll('select')[0]
    await select.setValue('desc')

    expect(searchFilterStore.orderBy).toEqual('desc')
  })
})
