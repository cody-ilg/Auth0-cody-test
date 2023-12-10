import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routes } from './routes.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter(routes);

const root = createRoot(document.getElementById('app') as HTMLElement);

const Auth0Config = {
  domain: 'dev-4stxcmoo7ww8l0fj.au.auth0.com',
  clientId: 'Fruits App',
  redirectUri: window.location.origin,
  audience: 'https://fruits/api',
};

root.render(
  <Auth0Provider {...Auth0Config}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Auth0Provider>
);

