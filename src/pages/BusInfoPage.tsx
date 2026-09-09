import React, { useState, useEffect } from 'react'
import { Accessibility, BarChart3, Clock, RefreshCw } from 'lucide-react'
import Header from '../components/Header'
import BackButton from '../components/BackButton'

interface BusInfoPageProps {
  onEndSession: () => void
}

interface ApiArrivalBus {
  busNumber: string
  type: string
  direction: string
  etaMinutes: number
  remainingStop: number
  route: string
  congestion: string
  isLowFloor: boolean
}

const BusInfoPage: React.FC<BusInfoPageProps> = ({ onEndSession }) => {
  const [busList, setBusList] = useState<ApiArrivalBus[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchBusArrivals = async () => {
      try {
        setTimeout(() => {
          setBusList([
            {
              busNumber: '19',
              type: '간선',
              direction: '송정역 방면',
              etaMinutes: 8,
              remainingStop: 5,
              route: '경유: 양동시장역 · 농성역 · 상무지구',
              congestion: '혼잡도 여유 (교통약자석 3석)',
              isLowFloor: true,
            },
            {
              busNumber: '09',
              type: '지선',
              direction: '첨단산단 방면',
              etaMinutes: 15,
              remainingStop: 9,
              route: '경유: 북구청 · 전남대후문 · 첨단2지구',
              congestion: '혼잡도 보통 (배려석 1석)',
              isLowFloor: false,
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
    <div className="w-full min-h-screen bg-[#F7F3EC] flex flex-col items-center pb-24 font-sans relative text-[#695C4A]">
      <Header />

      <div className="absolute top-6 right-10 z-50">
        <button
          type="button"
          onClick={onEndSession}
          className="bg-[#695C4A] hover:bg-[#524638] text-[#FFEEA0] px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-colors flex items-center gap-2 cursor-pointer border border-[#E3C37A]"
        >
          <span>⟲</span> 이용 종료
        </button>
      </div>

      <main className="w-full max-w-[760px] px-6 pt-8 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <BackButton onClick={onEndSession} />
            <h1 className="text-[26px] font-extrabold tracking-tight text-[#695C4A]">
              실시간 버스 정보
            </h1>
          </div>
          <div className="bg-white border border-[#E8E2D5] text-[#7A6A53] px-4 py-2 rounded-full text-[14px] font-bold shadow-sm flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#695C4A]"></span>
            광주역 정류장 <span className="text-[#695C4A]">28104</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4 text-[13px] font-medium px-1">
          <div className="text-[#8C7A60] flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> 실시간 버스 도착
            정보 (10분마다 갱신)
          </div>
          <div className="text-[#2F6D4F] flex items-center gap-1.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 정상
            운영 · 현재 14:25
          </div>
        </div>

        {/* 1. 곧 도착 예정 버스 (주요 추천 카드) */}
        <div className="bg-white rounded-[28px] p-6 shadow-sm border-2 border-[#E3C37A] mb-5">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-[#695C4A] font-bold text-sm">
              <Clock className="w-4 h-4 text-[#695C4A]" /> 곧 도착 예정 버스
              (주요 추천)
            </div>
            <span className="text-xs font-semibold bg-[#FFFDEB] text-[#7A6321] px-3 py-1 rounded-full border border-[#E3C37A]">
              2번째 전 정류소 통과
            </span>
          </div>

          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-[72px] h-[72px] rounded-2xl bg-[#695C4A] text-[#FFEEA0] flex flex-col items-center justify-center shadow-sm">
                <span className="text-2xl font-black leading-none">123</span>
                <span className="text-[11px] font-medium mt-1 text-[#FFEEA0]">
                  간선
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-[#695C4A]">
                    수완지구 방면
                  </h2>
                  <span className="text-xs font-bold bg-[#F7F3EC] text-[#7A6A53] px-2.5 py-1 rounded-md border border-[#E8E2D5] flex items-center gap-1">
                    <Accessibility className="w-3.5 h-3.5 text-[#695C4A]" />{' '}
                    저상 운행
                  </span>
                </div>
                <p className="text-xs text-[#8C7A60] mt-1.5">
                  주요 경유: 광주기아챔피언스필드 · 광천터미널 · 운암시장
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-red-600">
                약 <span className="text-3xl">3</span>분 후 도착
              </div>
              <p className="text-xs text-[#8C7A60] mt-1">
                도착 임박 (북성중 통과)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#F7F3EC] p-3 rounded-xl border border-[#E8E2D5] text-center">
              <span className="text-[11px] text-[#8C7A60] block mb-1">
                저상버스 여부
              </span>
              <span className="text-xs font-bold text-emerald-700 flex items-center justify-center gap-1">
                ✓ 저상 운행
              </span>
            </div>
            <div className="bg-[#F7F3EC] p-3 rounded-xl border border-[#E8E2D5] text-center">
              <span className="text-[11px] text-[#8C7A60] block mb-1">
                교통약자석
              </span>
              <span className="text-xs font-bold text-[#695C4A] flex items-center justify-center gap-1">
                <Accessibility className="w-3.5 h-3.5" /> 여유 (4석)
              </span>
            </div>
            <div className="bg-[#F7F3EC] p-3 rounded-xl border border-[#E8E2D5] text-center">
              <span className="text-[11px] text-[#8C7A60] block mb-1">
                실시간 혼잡도
              </span>
              <span className="text-xs font-bold text-[#695C4A]">
                ● 보통 (여유)
              </span>
            </div>
          </div>
        </div>

        {/* 2. 일반 버스 카드 리스트 */}
        <div className="flex flex-col gap-4 mb-6">
          {loading ? (
            <div className="bg-white rounded-2xl p-8 text-center text-[#9E8B70] font-medium border border-[#E8E2D5]">
              실시간 버스 정보를 불러오는 중입니다...
            </div>
          ) : (
            busList.map((bus, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-5 shadow-sm border border-[#E8E2D5] flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#F7F3EC] border border-[#E8E2D5] text-[#695C4A] flex flex-col items-center justify-center">
                    <span className="text-lg font-black leading-none">
                      {bus.busNumber}
                    </span>
                    <span className="text-[10px] font-semibold text-[#8C7A60] mt-0.5">
                      {bus.type}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-[#695C4A]">
                        {bus.direction}
                      </h3>
                      <span className="text-[11px] font-bold bg-[#F7F3EC] text-[#7A6A53] px-2 py-0.5 rounded border border-[#E8E2D5] flex items-center gap-1 inline-flex">
                        {bus.isLowFloor && (
                          <Accessibility className="w-3 h-3 text-[#695C4A]" />
                        )}
                        {bus.isLowFloor ? '저상 운행' : '일반 버스'}
                      </span>
                    </div>
                    <p className="text-xs text-[#8C7A60] mt-1">{bus.route}</p>
                    <p className="text-xs text-[#7A6A53] mt-0.5 font-medium">
                      {bus.congestion}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[#695C4A]">
                    약{' '}
                    <span className="text-xl font-black text-red-600">
                      {bus.etaMinutes}
                    </span>{' '}
                    분 후
                  </div>
                  <p className="text-xs text-[#8C7A60] mt-1">
                    {bus.remainingStop}개 정류장 전 (
                    {index === 0 ? '운행 중' : '정상 운행'})
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 3. 하단 시간대별 예상 혼잡도 안내 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E8E2D5] mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-[#695C4A] text-base flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#695C4A]" /> 시간대별 예상
              혼잡도 안내
            </h3>
            <span className="text-xs text-[#7A6321] font-medium bg-[#FFFDEB] px-3 py-1 rounded-full border border-[#E3C37A]">
              광주역 정류소 통계 데이터 기반
            </span>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <div className="bg-[#F7F3EC] p-3.5 rounded-2xl border border-[#E8E2D5]">
              <div className="flex justify-between text-xs font-bold text-[#7A6A53] mb-2">
                <span>출근 시간대</span>
                <span className="text-[10px] text-[#9E8B70]">07~09시</span>
              </div>
              <div className="w-full bg-[#D5CEBF] h-2 rounded-full overflow-hidden mb-2">
                <div className="bg-red-500 h-full w-[85%]"></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-red-600">● 혼잡</span>
                <span className="text-[11px] text-[#8C7A60]">입석 다수</span>
              </div>
            </div>

            <div className="bg-[#F7F3EC] p-3.5 rounded-2xl border border-[#E8E2D5]">
              <div className="flex justify-between text-xs font-bold text-[#7A6A53] mb-2">
                <span>오전 시간대</span>
                <span className="text-[10px] text-[#9E8B70]">10~12시</span>
              </div>
              <div className="w-full bg-[#D5CEBF] h-2 rounded-full overflow-hidden mb-2">
                <div className="bg-amber-500 h-full w-[45%]"></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#7A6321]">● 보통</span>
                <span className="text-[11px] text-[#8C7A60]">착석 가능</span>
              </div>
            </div>

            <div className="bg-[#F7F3EC] p-3.5 rounded-2xl border border-[#E8E2D5]">
              <div className="flex justify-between text-xs font-bold text-[#7A6A53] mb-2">
                <span>낮 시간대</span>
                <span className="text-[10px] text-[#9E8B70]">13~16시</span>
              </div>
              <div className="w-full bg-[#D5CEBF] h-2 rounded-full overflow-hidden mb-2">
                <div className="bg-emerald-500 h-full w-[25%]"></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-emerald-600">
                  ● 여유
                </span>
                <span className="text-[11px] text-[#8C7A60]">좌석 넉넉</span>
              </div>
            </div>

            <div className="bg-[#F7F3EC] p-3.5 rounded-2xl border border-[#E8E2D5]">
              <div className="flex justify-between text-xs font-bold text-[#7A6A53] mb-2">
                <span>퇴근 시간대</span>
                <span className="text-[10px] text-[#9E8B70]">18~20시</span>
              </div>
              <div className="w-full bg-[#D5CEBF] h-2 rounded-full overflow-hidden mb-2">
                <div className="bg-red-500 h-full w-[90%]"></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-red-600">● 혼잡</span>
                <span className="text-[11px] text-[#8C7A60]">탑승 대기</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default BusInfoPage
