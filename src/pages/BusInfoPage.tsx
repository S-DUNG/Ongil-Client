import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import PrimaryBusCard from '../components/PrimaryBusCard'
import RegularBusCard from '../components/RegularBusCard'
import CongestionChart from '../components/CongestionChart'

interface BusInfoPageProps {
  onEndSession: () => void
}

// 🔌 Swagger 응답 구조에 맞춘 타입 정의
interface ApiArrivalBus {
  busNumber: string
  etaMinutes: number
  etaSeconds: number
  remainingStop: number
}

const BusInfoPage: React.FC<BusInfoPageProps> = ({ onEndSession }) => {
  const [busList, setBusList] = useState<ApiArrivalBus[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // 🔌 [Swagger 연동 구간] GET /stations/{stationId}/arrivals?cityCode={cityCode}
  useEffect(() => {
    const fetchBusArrivals = async () => {
      try {
        const stationId = '28184' // 광주역 정류장 ID
        const cityCode = '24' // 광주 지역 코드 예시 (실제 값에 맞게 수정 가능)

        // 💡 나중에 백엔드 서버가 켜지면 아래 주소의 주석을 풀고 사용하세요!
        // const response = await fetch(`/stations/${stationId}/arrivals?cityCode=${cityCode}`)
        // const data = await response.json()
        // setBusList(data)

        // 🛠️ 현재는 서버가 없으므로 Swagger 응답 구조에 맞춘 임시 데이터로 시뮬레이션합니다.
        setTimeout(() => {
          setBusList([
            {
              busNumber: '19',
              etaMinutes: 8,
              etaSeconds: 40,
              remainingStop: 5,
            },
            {
              busNumber: '09',
              etaMinutes: 15,
              etaSeconds: 12,
              remainingStop: 9,
            },
          ])
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error('버스 도착 정보를 불러오는데 실패했습니다:', error)
        setLoading(false)
      }
    }

    fetchBusArrivals()
  }, [])

  return (
    <div className="w-full min-h-screen bg-[#FBFBFB] flex flex-col items-center pb-24 font-sans relative">
      {/* 상단 공통 헤더 */}
      <Header />

      {/* 우측 상단 '이용 종료' 버튼 */}
      <div className="absolute top-6 right-10 z-50">
        <button
          type="button"
          onClick={onEndSession}
          className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span>⟲</span> 이용 종료
        </button>
      </div>

      {/* 메인 컨텐츠 영역 */}
      <main className="w-full max-w-[760px] px-6 pt-8 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <BackButton onClick={onEndSession} />
            <h1 className="text-[26px] font-extrabold tracking-tight text-gray-900">
              실시간 버스 정보
            </h1>
          </div>
          <div className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-full text-[14px] font-bold shadow-sm">
            광주역 정류장 28184
          </div>
        </div>

        <div className="flex justify-between items-center mb-4 text-[13px] font-medium px-1">
          <div className="text-gray-500 flex items-center gap-1">
            <span>↻</span> 실시간 버스 도착 정보 (10분마다 갱신)
          </div>
          <div className="text-emerald-600 flex items-center gap-1.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 정상
            운영 · 현재 14:25
          </div>
        </div>

        {/* 버스 카드 리스트 영역 */}
        <div className="flex flex-col gap-4 mb-6">
          {/* 주요 추천 버스 카드 */}
          <PrimaryBusCard />

          {/* 로딩 중일 때 표시할 문구 또는 Swagger 데이터 맵핑 */}
          {loading ? (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-400 font-medium">
              실시간 버스 정보를 불러오는 중입니다...
            </div>
          ) : (
            busList.map((bus, index) => (
              <RegularBusCard
                key={index}
                number={bus.busNumber}
                type="간선"
                direction="방면 정보"
                isLowFloor={true}
                route="백엔드 연동 대기 중"
                congestion="혼잡도 보통"
                time={String(bus.etaMinutes)}
                stopsLeft={`${bus.remainingStop}개 정류장 전`}
              />
            ))
          )}
        </div>

        {/* 하단 혼잡도 차트 */}
        <div>
          <CongestionChart />
        </div>
      </main>
    </div>
  )
}

export default BusInfoPage
