import { useState } from 'react'
import StartPage from './pages/StartPage'
import HelpRequestPage from './pages/HelpRequestPage'
import HelpGuidePage from './pages/HelpGuidePage'
import BusInfoPage from './pages/BusInfoPage'

function App() {
  const [currentPage, setCurrentPage] = useState<
    'start' | 'help' | 'guide' | 'busInfo'
  >('start')
  const [selectedGuideId, setSelectedGuideId] = useState<number>(1)

  const handleNavigate = (
    page: 'bus' | 'route' | 'help' | 'guide',
    id?: number,
  ) => {
    if (page === 'bus') {
      setCurrentPage('busInfo')
    } else if (page === 'guide') {
      if (id) setSelectedGuideId(id)
      setCurrentPage('guide')
    } else if (page === 'help') {
      setCurrentPage('help')
    }
  }

  const handleEndSession = () => {
    setCurrentPage('start')
  }

  return (
    <div className="w-full min-h-screen bg-[#F7F3EC] text-[#695C4A]">
      {currentPage === 'start' && (
        <StartPage onStart={() => setCurrentPage('help')} />
      )}

      {currentPage === 'help' && (
        <HelpRequestPage
          onNavigate={handleNavigate}
          onEndSession={handleEndSession}
        />
      )}

      {currentPage === 'guide' && (
        <HelpGuidePage
          selectedId={selectedGuideId}
          onNavigate={handleNavigate}
          onEndSession={handleEndSession}
        />
      )}

      {currentPage === 'busInfo' && (
        <BusInfoPage onEndSession={handleEndSession} />
      )}
    </div>
  )
}

export default App
