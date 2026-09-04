import { LocationIcon, WeatherIcon } from './Icons'

function Header() {
  return (
    <div className="w-full bg-[#FFF7D6] shadow-[0_3px_12px_rgba(0,0,0,0.07)]">
      <div className="mx-auto w-full max-w-[760px]">
        <header className="flex items-center justify-between px-6 py-5">
          {/* 로고 */}
          <div className="flex items-center gap-3">
            <img
              src="/ongil-logo.png"
              alt="온길 로고"
              className="h-10 w-auto object-contain"
            />

            <span className="text-[28px] font-bold tracking-[-0.03em]">
              온길
            </span>
          </div>

          {/* 현재 위치 + 날씨 */}
          <div className="flex items-center gap-4">
            {/* 현재 위치 */}
            <div className="flex items-center gap-2">
              <LocationIcon size={22} />

              <span className="text-base font-semibold">광주</span>
            </div>

            {/* 구분선 */}
            <div className="h-6 w-px bg-black/15" />

            {/* 날씨 */}
            <div className="flex items-center gap-2">
              <WeatherIcon size={23} />

              <span className="text-lg font-bold">24°</span>
            </div>
          </div>
        </header>
      </div>
    </div>
  )
}

export default Header
