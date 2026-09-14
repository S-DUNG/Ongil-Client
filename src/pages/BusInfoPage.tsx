import React, { useEffect, useState } from 'react'

import Header from '../components/Header'

import PrimaryBusCard from '../components/PrimaryBusCard'

import RegularBusCard from '../components/RegularBusCard'

import CongestionChart from '../components/CongestionChart'

interface BusInfoPageProps {
  onEndSession: () => void
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

const BusInfoPage: React.FC<BusInfoPageProps> = ({ onEndSession }) => {
  console.log('BusInfoPage 실행됨')

  const [busList, setBusList] = useState<ApiArrivalBus[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedStation, setSelectedStation] = useState<Station | null>(null)

  useEffect(() => {
    const fetchBusInfo = async () => {
      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
          },
        )

        const { latitude, longitude } = position.coords

        const stationResponse = await fetch(
          `http://54.116.242.126:8080/stations/nearby?lat=${latitude}&lng=${longitude}`,
        )

        if (!stationResponse.ok) {
          throw new Error('주변 정류장 정보를 불러오는데 실패했습니다.')
        }

        const stations: Station[] = await stationResponse.json()

        console.log('주변 정류장:', stations)

        if (stations.length === 0) {
          setBusList([])
          return
        }

        const station = [...stations].sort(
          (a, b) => a.distanceMeters - b.distanceMeters,
        )[0]

        setSelectedStation(station)

        console.log('선택된 정류장:', station)

        if (!station.tagoNodeId || !station.tagoCityCode) {
          setBusList([])
          return
        }

        const arrivalResponse = await fetch(
          `http://54.116.242.126:8080/stations/${encodeURIComponent(
            station.tagoNodeId,
          )}/arrivals?cityCode=${encodeURIComponent(station.tagoCityCode)}`,
        )

        if (!arrivalResponse.ok) {
          throw new Error('버스 도착 정보를 불러오는데 실패했습니다.')
        }

        const data: ApiArrivalBus[] = await arrivalResponse.json()

        console.log('버스 도착정보:', data)

        setBusList(data)
      } catch (error) {
        console.error('버스 정보를 불러오는데 실패했습니다:', error)
        setBusList([])
      } finally {
        setLoading(false)
      }
    }

    fetchBusInfo()
  }, [])

  return (
    <div className="w-full flex flex-col items-center pb-16 font-sans min-h-screen">
      <div className="w-full">
        <Header />
      </div>

      <div className="w-full flex justify-center mt-4">
        <div className="w-full max-w-4xl px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
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

          <div className="bg-white border border-gray-200 px-4 py-2 rounded-full text-sm text-gray-600 flex items-center gap-1.5 shadow-sm font-medium">
            {selectedStation?.name || '주변 정류장'}
          </div>
        </div>
      </div>

      <main className="w-full max-w-4xl px-6 py-6 space-y-6">
        <div className="flex justify-between items-center text-sm text-gray-500 px-2">
          <div className="font-medium">
            ↻ 실시간 버스 도착 정보 (10분마다 갱신)
          </div>

          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.5)]"></span>
            정상 운영
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-500">
            버스 정보를 불러오는 중...
          </div>
        ) : busList.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            현재 도착 예정인 버스가 없습니다.
          </div>
        ) : (
          <>
            <PrimaryBusCard />

            <div className="space-y-4">
              {busList.map((bus) => (
                <RegularBusCard
                  key={`${bus.busNumber}-${bus.etaMinutes}-${bus.remainingStop}`}
                  number={bus.busNumber}
                  type={bus.type || '버스'}
                  direction={bus.direction || '방면 정보 없음'}
                  isLowFloor={bus.isLowFloor || false}
                  route={bus.route || '노선 정보 없음'}
                  congestion={bus.congestion || '혼잡도 정보 없음'}
                  time={String(bus.etaMinutes)}
                  stopsLeft={`${bus.remainingStop}개 정류장 전`}
                />
              ))}
            </div>

            <CongestionChart />
          </>
        )}
      </main>
    </div>
  )
}

export default BusInfoPage
