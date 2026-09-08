import React from 'react'

const PrimaryBusCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border-[3px] border-[#FFEAAA] p-6 shadow-sm flex flex-col gap-6">
      {/* 상단 안내 */}
      <div className="flex justify-between items-center text-sm font-bold text-amber-600">
        <div className="flex items-center gap-1.5">
          <span>🕒</span> 곧 도착 예정 버스 (주요 추천)
        </div>
        <div className="text-gray-500 font-medium">2번째 전 정류소 통과</div>
      </div>

      {/* 버스 정보 메인 */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <div className="bg-gray-900 text-white rounded-xl w-20 h-20 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold">123</span>
            <span className="text-[11px] font-medium text-gray-300 mt-0.5">
              간선
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <h2 className="text-[28px] font-extrabold text-gray-900 tracking-tight">
                수완지구 방면
              </h2>
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-semibold border border-gray-200 flex items-center gap-1">
                ♿ 저상 운행
              </span>
            </div>
            <p className="text-[13px] text-gray-500 font-medium">
              주요 경유: 광주기아챔피언스필드 · 광천터미널 · 운암시장
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-[28px] font-extrabold text-red-500 mb-1 tracking-tight">
            약 <span className="text-[36px]">3</span>분 후 도착
          </p>
          <p className="text-[13px] text-gray-500 font-medium">
            도착 임박 (북성중 통과)
          </p>
        </div>
      </div>

      {/* 상태 정보 박스 3개 */}
      <div className="flex gap-3">
        <div className="flex-1 bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center gap-1.5">
          <span className="text-[12px] text-gray-500 font-medium">
            저상버스 여부
          </span>
          <span className="text-[14px] font-bold text-green-600">
            ✔ 저상 운행
          </span>
        </div>
        <div className="flex-1 bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center gap-1.5">
          <span className="text-[12px] text-gray-500 font-medium">
            교통약자석
          </span>
          <span className="text-[14px] font-bold text-amber-600">
            ♿ 여유 (4석)
          </span>
        </div>
        <div className="flex-1 bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center gap-1.5">
          <span className="text-[12px] text-gray-500 font-medium">
            실시간 혼잡도
          </span>
          <span className="text-[14px] font-bold text-gray-700">
            ● 보통 (여유)
          </span>
        </div>
      </div>

      {/* 🚨 여기에 있던 '버스 탑승 지원 요청' 노란색 버튼 코드를 완전히 삭제했습니다! */}
    </div>
  )
}

export default PrimaryBusCard
