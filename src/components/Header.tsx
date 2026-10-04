import { useEffect, useState } from 'react'

import { LocationIcon, WeatherIcon } from './Icons'

interface HeaderProps {
  location?: {
    lat: number
    lng: number
  } | null
  onHome: () => void
}

interface WeatherResponse {
  baseDate: string
  baseTime: string
  temperature: number
  humidity: number
  windSpeed: number
  precipitationType: string
}

interface SafetyResponse {
  pm10?: number
  status?: string
}

interface NearbyStation {
  stationId: string | null
  name: string
  lat: number
  lng: number
  distanceMeters: number
  tagoNodeId: string | null
  tagoCityCode: string | null
}

function Header({ location: propLocation, onHome }: HeaderProps) {
  const [internalLocation, setInternalLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)

  const [temperature, setTemperature] = useState<number | null>(null)
  const [stationName, setStationName] = useState('')
  const [airQuality, setAirQuality] = useState('확인 중')
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (propLocation) {
      return
    }

    if (!navigator.geolocation) {
      console.error('이 브라우저에서는 위치 정보를 사용할 수 없습니다.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords

        const currentLocation = {
          lat: latitude,
          lng: longitude,
        }

        console.log('Header 현재 위치:', currentLocation)
        setInternalLocation(currentLocation)
      },
      (error) => {
        console.error('Header 현재 위치를 가져오지 못했습니다.', error)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }, [propLocation])

  const location = propLocation ?? internalLocation

  useEffect(() => {
    if (!location) {
      return
    }

    console.log('정류장 조회에 사용할 위치:', location)

    const loadNearbyStation = async () => {
      try {
        const params = new URLSearchParams({
          lat: String(location.lat),
          lng: String(location.lng),
          radiusMeters: '1000',
        })

        const requestUrl = `/api/stations/nearby?${params.toString()}`

        console.log('헤더 주변 정류장 요청:', requestUrl)

        const response = await fetch(requestUrl)

        console.log(
          '헤더 주변 정류장 응답:',
          response.status,
          response.statusText,
        )

        if (!response.ok) {
          throw new Error(
            `주변 정류장을 불러오지 못했습니다. (${response.status})`,
          )
        }

        const stations: NearbyStation[] = await response.json()

        console.log('헤더 주변 정류장:', stations)

        if (!stations || stations.length === 0) {
          console.log('주변 정류장이 없습니다.')
          return
        }

        const nearestStation = [...stations].sort(
          (a, b) => a.distanceMeters - b.distanceMeters,
        )[0]

        console.log('헤더 가장 가까운 정류장:', nearestStation)
        console.log('헤더에 표시할 정류장:', nearestStation.name)

        setStationName(nearestStation.name)
      } catch (error) {
        console.error('주변 정류장 조회 오류:', error)
      }
    }

    loadNearbyStation()
  }, [location])

  useEffect(() => {
    if (!location) {
      return
    }

    const loadWeather = async () => {
      try {
        const params = new URLSearchParams({
          lat: String(location.lat),
          lng: String(location.lng),
        })

        const requestUrl = `/api/environment/weather?${params.toString()}`

        console.log('날씨 요청:', requestUrl)

        const response = await fetch(requestUrl)

        console.log('날씨 응답 상태:', response.status, response.statusText)

        if (!response.ok) {
          throw new Error(
            `날씨 정보를 불러오지 못했습니다. (${response.status})`,
          )
        }

        const data: WeatherResponse = await response.json()

        console.log('날씨 응답:', data)

        setTemperature(data.temperature)
      } catch (error) {
        console.error('날씨 조회 오류:', error)
      }
    }

    loadWeather()
  }, [location])

  useEffect(() => {
    if (!location) {
      return
    }

    const loadSafety = async () => {
      try {
        const params = new URLSearchParams({
          lat: String(location.lat),
          lng: String(location.lng),
        })

        const requestUrl = `/api/environment/safety?${params.toString()}`

        console.log('환경 정보 요청:', requestUrl)

        const response = await fetch(requestUrl)

        console.log(
          '환경 정보 응답 상태:',
          response.status,
          response.statusText,
        )

        if (!response.ok) {
          throw new Error(
            `환경 정보를 불러오지 못했습니다. (${response.status})`,
          )
        }

        const data: SafetyResponse = await response.json()

        console.log('환경 정보 응답:', data)

        setAirQuality(data.status || '확인 중')
      } catch (error) {
        console.error('환경 정보 조회 오류:', error)
        setAirQuality('확인 중')
      }
    }

    loadSafety()
  }, [location])

  const formattedTime = currentTime.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return (
    <div className="w-full bg-[#F7F3EC] shadow-[0_3px_12px_rgba(105,92,74,0.07)]">
      <header className="flex w-full items-center justify-between px-6 py-5">
        <div className="ml-3 flex items-center">
          <button
            type="button"
            onClick={onHome}
            aria-label="메인페이지로 이동"
            className="cursor-pointer"
          >
            <img
              src="/ongil-logo.png"
              alt="온길 로고"
              className="h-10 w-auto object-contain"
            />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <LocationIcon size={22} />

            <span className="max-w-[180px] truncate text-base font-semibold text-[#695C4A]">
              {stationName || '정류장 확인 중'}
            </span>
          </div>

          <div className="h-6 w-px bg-[#695C4A]/15" />

          <div className="flex items-center gap-2">
            <WeatherIcon size={23} />

            <span className="text-lg font-bold text-[#695C4A]">
              {location && temperature !== null
                ? `${Math.round(temperature)}°`
                : '--°'}
            </span>
          </div>

          <div className="h-6 w-px bg-[#695C4A]/15" />

          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-[#695C4A]">
              미세먼지
            </span>

            <span className="text-base font-bold text-[#695C4A]">
              {airQuality}
            </span>
          </div>

          <div className="h-6 w-px bg-[#695C4A]/15" />

          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-[#695C4A]">
              {formattedTime}
            </span>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
