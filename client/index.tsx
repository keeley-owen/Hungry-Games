import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Home from './components/Home.tsx'
import LocationList from './components/LocationList.tsx'
import App from './components/App.tsx'
import Details from './components/Details.tsx'

const queryClient = new QueryClient()

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
      <App />
      <Home />
      <LocationList />
      <ReactQueryDevtools />
    
    </QueryClientProvider>,
  )
})
