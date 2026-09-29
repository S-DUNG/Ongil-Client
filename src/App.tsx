import { useEffect, useState } from 'react'

import HomePage from './pages/HomePage'
import RoutePage from './pages/RoutePage'
import SearchPage, { type Destination } from './pages/SearchPage'
import StartPage from './pages/StartPage'
import VoiceSearchPage from './pages/VoiceSearchPage'

export type Page = 'start' | 'home' | 'search' | 'voice-search' | 'route'

export interface UserLocation {
  lat: number
  lng: number
}

const savedPage = localStorage.getItem('ongil-page') as Page | null
const validPages: Page[] = ['start', 'home', 'search', 'voice-search', 'route']

function App() {
  const [page, setPage] = useState<Page>(
    savedPage && validPages.includes(savedPage) ? savedPage : 'start',
  )

  const [destination, setDestination] = useState<Destination | null>(() => {
    const savedDestination = localStorage.getItem('ongil-destination')

    if (!savedDestination) {
      return null
    }

    try {
      return JSON.parse(savedDestination)
    } catch {
      return null
    }
  })

  const [location, setLocation] = useState<UserLocation | null>(null)
  const [locationError, setLocationError] = useState('')

  // 현재 페이지 저장
  useEffect(() => {
    localStorage.setItem('ongil-page', page)
  }, [page])

  // 선택한 목적지 저장
  useEffect(() => {
    if (destination) {
      localStorage.setItem('ongil-destination', JSON.stringify(destination))
    } else {
      localStorage.removeItem('ongil-destination')
    }
  }, [destination])

  // 현재 위치 가져오기
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError('이 브라우저에서는 현재 위치를 사용할 수 없습니다.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords

        setLocation({
          lat: latitude,
          lng: longitude,
        })

        setLocationError('')

        console.log('현재 위치:', {
          lat: latitude,
          lng: longitude,
        })
      },
      (error) => {
        console.error('현재 위치를 가져오지 못했습니다.', error)

        setLocationError(
          '현재 위치를 확인할 수 없습니다. 위치 권한을 허용해주세요.',
        )
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }, [])

  const goHome = () => {
    setPage('home')
  }

  if (page === 'start') {
    return <StartPage onStart={() => setPage('home')} />
  }

  if (page === 'search') {
    return (
      <SearchPage
        onBack={() => setPage('home')}
        onHome={goHome}
        onRoute={(selectedDestination) => {
          setDestination(selectedDestination)
          setPage('route')
        }}
      />
    )
  }

  if (page === 'voice-search') {
    return (
      <VoiceSearchPage
        onBack={() => setPage('home')}
        onHome={goHome}
        onRoute={(selectedDestination) => {
          setDestination(selectedDestination)
          setPage('route')
        }}
      />
    )
  }

  if (page === 'route') {
    if (!destination) {
      setPage('search')
      return null
    }

    return (
      <RoutePage
        destination={destination}
        onBack={() => setPage('search')}
        onHome={goHome}
      />
    )
  }

  return (
    <HomePage
      onSearch={() => setPage('search')}
      onVoiceSearch={() => setPage('voice-search')}
      onHelp={() => {}}
      onEnd={() => {
        setDestination(null)
        setPage('start')
      }}
      location={location}
      locationError={locationError}
      onHome={goHome}
    />
  )
}

export default App
