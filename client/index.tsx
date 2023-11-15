import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routes } from './routes.tsx'

const queryClient = new QueryClient()

const router = createBrowserRouter(routes)

const root = createRoot(document.getElementById('app') as HTMLElement)
root.render(
  /**
   * Auth0Provider is a component that has a hook that provides
   * all authentication operations
   *
   * TODO: replace the empty strings below with your own domain, clientId, and audience
   */
  <Auth0Provider
    domain="https://dev-l6dqqn32odvbsydr.au.auth0.com"
    clientId="mcne8lCY5BHk6TcY2SV5gqM6tCDylYZC"
    redirectUri={window.location.origin}
    audience="https://fruits/api"
  >
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Auth0Provider>
)
