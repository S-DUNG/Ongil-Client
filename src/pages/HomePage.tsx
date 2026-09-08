import Header from '../components/Header'

import {
  BusIcon,
  HelpIcon,
  LocationIcon,
  MicIcon,
  SearchIcon,
} from '../components/Icons'

interface HomePageProps {
  onSearch: () => void
  onHelp: () => void
  onEnd: () => void
}

function HomePage({ onSearch, onHelp, onEnd }: HomePageProps) {
  return (
    <main className="min-h-screen bg-[#F7F3EC]">
      <Header />

      <div className="mx-auto min-h-screen w-full max-w-[760px]">
        <section className="px-6 pb-10 pt-10">
          {/* 현재 위치 */}
          <section className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8DCCB] text-[#66563F]">
              <LocationIcon size={24} />
            </div>

            <div>
              <p className="text-sm font-medium text-[#8A7B6D]">현재 위치</p>

              <p className="mt-0.5 text-xl font-bold text-[#66563F]">
                광주소프트웨어마이스터고
              </p>
            </div>
          </section>

          {/* 인사말 */}
          <section className="mt-12">
            <p className="text-base font-semibold text-[#8A7B6D]">
              오늘도 편안하게 이동하세요
            </p>

            <h1 className="mt-2 text-[36px] font-bold leading-[1.35] tracking-[-0.04em] text-[#66563F]">
              어디로 가시나요?
            </h1>
          </section>

          {/* 목적지 검색 */}
          <button
            type="button"
            onClick={onSearch}
            className="mt-8 flex w-full items-center gap-4 rounded-[24px] bg-white p-5 text-left shadow-[0_4px_16px_rgba(102,86,63,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(102,86,63,0.12)] active:translate-y-0"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FFEEA0] text-[#66563F]">
              <SearchIcon size={29} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[21px] font-bold text-[#66563F]">
                목적지 검색
              </p>

              <p className="mt-1 text-sm text-[#8A7B6D]">
                가고 싶은 곳을 찾아보세요
              </p>
            </div>

            <span className="text-2xl font-bold text-[#66563F]">→</span>
          </button>

          {/* 음성 검색 */}
          <button
            type="button"
            onClick={onSearch}
            className="mt-4 flex w-full items-center gap-4 rounded-[22px] bg-white px-5 py-4 shadow-[0_3px_12px_rgba(102,86,63,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_5px_16px_rgba(102,86,63,0.1)] active:translate-y-0"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F3E7C8] text-[#66563F]">
              <MicIcon size={27} />
            </div>

            <div className="min-w-0 flex-1 text-left">
              <p className="text-xl font-bold text-[#66563F]">
                음성으로 검색하기
              </p>

              <p className="mt-1 text-sm text-[#8A7B6D]">
                말로 목적지를 알려주세요
              </p>
            </div>

            <span className="text-2xl font-bold text-[#66563F]">→</span>
          </button>

          {/* 이용하기 */}
          <section className="mt-10">
            <h2 className="text-xl font-bold text-[#66563F]">이용하기</h2>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {/* 실시간 버스 도착 */}
              <button
                type="button"
                className="flex min-h-[175px] flex-col items-center justify-center rounded-3xl bg-white p-5 text-center shadow-[0_3px_12px_rgba(102,86,63,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_5px_16px_rgba(102,86,63,0.1)] active:translate-y-0"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFEEA0] text-[#66563F]">
                  <BusIcon size={32} />
                </div>

                <p className="mt-5 text-xl font-bold text-[#66563F]">
                  실시간 버스
                </p>

                <p className="text-xl font-bold text-[#66563F]">도착</p>

                <p className="mt-2 text-sm text-[#8A7B6D]">
                  버스 도착 시간 확인
                </p>
              </button>

              {/* 도움 요청하기 */}
              <button
                type="button"
                onClick={onHelp}
                className="flex min-h-[175px] flex-col items-center justify-center rounded-3xl bg-white p-5 text-center shadow-[0_3px_12px_rgba(102,86,63,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_5px_16px_rgba(102,86,63,0.1)] active:translate-y-0"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F3E7C8] text-[#66563F]">
                  <HelpIcon size={32} />
                </div>

                <p className="mt-5 text-xl font-bold text-[#66563F]">
                  도움 요청하기
                </p>

                <p className="mt-2 text-sm text-[#8A7B6D]">
                  도움이 필요할 때 요청
                </p>
              </button>
            </div>
          </section>

          {/* 이용 종료 */}
          <button
            type="button"
            onClick={onEnd}
            className="mt-7 flex w-full items-center justify-center gap-3 rounded-[18px] bg-[#EDE6DE] py-3.5 text-[#66563F] transition hover:bg-[#E5DBCF] active:bg-[#DDD1C3]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#66563F] text-base font-bold leading-none text-white">
              ×
            </span>

            <span className="text-[22px] font-semibold leading-none tracking-[-0.03em]">
              이용 종료
            </span>
          </button>
        </section>
      </div>
    </main>
  )
}

export default HomePage
