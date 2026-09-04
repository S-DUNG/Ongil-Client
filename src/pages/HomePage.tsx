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
}

function HomePage({ onSearch }: HomePageProps) {
  return (
    <main className="min-h-screen bg-[#F7F7F5]">
      {/* 공통 헤더 */}
      <Header />

      {/* 콘텐츠 */}
      <div className="mx-auto min-h-screen w-full max-w-[760px]">
        <section className="px-6 pb-10 pt-10">
          {/* 현재 위치 */}
          <section className="flex items-center gap-3">
            <LocationIcon size={25} />

            <div>
              <p className="text-sm font-medium text-[#666666]">현재 위치</p>

              <p className="mt-0.5 text-xl font-bold">
                광주소프트웨어마이스터고
              </p>
            </div>
          </section>

          {/* 인사말 */}
          <section className="mt-11">
            <p className="text-lg font-semibold text-[#666666]">안녕하세요</p>

            <h1 className="mt-2 text-[40px] font-bold leading-[1.25] tracking-tight">
              어디로
              <br />
              가시나요?
            </h1>
          </section>

          {/* 목적지 검색 */}
          <button
            type="button"
            onClick={onSearch}
            className="mt-7 flex w-full items-center gap-4 rounded-[24px] bg-white p-5 text-left shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] active:translate-y-0"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FFEEA0]">
              <SearchIcon size={29} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[22px] font-bold">목적지 검색</p>

              <p className="mt-1 text-sm text-[#777777]">
                가고 싶은 곳을 찾아보세요
              </p>
            </div>

            <span className="text-2xl font-bold text-[#777777]">→</span>
          </button>

          {/* 음성 검색 */}
          <button
            type="button"
            onClick={onSearch}
            className="mt-4 flex w-full items-center gap-4 rounded-[22px] bg-white px-5 py-4 shadow-[0_3px_12px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_5px_16px_rgba(0,0,0,0.08)] active:translate-y-0"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFEEA0]">
              <MicIcon size={27} />
            </div>

            <div className="min-w-0 flex-1 text-left">
              <p className="text-xl font-bold">음성으로 검색하기</p>

              <p className="mt-1 text-sm text-[#777777]">
                말로 목적지를 알려주세요
              </p>
            </div>

            <span className="text-2xl font-bold text-[#999999]">→</span>
          </button>

          {/* 이용하기 */}
          <section className="mt-10">
            <h2 className="text-xl font-bold">이용하기</h2>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {/* 실시간 버스 */}
              <button
                type="button"
                className="flex min-h-[120px] flex-col justify-between rounded-3xl bg-white p-5 text-left shadow-[0_3px_12px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_5px_16px_rgba(0,0,0,0.08)] active:translate-y-0"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFEEA0]">
                  <BusIcon size={27} />
                </div>

                <div>
                  <p className="text-lg font-bold">실시간 버스 도착</p>

                  <p className="mt-1 text-sm text-[#777777]">
                    버스가 언제 오는지 확인
                  </p>
                </div>
              </button>

              {/* 도움 요청 */}
              <button
                type="button"
                className="flex min-h-[120px] flex-col justify-between rounded-3xl bg-white p-5 text-left shadow-[0_3px_12px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_5px_16px_rgba(0,0,0,0.08)] active:translate-y-0"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFEEA0]">
                  <HelpIcon size={27} />
                </div>

                <div>
                  <p className="text-lg font-bold">도움 요청하기</p>

                  <p className="mt-1 text-sm text-[#777777]">
                    도움이 필요할 때
                  </p>
                </div>
              </button>
            </div>
          </section>
        </section>
      </div>
    </main>
  )
}

export default HomePage
