import { useState, useEffect } from 'react'
import StartPage from './pages/StartPage'
import BusInfoPage from './pages/BusInfoPage'

function App() {
  const [currentPage, setCurrentPage] = useState<'start' | 'bus'>('start')

  // 30초 동안 조작 없으면 홈 화면으로 돌아가는 자동 초기화 기능
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const resetTimer = () => {
      clearTimeout(timeoutId)
      if (currentPage !== 'start') {
        timeoutId = setTimeout(() => {
          setCurrentPage('start')
        }, 30000)
      }
    }

    window.addEventListener('mousemove', resetTimer)
    window.addEventListener('touchstart', resetTimer)
    window.addEventListener('click', resetTimer)
    window.addEventListener('scroll', resetTimer)

    resetTimer()

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('mousemove', resetTimer)
      window.removeEventListener('touchstart', resetTimer)
      window.removeEventListener('click', resetTimer)
      window.removeEventListener('scroll', resetTimer)
    }
  }, [currentPage])

  return (
    <div className="w-full min-h-screen bg-[#FBFBFB] font-sans text-gray-900 select-none">
      {/* 1. 홈 화면 (시작 페이지) */}
      {currentPage === 'start' && (
        <StartPage
          onStart={() => {
            console.log('시작 버튼 클릭됨! 버스 페이지로 이동합니다.')
            setCurrentPage('bus')
          }}
        />
      )}

      {/* 2. 버스 정보 화면 */}
      {currentPage === 'bus' && (
        <BusInfoPage
          onEndSession={() => {
            console.log('이용 종료 클릭됨! 홈으로 이동합니다.')
            setCurrentPage('start')
          }}
        />
      )}
    </div>
  )
}

export default App
