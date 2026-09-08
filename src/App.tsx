import { useState } from 'react'

import HomePage from './pages/HomePage'
import RoutePage from './pages/RoutePage'
import SearchPage from './pages/SearchPage'
import StartPage from './pages/StartPage'

export type Page = 'start' | 'home' | 'search' | 'route'

function App() {
  const [page, setPage] = useState<Page>('start')

  // 시작 화면
  if (page === 'start') {
    return <StartPage onStart={() => setPage('home')} />
  }

  // 목적지 검색 화면
  if (page === 'search') {
    return (
      <SearchPage
        onBack={() => setPage('home')}
        onRoute={() => setPage('route')}
      />
    )
  }

  // 경로 안내 화면
  if (page === 'route') {
    return <RoutePage onBack={() => setPage('search')} />
  }

  // 메인 화면
  return (
    <HomePage
      onSearch={() => setPage('search')}
      onHelp={() => {}}
      onEnd={() => setPage('start')}
    />
  )
}

export default App
