// src/components/PrimaryBusCard.tsx
import React from 'react'

const PrimaryBusCard: React.FC = () => {
  return (
    <section className="bg-white rounded-2xl border-2 border-[#FFD770] shadow-sm overflow-hidden">
      <div className="bg-[#FFF8E1] px-5 py-2.5 flex justify-between items-center text-sm">
        <div className="flex items-center gap-1.5 text-amber-800 font-medium">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          곧 도착 예정 버스 (주요 추천)
        </div>
        <span className="text-gray-500 text-sm">2번째 전 정류소 통과</span>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4">
            <div className="bg-[#1A1A1A] text-white rounded-xl w-20 h-20 flex flex-col items-center justify-center">
              <span className="font-bold text-3xl leading-none">123</span>
              <span className="text-xs mt-1 text-gray-300">간선</span>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="font-bold text-2xl">수완지구 방면</h2>
                <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full flex items-center gap-1">
                  저상 운행
                </span>
              </div>
              <p className="text-sm text-gray-500">
                주요 경유: 광주기아챔피언스필드 · 광천터미널 · 운암시장
              </p>
            </div>
          </div>
          <div className="text-right flex flex-col justify-center h-20">
            <p className="text-[#FF4B4B] font-bold text-xl">
              약 <span className="text-3xl">3</span>분 후 도착
            </p>
            <p className="text-sm text-gray-500 mt-1">
              도착 임박 (복성중 통과)
            </p>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <div className="flex-1 bg-[#f7f7f5] rounded-xl p-3 text-center flex flex-col justify-center items-center h-16">
            <span className="text-xs text-gray-500 mb-1">저상버스 여부</span>
            <span className="text-sm font-bold text-green-600">
              ✔ 저상 운행
            </span>
          </div>
          <div className="flex-1 bg-[#f7f7f5] rounded-xl p-3 text-center flex flex-col justify-center items-center h-16">
            <span className="text-xs text-gray-500 mb-1">교통약자석</span>
            <span className="text-sm font-bold text-amber-700">여유 (4석)</span>
          </div>
          <div className="flex-1 bg-[#f7f7f5] rounded-xl p-3 text-center flex flex-col justify-center items-center h-16">
            <span className="text-xs text-gray-500 mb-1">실시간 혼잡도</span>
            <span className="text-sm font-bold text-gray-700">보통 (여유)</span>
          </div>
        </div>

        <button className="w-full py-4 bg-[#FFF0B3] text-amber-900 font-bold rounded-xl text-base hover:bg-[#FFE066] transition">
          이 버스 탑승 지원 요청 (기사님께 알림)
        </button>
      </div>
    </section>
  )
}

export default PrimaryBusCard
