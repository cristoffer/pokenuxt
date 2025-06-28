// @vitest-environment nuxt
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import TypePill from '~/components/typePill.vue'

describe('TypePill.vue', () => {
  it('renders a span when onClick undefined', () => {
    const wrapper = mount(TypePill, {
      props: {
        label: 'Test label',
      },
    })

    expect(wrapper.html()).toContain('Test label')
    expect(wrapper.html()).toContain('<span')
  })

  it('renders a button when onClick defined', () => {
    const wrapper = mount(TypePill, {
      props: {
        label: 'Test label',
        onClick: () => {},
      },
    })

    expect(wrapper.html()).toContain('Test label')
    expect(wrapper.html()).toContain('<button')
  })

  it('render active classes', () => {
    const wrapper = mount(TypePill, {
      props: {
        label: 'Test label',
        active: true,
      },
    })

    expect(wrapper.classes()).toContain('bg-dark-primary')
  })
})
