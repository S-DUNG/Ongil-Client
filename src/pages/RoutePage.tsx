import BackButton from '../components/BackButton'
import Header from '../components/Header'

import { BusIcon, LocationIcon } from '../components/Icons'

interface RoutePageProps {
  onBack: () => void
}

function RoutePage({ onBack }: RoutePageProps) {
  return (
    <main className="min-h-screen bg-[#F7F7F5]">
      {/* 공통 헤더 */}
      <Header />

      {/* 콘텐츠 */}
      <div className="mx-auto min-h-screen w-full max-w-[760px]">
        <section className="px-6 pb-10 pt-8">
          {/* 페이지 제목 */}
          <div className="flex items-center gap-4">
            <BackButton onClick={onBack} />

            <div>
              <p className="text-sm font-semibold text-[#666666]">이동 안내</p>

              <h1 className="mt-1 text-3xl font-bold">경로를 안내해드릴게요</h1>
            </div>
          </div>

          {/* 출발지 → 목적지 */}
          <section className="mt-8 rounded-3xl bg-white p-6 shadow-[0_3px_14px_rgba(0,0,0,0.06)]">
            <div className="flex gap-4">
              {/* 경로 표시 */}
              <div className="flex flex-col items-center">
                {/* 현재 위치 */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111111] text-white">
                  <LocationIcon size={20} strokeWidth={2.5} />
                </div>

                {/* 연결선 */}
                <div className="my-2 h-10 w-px bg-[#CCCCCC]" />

                {/* 목적지 */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFEEA0]">
                  <LocationIcon size={20} strokeWidth={2.5} />
                </div>
              </div>

              {/* 장소 정보 */}
              <div className="flex-1">
                <div>
                  <p className="text-sm text-[#777777]">현재 위치</p>

                  <p className="mt-1 text-xl font-bold">
                    광주소프트웨어마이스터고
                  </p>
                </div>

                <div className="mt-9">
                  <p className="text-sm text-[#777777]">목적지</p>

                  <p className="mt-1 text-xl font-bold">광주송정역</p>
                </div>
              </div>
            </div>
          </section>

          {/* 추천 경로 */}
          <section className="mt-5 rounded-3xl bg-white p-6 shadow-[0_3px_14px_rgba(0,0,0,0.06)]">
            {/* 이동 방법 */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#777777]">
                  추천 이동 방법
                </p>

                <h2 className="mt-1 text-2xl font-bold">버스로 이동</h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFEEA0]">
                <BusIcon size={30} />
              </div>
            </div>

            {/* 1단계 */}
            <div className="mt-6 rounded-2xl bg-[#F5F5F3] p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#111111] text-lg font-bold text-white">
                  1
                </div>

                <div>
                  <p className="text-sm text-[#777777]">먼저</p>

                  <p className="text-xl font-bold">버스 정류장으로 이동</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[#DDDDDD] pt-4">
                <span className="font-medium text-[#555555]">도보 약 3분</span>

                <span className="font-bold">250m</span>
              </div>
            </div>

            {/* 2단계 */}
            <div className="mt-3 rounded-2xl bg-[#F5F5F3] p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFEEA0] text-lg font-bold">
                  2
                </div>

                <div>
                  <p className="text-sm text-[#777777]">버스 탑승</p>

                  <p className="text-xl font-bold">1187번 버스</p>
                </div>
              </div>

              <div className="mt-4 border-t border-[#DDDDDD] pt-4">
                <p className="font-medium text-[#555555]">약 25분 이동</p>
              </div>
            </div>

            {/* 3단계 */}
            <div className="mt-3 rounded-2xl bg-[#F5F5F3] p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#111111] text-lg font-bold text-white">
                  3
                </div>

                <div>
                  <p className="text-sm text-[#777777]">마지막</p>

                  <p className="text-xl font-bold">광주송정역 도착</p>
                </div>
              </div>
            </div>
          </section>

          {/* 예상 소요 시간 */}
          <section className="mt-5 rounded-3xl bg-[#FFF7D6] p-6 shadow-[0_3px_12px_rgba(0,0,0,0.04)]">
            <p className="text-base font-semibold">예상 소요 시간</p>

            <p className="mt-1 text-4xl font-bold">약 28분</p>

            <p className="mt-2 text-sm text-[#555555]">
              교통 상황에 따라 달라질 수 있어요.
            </p>
          </section>

          {/* 길 안내 시작 */}
          <button
            type="button"
            className="mt-5 w-full rounded-[24px] bg-[#111111] py-6 text-2xl font-bold text-white shadow-[0_4px_14px_rgba(0,0,0,0.1)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(0,0,0,0.12)] active:translate-y-0"
          >
            길 안내 시작하기
          </button>
        </section>
      </div>
    </main>
  )
}

export default RoutePage
