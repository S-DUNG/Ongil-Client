import { LocationIcon, WeatherIcon } from './Icons'

function Header() {
  return (
    <div className="w-full bg-[#FFF7D6] shadow-[0_3px_12px_rgba(102,86,63,0.07)]">
      <div className="mx-auto w-full max-w-[760px]">
        <header className="flex items-center justify-between px-6 py-5">
          {/* 이미지 로고 */}
          <div className="flex items-center">
            <img
              src="/ongil-logo.png"
              alt="온길 로고"
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* 위치 / 날씨 */}
          <div className="flex items-center gap-4">
            {/* 현재 위치 */}
            <div className="flex items-center gap-2">
              <LocationIcon size={22} />

              <span className="text-base font-semibold text-[#66563F]">
                광주
              </span>
            </div>

            {/* 구분선 */}
            <div className="h-6 w-px bg-[#66563F]/15" />

            {/* 날씨 */}
            <div className="flex items-center gap-2">
              <WeatherIcon size={23} />

              <span className="text-lg font-bold text-[#66563F]">24°</span>
            </div>
          </div>
        </header>
      </div>
    </div>
  )
}

export default Header
