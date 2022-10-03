import { describe, test, expect, vi } from 'vitest'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import * as AuthUtils from '../utils/auth.utils'
import { render, screen } from './utils'
import ProtectedRoute from '../components/ProtectedRoute'

describe('ProtectedRoute', () => {
  const protectedContent = 'Protected content'
  const loginPage = 'Login page'

  test('should not redirect user trying to navigate to a protected route if authenticated', async () => {
    vi.spyOn(AuthUtils, 'isAuthenticated').mockReturnValue(true)
    vi.spyOn(AuthUtils, 'isTokenExpired').mockReturnValue(false)
    render(
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <>{protectedContent}</>
              </ProtectedRoute>
            }
            path="/"
          ></Route>
          <Route element={<>{loginPage}</>} path="/login"></Route>
        </Routes>
      </BrowserRouter>
    )

    expect(screen.getByText(protectedContent)).toBeVisible()
  })

  test('should redirect user to /login trying to navigate to a protected route if not authenticated', async () => {
    vi.spyOn(AuthUtils, 'isAuthenticated').mockReturnValue(false)
    vi.spyOn(AuthUtils, 'isTokenExpired').mockReturnValue(true)
    render(
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <>{protectedContent}</>
              </ProtectedRoute>
            }
            path="/"
          ></Route>
          <Route element={<>{loginPage}</>} path="/signin"></Route>
        </Routes>
      </BrowserRouter>
    )

    expect(screen.getByText(loginPage)).toBeVisible()
  })
})
