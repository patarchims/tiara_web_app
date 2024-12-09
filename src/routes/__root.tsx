import * as Sentry from '@sentry/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet, createRootRoute } from '@tanstack/react-router'

if (process.env.NODE_ENV == 'production') {
  // enable sentry on prod only
  Sentry.init({
    dsn: import.meta.env.VITE_APP_SENTRY_DSN,
    integrations: [Sentry.tanstackRouterBrowserTracingIntegration],
    tracesSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 1.0,
  })
}

export const Route = createRootRoute({
  component: Root,
})

const client = new QueryClient()

function Root() {
  return (
    <QueryClientProvider client={client}>
      <Outlet />
    </QueryClientProvider>
  )
}
