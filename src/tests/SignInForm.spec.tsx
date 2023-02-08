import { describe, test, vi } from 'vitest'
import { SignInForm } from '../components/forms'
import { act, fireEvent, renderWithRouter } from './utils'
import * as auth from '../services/auth'
import { UserContext } from '../contexts/userContext'

describe('SignInForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('should render form with email and password inputs', () => {
    const { getByLabelText } = renderWithRouter(<SignInForm />)

    const emailInput = getByLabelText(/E-mail/i)
    const passwordInput = getByLabelText(/password/i)

    expect(emailInput).toBeVisible()
    expect(passwordInput).toBeVisible()
  })

  it('should display an error message when sign in fails', async () => {
    const mockAxiosResponse = {
      data: { message: 'Credentials incorrect' },
      status: 403,
      statusText: 'FORBBIDEN',
      headers: {},
      config: {},
      name: '',
      message: '',
    }

    vi.spyOn(auth, 'signIn').mockResolvedValue(mockAxiosResponse)

    const { getByText, getByLabelText } = renderWithRouter(<SignInForm />)
    const emailInput = getByLabelText(/E-mail/i)
    const passwordInput = getByLabelText(/password/i)
    const submitButton = getByText(/sign in/i)

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password' } })

    await act(async () => {
      fireEvent.click(submitButton)
    })

    const errorMessage = getByText(/Credentials incorrect/i)

    expect(errorMessage).toBeInTheDocument()
  })

  it('should set user data when sign in is successful', async () => {
    const mockAxiosResponse = {
      data: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJlbWFpbCI6Imxlem9qZWRhQGdtYWlsLmNvbSIsImlkIjoyfQ.E-WaZwcFrLuYu3CjLXO32NiGsCjg9WTzPa4CG2cv63c',
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
      name: '',
      message: '',
    }
    const userData = {
      email: 'lezojeda@gmail.com',
      id: 2,
      books: undefined
    }

    vi.spyOn(auth, 'signIn').mockResolvedValue(mockAxiosResponse)
    const setUser = vi.fn()

    const { getByText, getByLabelText } = renderWithRouter(
      <UserContext.Provider value={{ user: undefined, setUser }}>
        <SignInForm />
      </UserContext.Provider>
    )
    const emailInput = getByLabelText(/E-mail/i)
    const passwordInput = getByLabelText(/password/i)
    const submitButton = getByText(/sign in/i)

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password' } })

    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(setUser).toHaveBeenCalledWith(userData)
  })
})
