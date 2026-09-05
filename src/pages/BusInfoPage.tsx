// src/pages/BusInfoPage.tsx
import React from 'react'
import Header from '../components/Header'
import PrimaryBusCard from '../components/PrimaryBusCard'
import RegularBusCard from '../components/RegularBusCard'
import CongestionChart from '../components/CongestionChart'

const BusInfoPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center pb-16 font-sans min-h-screen">
      {/* 1. 최상단 글로벌 네비게이션 바 (팀원 헤더) */}
      <div className="w-full">
        <Header />
      </div>

      {/* 2. 페이지 타이틀 영역 (동그란 백버튼 적용 완료!) */}
      <div className="w-full flex justify-center mt-4">
        <div className="w-full max-w-4xl px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* 동그란 백버튼 */}
            <button className="w-11 h-11 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center text-gray-700 hover:bg-gray-50 transition">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              실시간 버스 정보
            </h1>
          </div>

          {/* 정류장 표시 뱃지도 백버튼 톤에 맞춰서 살짝 다듬었어 */}
          <div className="bg-white border border-gray-200 px-4 py-2 rounded-full text-sm text-gray-600 flex items-center gap-1.5 shadow-sm font-medium">
            광주역 정류장 <span className="text-gray-400">28184</span>
          </div>
        </div>
      </div>

      {/* 3. 메인 컨텐츠 영역 */}
      <main className="w-full max-w-4xl px-6 py-6 space-y-6">
        {/* 업데이트 시간 */}
        <div className="flex justify-between items-center text-sm text-gray-500 px-2">
          <div className="font-medium">
            ↻ 실시간 버스 도착 정보 (10분마다 갱신)
          </div>
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.5)]"></span>
            정상 운영 · 현재 14:25
          </div>
        </div>

        {/* 주요 추천 버스 */}
        <PrimaryBusCard />

        {/* 일반 버스 목록 */}
        <div className="space-y-4">
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
            opacity="70"
          />
        </div>

        {/* 혼잡도 차트 */}
        <CongestionChart />
      </main>
    </div>
  )
}

export default BusInfoPage
