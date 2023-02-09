import { describe, test, vi } from 'vitest'
import { SignInForm } from '../components/forms'
import { renderWithRouter, userEvent, waitFor } from './utils'
import * as auth from '../services/auth'
import { UserContext } from '../contexts/userContext'
import { Route, Routes } from 'react-router-dom'
import { ApiResponse } from '../types'

function buildAxiosResponse(overrides: ApiResponse<SignInResponse>) {
  return {
    headers: {},
    config: {},
    name: '',
    message: '',
    ...overrides,
  }
}

const access_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJlbWFpbCI6Imxlem9qZWRhQGdtYWlsLmNvbSIsImlkIjoyfQ.E-WaZwcFrLuYu3CjLXO32NiGsCjg9WTzPa4CG2cv63c'
const mockSuccessfulSignInResponse = buildAxiosResponse({
  data: {
    access_token,
  },
  status: 200,
  statusText: 'OK',
})

describe('SignInForm', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/')
    vi.clearAllMocks()
  })

  test('should render form with email and password inputs', () => {
    const { getByLabelText } = renderWithRouter(<SignInForm />)

    const emailInput = getByLabelText(/E-mail/i)
    const passwordInput = getByLabelText(/password/i)

    expect(emailInput).toBeVisible()
    expect(passwordInput).toBeVisible()
  })

  test('should display an error message when sign in fails', async () => {
    const mockAxiosResponse = buildAxiosResponse({
      data: { message: 'Credentials incorrect' },
      status: 403,
      statusText: 'FORBBIDEN',
    })

    vi.spyOn(auth, 'signIn').mockResolvedValueOnce(mockAxiosResponse)

    const { findByText, getByText, getByLabelText } = renderWithRouter(
      <SignInForm />
    )
    const emailInput = getByLabelText(/E-mail/i)
    const passwordInput = getByLabelText(/Password/i)
    const submitButton = getByText(/sign in/i)

    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'password')

    await userEvent.click(submitButton)

    const errorMessage = await findByText(/Credentials incorrect/i)

    expect(errorMessage).toBeInTheDocument()
  })

  test('should disable sign in button while submitting', async () => {
    const { getByText, getByLabelText } = renderWithRouter(<SignInForm />)

    const emailInput = getByLabelText(/E-mail/i)
    const passwordInput = getByLabelText(/password/i)
    const submitButton = getByText(/sign in/i)

    expect(submitButton).not.toBeDisabled()

    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'testpassword')

    await userEvent.click(submitButton)

    expect(submitButton).toBeDisabled()

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled()
    })
  })

  test('should set user data when sign in is successful', async () => {
    const userData = {
      email: 'lezojeda@gmail.com',
      id: 2,
      books: undefined,
    }

    vi.spyOn(auth, 'signIn').mockResolvedValueOnce(mockSuccessfulSignInResponse)
    const setUser = vi.fn()

    const { getByText, getByLabelText } = renderWithRouter(
      <UserContext.Provider value={{ user: undefined, setUser }}>
        <SignInForm />
      </UserContext.Provider>
    )
    const emailInput = getByLabelText(/E-mail/i)
    const passwordInput = getByLabelText(/password/i)
    const submitButton = getByText(/sign in/i)

    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'password')

    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(setUser).toHaveBeenCalledWith(userData)
    })
  })

  test('should navigate to dashboard after successful sign in', async () => {
    const { getByText, getByLabelText } = renderWithRouter(
      <Routes>
        <Route element={<SignInForm />} path="/"></Route>
        <Route element={<>Dashboard</>} path="/dashboard"></Route>
      </Routes>
    )

    vi.spyOn(auth, 'signIn').mockResolvedValueOnce(mockSuccessfulSignInResponse)

    const emailInput = getByLabelText(/E-mail/i)
    const passwordInput = getByLabelText(/password/i)
    const submitButton = getByText(/sign in/i)

    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'password')

    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(getByText('Dashboard')).toBeVisible()
    })
  })
})
