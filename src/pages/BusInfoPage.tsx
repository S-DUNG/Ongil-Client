import { API_BASE_URL } from '../api'
import React, { useEffect, useState } from 'react'
import {
  Accessibility,
  BarChart3,
  Clock,
  MapPin,
  RefreshCw,
} from 'lucide-react'
import Header from '../components/Header'
import BackButton from '../components/BackButton'

interface BusInfoPageProps {
  onBack: () => void
}

interface ApiArrivalBus {
  busNumber: string
  etaMinutes: number
  etaSeconds: number
  remainingStop: number
  type?: string
  direction?: string
  isLowFloor?: boolean
  route?: string
  congestion?: string
}

interface Station {
  stationId: string
  name: string
  lat: number
  lng: number
  distanceMeters: number
  tagoNodeId: string | null
  tagoCityCode: string | null
}

interface CongestionForecast {
  hour: number
  status: string
}

interface TimePeriod {
  title: string
  time: string
  startHour: number
  endHour: number
}

const BusInfoPage: React.FC<BusInfoPageProps> = ({ onBack }) => {
  const [busList, setBusList] = useState<ApiArrivalBus[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStation, setSelectedStation] = useState<Station | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [congestionForecast, setCongestionForecast] = useState<
    CongestionForecast[]
  >([])
  const [congestionLoading, setCongestionLoading] = useState(true)

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date())
    }

    updateTime()

    const timer = setInterval(updateTime, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchBusInfo = async () => {
      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
          },
        )

        const { latitude, longitude } = position.coords

        console.log('GPS:', latitude, longitude)

        const stationResponse = await fetch(
          `${API_BASE_URL}/stations/nearby?lat=${latitude}&lng=${longitude}`,
        )

        if (!stationResponse.ok) {
          throw new Error('주변 정류장 정보를 불러오는데 실패했습니다.')
        }

        const stations: Station[] = await stationResponse.json()

        console.log('주변 정류장:', stations)

        if (stations.length === 0) {
          setBusList([])
          setCongestionForecast([])
          return
        }

        const station = [...stations].sort(
          (a, b) => a.distanceMeters - b.distanceMeters,
        )[0]

        setSelectedStation(station)

        console.log('선택된 정류장:', station)

        const congestionResponse = await fetch(
          `${API_BASE_URL}/stations/${encodeURIComponent(
            station.stationId,
          )}/congestion-forecast`,
        )

        if (congestionResponse.ok) {
          const congestionData: CongestionForecast[] =
            await congestionResponse.json()

          console.log('시간대별 혼잡도:', congestionData)

          setCongestionForecast(congestionData)
        } else {
          console.error('혼잡도 API 상태:', congestionResponse.status)

          setCongestionForecast([])
        }

        setCongestionLoading(false)

        if (!station.tagoNodeId || !station.tagoCityCode) {
          setBusList([])
          return
        }

        const arrivalResponse = await fetch(
          `${API_BASE_URL}/stations/${encodeURIComponent(
            station.tagoNodeId,
          )}/arrivals?cityCode=${encodeURIComponent(station.tagoCityCode)}`,
        )

        if (!arrivalResponse.ok) {
          throw new Error('버스 도착 정보를 불러오는데 실패했습니다.')
        }

        const data: ApiArrivalBus[] = await arrivalResponse.json()

        console.log('버스 도착정보:', data)
        console.log('버스 도착정보 개수:', data.length)

        const sortedBusList = [...data].sort(
          (a, b) =>
            a.etaMinutes * 60 +
            a.etaSeconds -
            (b.etaMinutes * 60 + b.etaSeconds),
        )

        console.log('정렬된 버스:', sortedBusList)

        setBusList(sortedBusList)
      } catch (error) {
        console.error('버스 정보를 불러오는데 실패했습니다:', error)
        setBusList([])
        setCongestionForecast([])
        setCongestionLoading(false)
      } finally {
        setLoading(false)
      }
    }

    fetchBusInfo()
  }, [])

  const recommendedBus = busList[0]
  const otherBusList = busList.slice(1)

  const formattedTime = currentTime.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const getCongestionLabel = (status?: string) => {
    switch (status) {
      case 'NORMAL':
        return '여유'
      case 'CAUTION':
        return '보통'
      case 'CROWDED':
        return '혼잡'
      case 'VERY_CROWDED':
        return '매우 혼잡'
      default:
        return '정보 없음'
    }
  }

  const getCongestionPercent = (status?: string) => {
    switch (status) {
      case 'NORMAL':
        return 25
      case 'CAUTION':
        return 50
      case 'CROWDED':
        return 75
      case 'VERY_CROWDED':
        return 95
      default:
        return 0
    }
  }

  const getCongestionClass = (status?: string) => {
    switch (status) {
      case 'NORMAL':
        return 'text-emerald-600'
      case 'CAUTION':
        return 'text-amber-600'
      case 'CROWDED':
        return 'text-orange-600'
      case 'VERY_CROWDED':
        return 'text-red-600'
      default:
        return 'text-[#8C7A60]'
    }
  }

  const getCongestionData = (
    startHour: number,
    endHour: number,
  ): CongestionForecast | null => {
    const data = congestionForecast.filter(
      (item) => item.hour >= startHour && item.hour <= endHour,
    )

    if (data.length === 0) {
      return null
    }

    const priority: Record<string, number> = {
      NORMAL: 1,
      CAUTION: 2,
      CROWDED: 3,
      VERY_CROWDED: 4,
    }

    return data.reduce((worst, current) => {
      return (priority[current.status] || 0) > (priority[worst.status] || 0)
        ? current
        : worst
    })
  }

  const timePeriods: TimePeriod[] = [
    {
      title: '출근 시간대',
      time: '07~09시',
      startHour: 7,
      endHour: 9,
    },
    {
      title: '오전 시간대',
      time: '10~12시',
      startHour: 10,
      endHour: 12,
    },
    {
      title: '낮 시간대',
      time: '13~16시',
      startHour: 13,
      endHour: 16,
    },
    {
      title: '퇴근 시간대',
      time: '18~20시',
      startHour: 18,
      endHour: 20,
    },
  ]

  return (
    <div className="w-full min-h-screen bg-[#F7F3EC] flex flex-col items-center pb-24 font-sans relative text-[#695C4A]">
      <Header onHome={onBack} />

      <main className="w-full max-w-[760px] px-6 pt-8 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <BackButton onClick={onBack} />

            <h1 className="text-[26px] font-extrabold tracking-tight text-[#695C4A]">
              실시간 버스 정보
            </h1>
          </div>
        </div>

        <div className="flex justify-between items-end mb-4 text-[13px] font-medium px-1">
          <div>
            <div className="flex items-center gap-1.5 text-[#695C4A] font-bold text-base">
              <MapPin className="w-4 h-4 text-[#695C4A]" />
              {selectedStation?.name || '주변 정류장'}
            </div>

            <div className="text-[#8C7A60] flex items-center gap-1.5 mt-1">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              실시간 버스 도착 정보 (10분마다 갱신)
            </div>
          </div>

          <div className="text-[#2F6D4F] flex items-center gap-1.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            정상 운영 · 현재 {formattedTime}
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-[28px] p-8 text-center text-[#9E8B70] font-medium border border-[#E8E2D5] mb-5">
            실시간 버스 정보를 불러오는 중입니다...
          </div>
        ) : recommendedBus ? (
          <div className="bg-white rounded-[28px] p-6 shadow-sm border-2 border-[#E3C37A] mb-5">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-[#695C4A] font-bold text-sm">
                <Clock className="w-4 h-4 text-[#695C4A]" />
                가장 빠른 버스
              </div>

              <span className="text-xs font-semibold bg-[#FFFDEB] text-[#7A6321] px-3 py-1 rounded-full border border-[#E3C37A]">
                {recommendedBus.remainingStop}개 정류장 전
              </span>
            </div>

            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-[125px] h-[82px] rounded-2xl bg-[#695C4A] text-[#FFEEA0] flex flex-col items-center justify-center shadow-sm flex-shrink-0">
                  <span className="text-2xl font-black leading-none whitespace-nowrap">
                    {recommendedBus.busNumber}
                  </span>

                  <span className="text-[11px] font-medium mt-1 text-[#FFEEA0]">
                    {recommendedBus.type || '버스'}
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-[#695C4A] whitespace-nowrap">
                      {recommendedBus.direction || '방면 정보 없음'}
                    </h2>

                    <span className="text-xs font-bold bg-[#F7F3EC] text-[#7A6A53] px-2.5 py-1 rounded-md border border-[#E8E2D5] flex items-center gap-1 whitespace-nowrap">
                      {recommendedBus.isLowFloor && (
                        <Accessibility className="w-3.5 h-3.5 text-[#695C4A]" />
                      )}

                      {recommendedBus.isLowFloor ? '저상 운행' : '일반 버스'}
                    </span>
                  </div>

                  <p className="text-xs text-[#8C7A60] mt-1.5">
                    {recommendedBus.route || '노선 정보 없음'}
                  </p>
                </div>
              </div>

              <div className="text-right flex-shrink-0 ml-4">
                <div className="text-2xl font-black text-red-600 whitespace-nowrap">
                  약{' '}
                  <span className="text-3xl">{recommendedBus.etaMinutes}</span>{' '}
                  분 후 도착
                </div>

                <p className="text-xs text-[#8C7A60] mt-1">
                  {recommendedBus.remainingStop}개 정류장 전
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#F7F3EC] p-3 rounded-xl border border-[#E8E2D5] text-center">
                <span className="text-[11px] text-[#8C7A60] block mb-1">
                  저상버스 여부
                </span>

                <span className="text-xs font-bold text-emerald-700">
                  {recommendedBus.isLowFloor ? '✓ 저상 운행' : '일반 버스'}
                </span>
              </div>

              <div className="bg-[#F7F3EC] p-3 rounded-xl border border-[#E8E2D5] text-center">
                <span className="text-[11px] text-[#8C7A60] block mb-1">
                  도착 정류장
                </span>

                <span className="text-xs font-bold text-[#695C4A]">
                  {recommendedBus.remainingStop}개 전
                </span>
              </div>

              <div className="bg-[#F7F3EC] p-3 rounded-xl border border-[#E8E2D5] text-center">
                <span className="text-[11px] text-[#8C7A60] block mb-1">
                  실시간 혼잡도
                </span>

                <span
                  className={`text-xs font-bold ${getCongestionClass(
                    recommendedBus.congestion,
                  )}`}
                >
                  {getCongestionLabel(recommendedBus.congestion)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[28px] p-8 text-center text-[#9E8B70] font-medium border border-[#E8E2D5] mb-5">
            현재 도착 예정인 버스가 없습니다.
          </div>
        )}

        <div className="flex flex-col gap-4 mb-6">
          {otherBusList.map((bus, index) => (
            <div
              key={`${bus.busNumber}-${bus.etaSeconds}-${bus.remainingStop}-${index}`}
              className="bg-white rounded-3xl p-5 shadow-sm border border-[#E8E2D5] flex items-center justify-between"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-[90px] h-14 rounded-2xl bg-[#F7F3EC] border border-[#E8E2D5] text-[#695C4A] flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-lg font-black leading-none whitespace-nowrap">
                    {bus.busNumber}
                  </span>

                  <span className="text-[10px] font-semibold text-[#8C7A60] mt-0.5">
                    {bus.type || '버스'}
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-[#695C4A] whitespace-nowrap">
                      {bus.direction || '방면 정보 없음'}
                    </h3>

                    <span className="text-[11px] font-bold bg-[#F7F3EC] text-[#7A6A53] px-2 py-0.5 rounded border border-[#E8E2D5] flex items-center gap-1 whitespace-nowrap">
                      {bus.isLowFloor && (
                        <Accessibility className="w-3 h-3 text-[#695C4A]" />
                      )}

                      {bus.isLowFloor ? '저상 운행' : '일반 버스'}
                    </span>
                  </div>

                  <p className="text-xs text-[#8C7A60] mt-1">
                    {bus.route || '노선 정보 없음'}
                  </p>
                </div>
              </div>

              <div className="text-right flex-shrink-0 ml-4">
                <div className="text-lg font-bold text-[#695C4A] whitespace-nowrap">
                  약{' '}
                  <span className="text-xl font-black text-red-600">
                    {bus.etaMinutes}
                  </span>{' '}
                  분 후
                </div>

                <p className="text-xs text-[#8C7A60] mt-1 whitespace-nowrap">
                  {bus.remainingStop}개 정류장 전
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E8E2D5] mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-[#695C4A] text-base flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#695C4A]" />
              시간대별 예상 혼잡도 안내
            </h3>

            <span className="text-xs text-[#7A6321] font-medium bg-[#FFFDEB] px-3 py-1 rounded-full border border-[#E3C37A]">
              {selectedStation?.name || '현재 정류장'} 실시간 데이터
            </span>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {timePeriods.map((period) => {
              const congestion = getCongestionData(
                period.startHour,
                period.endHour,
              )

              const status = congestion?.status
              const label = getCongestionLabel(status)
              const percent = getCongestionPercent(status)

              return (
                <div
                  key={period.title}
                  className="bg-[#F7F3EC] p-3.5 rounded-2xl border border-[#E8E2D5]"
                >
                  <div className="flex justify-between items-center">
                    <div className="text-xs font-bold text-[#7A6A53]">
                      {period.title}
                    </div>

                    <div className="text-xs font-bold text-[#8C7A60]">
                      {period.time}
                    </div>
                  </div>

                  <div className="mt-3 h-2 bg-[#D9D2C5] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-current transition-all"
                      style={{
                        width: `${percent}%`,
                      }}
                    />
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <span
                      className={`text-xs font-bold ${getCongestionClass(
                        status,
                      )}`}
                    >
                      ● {label}
                    </span>

                    <span className="text-[11px] text-[#8C7A60]">
                      {congestionLoading
                        ? '불러오는 중'
                        : congestion
                          ? `${congestion.hour}시 기준`
                          : '정보 없음'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

export default BusInfoPage
