import { useState } from 'react'

import BackButton from '../components/BackButton'
import Header from '../components/Header'

import { LocationIcon, SearchIcon } from '../components/Icons'

interface SearchPageProps {
  onBack: () => void
  onRoute: () => void
}

const recentPlaces = [
  {
    name: '광주송정역',
    description: '광주광역시 광산구',
  },
  {
    name: '광주역',
    description: '광주광역시 북구',
  },
  {
    name: '광주시청',
    description: '광주광역시 서구',
  },
]

function SearchPage({ onBack, onRoute }: SearchPageProps) {
  const [keyword, setKeyword] = useState('')

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
              <p className="text-sm font-semibold text-[#666666]">
                목적지 검색
              </p>

              <h1 className="mt-1 text-3xl font-bold">어디로 가시나요?</h1>
            </div>
          </div>

          {/* 검색창 */}
          <section className="mt-8">
            <div className="flex items-center gap-4 rounded-[24px] bg-white px-5 py-5 shadow-[0_3px_12px_rgba(0,0,0,0.06)]">
              <SearchIcon size={28} />

              <input
                type="text"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="장소 이름을 입력해주세요"
                className="min-w-0 flex-1 bg-transparent text-xl font-medium outline-none placeholder:text-[#999999]"
              />

              {keyword && (
                <button
                  type="button"
                  onClick={() => setKeyword('')}
                  aria-label="검색어 지우기"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEEEEE] text-sm font-bold"
                >
                  ×
                </button>
              )}
            </div>

            {/* 경로 찾기 */}
            <button
              type="button"
              onClick={onRoute}
              className="mt-4 w-full rounded-[24px] bg-[#111111] py-5 text-xl font-bold text-white shadow-[0_4px_14px_rgba(0,0,0,0.1)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(0,0,0,0.12)] active:translate-y-0"
            >
              이곳으로 가는 길 찾기
            </button>
          </section>

          {/* 최근 목적지 */}
          <section className="mt-10">
            <h2 className="text-xl font-bold">최근 목적지</h2>

            <div className="mt-4 overflow-hidden rounded-3xl bg-white shadow-[0_3px_12px_rgba(0,0,0,0.05)]">
              {recentPlaces.map((place, index) => (
                <button
                  key={place.name}
                  type="button"
                  onClick={onRoute}
                  className={`flex w-full items-center gap-4 px-5 py-5 text-left transition hover:bg-[#FAFAFA] active:bg-[#F5F5F3] ${
                    index !== recentPlaces.length - 1
                      ? 'border-b border-[#EEEEEE]'
                      : ''
                  }`}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFEEA0]">
                    <LocationIcon size={25} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xl font-bold">{place.name}</p>

                    <p className="mt-1 text-sm text-[#777777]">
                      {place.description}
                    </p>
                  </div>

                  <span className="text-2xl font-bold text-[#777777]">→</span>
                </button>
              ))}
            </div>
          </section>

          {/* 검색 도움말 */}
          <section className="mt-8 rounded-3xl bg-white p-5 shadow-[0_3px_12px_rgba(0,0,0,0.05)]">
            <p className="text-base font-bold">장소를 찾을 수 있어요</p>

            <p className="mt-2 text-sm leading-relaxed text-[#666666]">
              역, 병원, 학교, 관공서 등
              <br />
              가고 싶은 장소의 이름을 입력해주세요.
            </p>
          </section>
        </section>
      </div>
    </main>
  )
}

export default SearchPage
