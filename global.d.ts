export {}

declare global {
  interface Window {
    handleGoogleCredentialResponse(response: any): void;
  }
}
