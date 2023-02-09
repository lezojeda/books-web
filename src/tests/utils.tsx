import { cleanup, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { afterEach, vi } from 'vitest'

afterEach(() => {
  cleanup()
  vi.resetModules()
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buildAxiosResponse = (overrides: any) => {
  return {
    headers: {},
    config: {},
    name: '',
    message: '',
    ...overrides,
  }
}

const renderWithRouter = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: BrowserRouter,
    ...options,
  })

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
export { buildAxiosResponse, renderWithRouter }
