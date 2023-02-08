import { cleanup, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { afterEach, vi } from 'vitest'

afterEach(() => {
  cleanup()
  vi.resetModules()
})

const renderWithRouter = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: BrowserRouter,
    ...options,
  })

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'

export { renderWithRouter }
