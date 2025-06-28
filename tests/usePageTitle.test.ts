// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import usePageTitle from '~/composables/usePageTitle'

describe('usePageTitle', () => {
  it('Update page title', () => {
    const { pageTitle, setPageTitle } = usePageTitle()
    expect(pageTitle.value).toEqual('')
    setPageTitle('Vite Test Page')
    expect(pageTitle.value).toEqual('Vite Test Page')
  })
})
