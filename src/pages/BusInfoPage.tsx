import React from 'react'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import PrimaryBusCard from '../components/PrimaryBusCard'
import RegularBusCard from '../components/RegularBusCard'
import CongestionChart from '../components/CongestionChart'

interface BusInfoPageProps {
  onEndSession: () => void
}

const BusInfoPage: React.FC<BusInfoPageProps> = ({ onEndSession }) => {
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

        <div className="flex flex-col gap-4 mb-6">
          <PrimaryBusCard />

          <RegularBusCard
            number="19"
            type="간선"
            direction="송정역 방면"
            isLowFloor={true}
            route="경유: 양동시장역 · 농성역 · 상무지구"
            congestion="혼잡도 여유 (교통약자석 3석)"
            time="8"
            stopsLeft="5개 정류장 전 (운암도서관)"
          />

          <RegularBusCard
            number="09"
            type="지선"
            direction="첨단산단 방면"
            isLowFloor={false}
            route="경유: 북구청 · 전남대후문 · 첨단2지구"
            congestion="혼잡도 보통 (배려석 1석)"
            time="15"
            stopsLeft="9개 정류장 전"
          />
        </div>

        <div>
          <CongestionChart />
        </div>
      </main>
    </div>
  )
}

export default BusInfoPage
