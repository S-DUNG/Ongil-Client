import { useState } from 'react'

import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import RoutePage from './pages/RoutePage'

export type Page = 'home' | 'search' | 'route'

function App() {
  const [page, setPage] = useState<Page>('home')

  if (page === 'search') {
    return (
      <SearchPage
        onBack={() => setPage('home')}
        onRoute={() => setPage('route')}
      />
    )
  }

  if (page === 'route') {
    return <RoutePage onBack={() => setPage('search')} />
  }

  return <HomePage onSearch={() => setPage('search')} />
}

export default App
