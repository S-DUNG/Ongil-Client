import { useState } from 'react'

import HomePage from './pages/HomePage'
import RoutePage from './pages/RoutePage'
import SearchPage from './pages/SearchPage'
import StartPage from './pages/StartPage'

export type Page = 'start' | 'home' | 'search' | 'route'

function App() {
  const [page, setPage] = useState<Page>('start')

  if (page === 'start') {
    return <StartPage onStart={() => setPage('home')} />
  }

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

  return (
    <HomePage
      onSearch={() => setPage('search')}
      onEnd={() => setPage('start')}
    />
  )
}

export default App
