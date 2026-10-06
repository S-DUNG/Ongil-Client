import { useEffect, useState } from 'react'

import BackButton from '../components/BackButton'
import Header from '../components/Header'
import type { Destination } from './SearchPage'

interface RoutePageProps {
  destination: Destination
  onBack: () => void
  onHome: () => void
}

interface NearbyStation {
  stationId: string | null
  manageStationId: number | string | null
  name: string
  lat: number
  lng: number
  distanceMeters: number
  tagoNodeId: string | null
  tagoCityCode: string | null
}

interface RouteSegment {
  type: string
  sectionTime: number
  startName: string
  endName: string
}

interface RouteResponse {
  routeId: string
  destinationName: string
  totalTime: number
  payment: number
  transferCount: number
  segments: RouteSegment[]
}

function RoutePage({ destination, onBack, onHome }: RoutePageProps) {
  const [location, setLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)

  const [route, setRoute] = useState<RouteResponse | null>(null)
  const [stationName, setStationName] = useState('')

  const [isLoading, setIsLoading] = useState<boolean>(
    typeof navigator !== 'undefined' && !navigator.geolocation,
  )

  const [error, setError] = useState(
    typeof navigator !== 'undefined' && !navigator.geolocation
      ? '이 브라우저에서는 현재 위치를 사용할 수 없습니다.'
      : '',
  )

  // 현재 위치 가져오기
  useEffect(() => {
    if (!navigator.geolocation) {
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords

        const currentLocation = {
          lat: latitude,
          lng: longitude,
        }

        setLocation(currentLocation)

        console.log('현재 위치:', currentLocation)
      },
      (error) => {
        console.error('현재 위치를 가져오지 못했습니다.', error)

        setError('현재 위치를 확인할 수 없습니다. 위치 권한을 허용해주세요.')
        setIsLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }, [])

  // 현재 위치 → 주변 정류장 → 경로 조회
  useEffect(() => {
    if (!location) {
      return
    }

    const loadRoute = async () => {
      try {
        setIsLoading(true)
        setError('')
        setRoute(null)

        // 1. 주변 정류장 조회
        const stationParams = new URLSearchParams({
          lat: String(location.lat),
          lng: String(location.lng),
          radiusMeters: '1000',
        })

        const stationRequestUrl = `/api/stations/nearby?${stationParams.toString()}`

        console.log('주변 정류장 요청:', stationRequestUrl)

        const stationResponse = await fetch(stationRequestUrl)

        console.log(
          '주변 정류장 응답 상태:',
          stationResponse.status,
          stationResponse.statusText,
        )

        if (!stationResponse.ok) {
          throw new Error('주변 정류장을 불러오지 못했어요.')
        }
        const stations: NearbyStation[] = await stationResponse.json()

        console.log('주변 정류장 응답:', stations)

        if (!Array.isArray(stations) || stations.length === 0) {
          throw new Error('현재 위치 주변에 정류장이 없습니다.')
        }

        // 2. 스마트패드가 등록된 정류장만 출발 정류장으로 사용
        const availableStations = stations.filter(
          (station) => station.manageStationId !== null,
        )

        if (availableStations.length === 0) {
          throw new Error('현재 위치 주변에 이용 가능한 정류장이 없습니다.')
        }

        // 등록된 정류장 중 가장 가까운 정류장 선택
        const sortedStations = [...availableStations].sort(
          (a, b) => a.distanceMeters - b.distanceMeters,
        )

        const nearestStation = sortedStations[0]

        if (!nearestStation) {
          throw new Error('이용 가능한 가까운 정류장을 찾을 수 없습니다.')
        }

        console.log('가장 가까운 등록 정류장:', nearestStation)
        console.log('stationId:', nearestStation.stationId)
        console.log('manageStationId:', nearestStation.manageStationId)
        console.log('TAGO nodeId:', nearestStation.tagoNodeId)

        setStationName(nearestStation.name)
        setStationName(nearestStation.name)

        // 3. 경로 조회
        const routeParams = new URLSearchParams({
          originId: String(nearestStation.manageStationId),
          destinationLat: String(destination.lat),
          destinationLng: String(destination.lng),
          destinationName: destination.name,
        })

        const routeRequestUrl = `/api/routes?${routeParams.toString()}`

        console.log('경로 요청:', routeRequestUrl)

        const routeResponse = await fetch(routeRequestUrl)

        console.log(
          '경로 응답 상태:',
          routeResponse.status,
          routeResponse.statusText,
        )

        const responseText = await routeResponse.text()

        console.log('경로 API 응답 내용:', responseText)

        if (!routeResponse.ok) {
          throw new Error('경로를 불러오지 못했어요.')
        }

        let routeData: RouteResponse

        try {
          routeData = JSON.parse(responseText)
        } catch {
          throw new Error('경로 API 응답을 JSON으로 읽을 수 없습니다.')
        }

        console.log('경로 응답:', routeData)

        setRoute(routeData)
      } catch (error) {
        console.error('경로 조회 오류:', error)

        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('경로를 불러오는 중 오류가 발생했습니다.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadRoute()
  }, [location, destination])

  return (
    <div className="min-h-screen bg-[#F7F3EC]">
      <Header location={location} onHome={onHome} />

      <main className="mx-auto flex w-full max-w-[1200px] flex-col px-8 pb-10 pt-8">
        {/* 페이지 제목 */}
        <div className="flex items-center gap-4">
          <BackButton onClick={onBack} />

          <div>
            <p className="text-base font-semibold text-[#8A7B6D]">경로 안내</p>

            <h1 className="mt-1 text-3xl font-bold text-[#66563F]">
              {destination.name}
            </h1>
          </div>
        </div>

        {/* 로딩 */}
        {isLoading && (
          <section className="mt-10 rounded-[24px] bg-white px-8 py-10 text-center shadow-[0_4px_16px_rgba(105,92,74,0.08)]">
            <p className="text-xl font-semibold text-[#695C4A]">
              경로를 찾고 있어요
            </p>

            <p className="mt-3 text-base text-[#8A7B6D]">
              잠시만 기다려주세요.
            </p>
          </section>
        )}

        {/* 오류 */}
        {!isLoading && error && (
          <section className="mt-10 rounded-[24px] bg-white px-8 py-10 text-center shadow-[0_4px_16px_rgba(105,92,74,0.08)]">
            <p className="text-xl font-bold text-[#695C4A]">
              경로를 불러오지 못했어요
            </p>

            <p className="mt-3 text-base text-[#8A7B6D]">{error}</p>

            {stationName && (
              <p className="mt-5 text-base font-semibold text-[#695C4A]">
                출발 정류장: {stationName}
              </p>
            )}
          </section>
        )}

        {/* 경로 결과 */}
        {!isLoading && !error && route && (
          <section className="mt-10">
            {/* 출발 / 도착 */}
            <div className="rounded-[24px] bg-white px-8 py-7 shadow-[0_4px_16px_rgba(105,92,74,0.08)]">
              {/* 출발 */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFEEA0] text-lg font-bold text-[#695C4A]">
                  출
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#8A7B6D]">출발</p>

                  <p className="mt-1 text-xl font-bold text-[#66563F]">
                    {stationName}
                  </p>
                </div>
              </div>

              {/* 연결선 */}
              <div className="my-5 ml-6 h-8 border-l-2 border-dashed border-[#D8CCBC]" />

              {/* 도착 */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#695C4A] text-lg font-bold text-white">
                  도
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#8A7B6D]">도착</p>

                  <p className="mt-1 text-xl font-bold text-[#66563F]">
                    {route.destinationName}
                  </p>
                </div>
              </div>
            </div>

            {/* 요약 정보 */}
            <div className="mt-5 grid grid-cols-3 gap-4">
              {/* 소요시간 */}
              <div className="rounded-[20px] bg-white px-5 py-6 text-center shadow-[0_4px_16px_rgba(105,92,74,0.08)]">
                <p className="text-sm font-semibold text-[#8A7B6D]">소요시간</p>

                <p className="mt-2 text-2xl font-bold text-[#695C4A]">
                  {route.totalTime}분
                </p>
              </div>

              {/* 요금 */}
              <div className="rounded-[20px] bg-white px-5 py-6 text-center shadow-[0_4px_16px_rgba(105,92,74,0.08)]">
                <p className="text-sm font-semibold text-[#8A7B6D]">요금</p>

                <p className="mt-2 text-2xl font-bold text-[#695C4A]">
                  {route.payment.toLocaleString()}원
                </p>
              </div>

              {/* 환승 */}
              <div className="rounded-[20px] bg-white px-5 py-6 text-center shadow-[0_4px_16px_rgba(105,92,74,0.08)]">
                <p className="text-sm font-semibold text-[#8A7B6D]">환승</p>

                <p className="mt-2 text-2xl font-bold text-[#695C4A]">
                  {route.transferCount}회
                </p>
              </div>
            </div>

            {/* 이동 경로 */}
            {Array.isArray(route.segments) && route.segments.length > 0 && (
              <div className="mt-5 rounded-[24px] bg-white px-8 py-7 shadow-[0_4px_16px_rgba(105,92,74,0.08)]">
                <h2 className="text-xl font-bold text-[#66563F]">이동 경로</h2>

                <div className="mt-6">
                  {route.segments.map((segment, index) => {
                    const isLast = index === route.segments.length - 1

                    return (
                      <div key={`${segment.type}-${index}`}>
                        {/* 이동 단계 */}
                        <div className="rounded-[18px] bg-[#F7F3EC] px-5 py-4">
                          <div className="flex items-center justify-between">
                            <span className="rounded-full bg-[#FFEEA0] px-3 py-1 text-sm font-bold text-[#695C4A]">
                              {segment.type}
                            </span>

                            <span className="text-sm font-semibold text-[#8A7B6D]">
                              {segment.sectionTime}분
                            </span>
                          </div>

                          {/* 정류장 이동 정보 */}
                          {segment.startName && segment.endName && (
                            <div className="mt-3 flex items-center gap-3 text-base font-semibold text-[#66563F]">
                              <span>{segment.startName}</span>

                              <span className="text-[#A99A89]">→</span>

                              <span>{segment.endName}</span>
                            </div>
                          )}
                        </div>

                        {/* 마지막 단계가 아니면 연결 표시 */}
                        {!isLast && (
                          <div className="flex h-10 items-center justify-center">
                            <span className="text-xl font-bold text-[#A99A89]">
                              ↓
                            </span>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  )
}

export default RoutePage
