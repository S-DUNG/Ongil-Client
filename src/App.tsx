// src/App.tsx
import BusInfoPage from './pages/BusInfoPage'

function App() {
  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      {/* 🌟 도움 요청, 홈 버튼 다 날리고 깔끔하게 버스 정보 페이지만 렌더링! */}
      <BusInfoPage />
    </div>
  )
}

export default App
