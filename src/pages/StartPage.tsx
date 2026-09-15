import { useEffect, useState } from 'react'
import { Sun, Smile, Meh, Frown, Flame } from 'lucide-react'

interface WeatherData {
  temperature: number
  description?: string
}

interface SafetyData {
  pm10?: number
  status?: string
}

function StartPage({
  onStart,
}: {
  onStart: () => void
  onWeather: () => void
  onSafety: () => void
}) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [safety, setSafety] = useState<SafetyData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchEnvironmentData = async () => {
      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
          },
        )

        const { latitude, longitude } = position.coords

        console.log('GPS:', latitude, longitude)

        const weatherRes = await fetch(
          `http://54.116.242.126:8080/environment/weather?lat=${latitude}&lng=${longitude}`,
        )

        console.log('날씨 API 상태:', weatherRes.status)

        if (!weatherRes.ok) {
          const errorText = await weatherRes.text()
          console.log('날씨 API 에러 응답:', errorText)
          throw new Error('날씨 정보를 불러오는데 실패했습니다.')
        }

        const weatherData = await weatherRes.json()

        console.log('날씨 정보:', weatherData)
        setWeather(weatherData)

        const safetyRes = await fetch(
          `http://54.116.242.126:8080/environment/safety?lat=${latitude}&lng=${longitude}`,
        )

        console.log('환경 API 상태:', safetyRes.status)

        if (!safetyRes.ok) {
          const errorText = await safetyRes.text()
          console.log('환경 API 에러 응답:', errorText)
          throw new Error('환경 정보를 불러오는데 실패했습니다.')
        }

        const safetyData = await safetyRes.json()

        console.log('환경 및 안전 정보:', safetyData)
        setSafety(safetyData)
      } catch (error) {
        console.error('환경 정보를 불러오지 못했습니다:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEnvironmentData()
  }, [])

  const getAirQualityIcon = (status?: string) => {
    switch (status) {
      case '좋음':
        return <Smile className="w-6 h-6 text-emerald-600" />
      case '보통':
        return <Meh className="w-6 h-6 text-amber-500" />
      case '나쁨':
        return <Frown className="w-6 h-6 text-orange-600" />
      case '매우 나쁨':
        return <Flame className="w-6 h-6 text-red-600" />
      default:
        return <Smile className="w-6 h-6 text-emerald-600" />
    }
  }

  const currentStatus = safety?.status || '좋음'
  const pm10Value = safety?.pm10 ?? 15

  return (
    <main className="min-h-screen bg-[#F7F3EC] text-[#695C4A] font-sans">
      <div className="mx-auto flex min-h-screen w-full max-w-[760px] flex-col">
        <section className="flex flex-1 flex-col items-center justify-center px-6 pb-16">
          <div className="text-center">
            <h1 className="text-[72px] font-bold leading-none tracking-[-0.06em] text-[#695C4A]">
              온길
            </h1>

            <p className="mt-8 text-[21px] font-semibold leading-[1.5] tracking-[-0.03em] text-[#7A6A53]">
              당신이 가는 길, 온길이 함께합니다
            </p>
          </div>

          <div className="mt-12 flex w-full flex-col gap-4">
            <button
              type="button"
              onClick={onStart}
              className="flex min-h-[68px] w-full items-center justify-center rounded-[24px] bg-[#FFEEA0] text-[22px] font-bold text-[#695C4A] shadow-[0_4px_14px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)] active:translate-y-0 cursor-pointer border border-[#E3C37A]"
            >
              시작하기
              <span className="ml-3 text-2xl">→</span>
            </button>

            <div className="grid grid-cols-2 gap-4">
              <div className="min-h-[145px] rounded-[24px] bg-white border border-[#E8E2D5] p-6 text-left shadow-sm transition cursor-default flex flex-col justify-between">
                <div className="flex items-center gap-2 text-[#695C4A]">
                  <Sun className="w-5 h-5 text-amber-500" />
                  <h2 className="text-lg font-bold text-[#695C4A]">
                    날씨 정보
                  </h2>
                </div>
                <div>
                  <div className="text-base font-semibold text-[#8C7A60]">
                    {weather?.description || '맑음'}
                  </div>
                  <div className="text-3xl font-black text-[#695C4A] mt-0.5">
                    {loading ? '...' : `${weather?.temperature ?? 24}°C`}
                  </div>
                </div>
              </div>

              <div className="min-h-[145px] rounded-[24px] bg-white border border-[#E8E2D5] p-6 text-left shadow-sm transition cursor-default flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#695C4A]">
                    <h2 className="text-lg font-bold text-[#695C4A]">
                      환경 및 안전
                    </h2>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#F7F3EC] border border-[#E8E2D5] flex items-center justify-center">
                    {getAirQualityIcon(currentStatus)}
                  </div>
                </div>
                <div>
                  <div className="text-base font-semibold text-[#8C7A60]">
                    미세먼지{' '}
                    <span className="text-[#695C4A] font-bold">
                      {currentStatus}
                    </span>
                  </div>
                  <div className="text-xl font-bold text-[#695C4A] mt-0.5">
                    통합지수:{' '}
                    <span className="font-black">
                      {loading ? '...' : pm10Value}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default StartPage
