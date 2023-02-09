import { describe, test, vi } from 'vitest'
import { SignUpForm } from '../components/forms'
import {
  buildAxiosResponse,
  renderWithRouter,
  userEvent,
  waitFor,
} from './utils'
import * as auth from '../services/auth'

describe('SignUpForm', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/')
    vi.clearAllMocks()
  })

  test('should render form with all necessary inputs', () => {
    const { getByLabelText, getByText } = renderWithRouter(<SignUpForm />)

    const emailInput = getByLabelText(/E-mail/i)
    const passwordInput = getByLabelText(/password/i)
    const submitButton = getByText(/create account/i)

    expect(emailInput).toBeVisible()
    expect(passwordInput).toBeVisible()
    expect(submitButton).toBeVisible()
  })

  test('should display an error message when sign up fails', async () => {
    const mockAxiosResponse = buildAxiosResponse({
      data: {
        error: '',
        message: ['password must be longer than or equal to 8 characters'],
        statusCode: 400,
      },
      status: 400,
      statusText: 'BAD REQUEST',
    })

    vi.spyOn(auth, 'signUp').mockResolvedValueOnce(mockAxiosResponse)

    const { findByText, getByText, getByLabelText } = renderWithRouter(
      <SignUpForm />
    )
    const emailInput = getByLabelText(/E-mail/i)
    const passwordInput = getByLabelText(/Password/i)
    const submitButton = getByText(/create account/i)

    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'p')

    await userEvent.click(submitButton)

    const errorMessage = await findByText(
      /password must be longer than or equal to 8 characters/i
    )

    expect(errorMessage).toBeInTheDocument()
  })

  test('should disable sign in button while submitting', async () => {
    const { getByText, getByLabelText } = renderWithRouter(<SignUpForm />)

    const emailInput = getByLabelText(/E-mail/i)
    const passwordInput = getByLabelText(/password/i)
    const submitButton = getByText(/create account/i)

    expect(submitButton).not.toBeDisabled()

    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'testpassword')

    await userEvent.click(submitButton)

    expect(submitButton).toBeDisabled()

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled()
    })
  })

  test('should display a success message when sign up is successful', async () => {
    const mockAxiosResponse = buildAxiosResponse({
      data: {
        id: 1,
        createdAt: '2023-02-09T14:05:34.397Z',
        updatedAt: '2023-02-09T14:05:34.401Z',
        email: 'test@example.com',
        firstName: null,
        lastName: null,
      },
      status: 201,
      statusText: 'CREATED',
    })

    vi.spyOn(auth, 'signUp').mockResolvedValueOnce(mockAxiosResponse)

    const { findByText, getByText, getByLabelText } = renderWithRouter(
      <SignUpForm />
    )
    const emailInput = getByLabelText(/E-mail/i)
    const passwordInput = getByLabelText(/password/i)
    const submitButton = getByText(/create account/i)

    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'password')

    await userEvent.click(submitButton)

    const successMessage = await findByText(
      /Account successfully created, you can sign in now/i
    )

    expect(successMessage).toBeInTheDocument()
  })
})
