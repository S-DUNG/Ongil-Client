import BackButton from '../components/BackButton'
import Header from '../components/Header'

import { BusIcon, LocationIcon } from '../components/Icons'

interface RoutePageProps {
  onBack: () => void
}

function RoutePage({ onBack }: RoutePageProps) {
  return (
    <main className="min-h-screen bg-[#F7F3EC]">
      <Header />

      <div className="mx-auto min-h-screen w-full max-w-[760px]">
        <section className="px-6 pb-10 pt-8">
          {/* 제목 */}
          <div className="flex items-center gap-4">
            <BackButton onClick={onBack} />

            <div>
              <p className="text-sm font-semibold text-[#8A7B6D]">이동 안내</p>

              <h1 className="mt-1 text-3xl font-bold text-[#66563F]">
                경로를 안내해드릴게요
              </h1>
            </div>
          </div>

          {/* 출발지 / 목적지 */}
          <section className="mt-8 rounded-3xl bg-white p-6 shadow-[0_3px_14px_rgba(102,86,63,0.07)]">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                {/* 출발지 */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#66563F] text-white">
                  <LocationIcon size={20} strokeWidth={2.5} />
                </div>

                <div className="my-2 h-10 w-px bg-[#D8CBBE]" />

                {/* 목적지 */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFEEA0] text-[#66563F]">
                  <LocationIcon size={20} strokeWidth={2.5} />
                </div>
              </div>

              <div className="flex-1">
                <div>
                  <p className="text-sm text-[#8A7B6D]">현재 위치</p>

                  <p className="mt-1 text-xl font-bold text-[#66563F]">
                    광주소프트웨어마이스터고
                  </p>
                </div>

                <div className="mt-9">
                  <p className="text-sm text-[#8A7B6D]">목적지</p>

                  <p className="mt-1 text-xl font-bold text-[#66563F]">
                    광주송정역
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 추천 이동 방법 */}
          <section className="mt-5 rounded-3xl bg-white p-6 shadow-[0_3px_14px_rgba(102,86,63,0.07)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#8A7B6D]">
                  추천 이동 방법
                </p>

                <h2 className="mt-1 text-2xl font-bold text-[#66563F]">
                  버스로 이동
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFEEA0] text-[#66563F]">
                <BusIcon size={30} />
              </div>
            </div>

            {/* 1단계 */}
            <div className="mt-6 rounded-2xl bg-[#F6F0E9] p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#66563F] text-lg font-bold text-white">
                  1
                </div>

                <div>
                  <p className="text-sm text-[#8A7B6D]">먼저</p>

                  <p className="text-xl font-bold text-[#66563F]">
                    버스 정류장으로 이동
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[#E2D8CF] pt-4">
                <span className="font-medium text-[#75685E]">도보 약 3분</span>

                <span className="font-bold text-[#66563F]">250m</span>
              </div>
            </div>

            {/* 2단계 */}
            <div className="mt-3 rounded-2xl bg-[#F6F0E9] p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFEEA0] text-lg font-bold text-[#66563F]">
                  2
                </div>

                <div>
                  <p className="text-sm text-[#8A7B6D]">버스 탑승</p>

                  <p className="text-xl font-bold text-[#66563F]">
                    1187번 버스
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-[#E2D8CF] pt-4">
                <p className="font-medium text-[#75685E]">약 25분 이동</p>
              </div>
            </div>

            {/* 3단계 */}
            <div className="mt-3 rounded-2xl bg-[#F6F0E9] p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#66563F] text-lg font-bold text-white">
                  3
                </div>

                <div>
                  <p className="text-sm text-[#8A7B6D]">마지막</p>

                  <p className="text-xl font-bold text-[#66563F]">
                    광주송정역 도착
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 예상 시간 */}
          <section className="mt-5 rounded-3xl bg-[#F1E5D5] p-6">
            <p className="text-base font-semibold text-[#75685E]">
              예상 소요 시간
            </p>

            <p className="mt-1 text-4xl font-bold text-[#66563F]">약 28분</p>

            <p className="mt-2 text-sm text-[#75685E]">
              교통 상황에 따라 달라질 수 있어요.
            </p>
          </section>

          {/* 길 안내 시작 */}
          <button
            type="button"
            className="mt-5 w-full rounded-[24px] bg-[#66563F] py-6 text-2xl font-bold text-white shadow-[0_4px_14px_rgba(102,86,63,0.14)] transition hover:-translate-y-0.5 hover:bg-[#594A36] hover:shadow-[0_6px_18px_rgba(102,86,63,0.18)] active:translate-y-0"
          >
            길 안내 시작하기
          </button>
        </section>
      </div>
    </main>
  )
}

export default RoutePage
