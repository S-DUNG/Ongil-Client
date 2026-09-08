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
    <main className="min-h-screen bg-[#F7F3EC]">
      <Header />

      <div className="mx-auto min-h-screen w-full max-w-[760px]">
        <section className="px-6 pb-10 pt-8">
          {/* 제목 */}
          <div className="flex items-center gap-4">
            <BackButton onClick={onBack} />

            <div>
              <p className="text-sm font-semibold text-[#8A7B6D]">
                목적지 검색
              </p>

              <h1 className="mt-1 text-3xl font-bold text-[#66563F]">
                어디로 가시나요?
              </h1>
            </div>
          </div>

          {/* 검색 */}
          <section className="mt-8">
            <div className="flex items-center gap-4 rounded-[24px] bg-white px-5 py-5 shadow-[0_3px_12px_rgba(102,86,63,0.07)]">
              <SearchIcon size={28} />

              <input
                type="text"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="장소 이름을 입력해주세요"
                className="min-w-0 flex-1 bg-transparent text-xl font-medium text-[#66563F] outline-none placeholder:text-[#A3978D]"
              />

              {keyword && (
                <button
                  type="button"
                  onClick={() => setKeyword('')}
                  aria-label="검색어 지우기"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EDE6DE] text-sm font-bold text-[#66563F]"
                >
                  ×
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={onRoute}
              className="mt-4 w-full rounded-[24px] bg-[#66563F] py-5 text-xl font-bold text-white shadow-[0_4px_14px_rgba(102,86,63,0.14)] transition hover:-translate-y-0.5 hover:bg-[#594A36] hover:shadow-[0_6px_18px_rgba(102,86,63,0.18)] active:translate-y-0"
            >
              이곳으로 가는 길 찾기
            </button>
          </section>

          {/* 최근 목적지 */}
          <section className="mt-10">
            <h2 className="text-xl font-bold text-[#66563F]">최근 목적지</h2>

            <div className="mt-4 overflow-hidden rounded-3xl bg-white shadow-[0_3px_12px_rgba(102,86,63,0.06)]">
              {recentPlaces.map((place, index) => (
                <button
                  key={place.name}
                  type="button"
                  onClick={onRoute}
                  className={`flex w-full items-center gap-4 px-5 py-5 text-left transition hover:bg-[#FCFAF7] active:bg-[#F5EFE8] ${
                    index !== recentPlaces.length - 1
                      ? 'border-b border-[#EEE6DE]'
                      : ''
                  }`}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFEEA0] text-[#66563F]">
                    <LocationIcon size={25} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xl font-bold text-[#66563F]">
                      {place.name}
                    </p>

                    <p className="mt-1 text-sm text-[#8A7B6D]">
                      {place.description}
                    </p>
                  </div>

                  <span className="text-2xl font-bold text-[#66563F]">→</span>
                </button>
              ))}
            </div>
          </section>

          {/* 안내 */}
          <section className="mt-8 rounded-3xl bg-[#F1E5D5] p-5">
            <p className="text-base font-bold text-[#66563F]">
              장소를 찾을 수 있어요
            </p>

            <p className="mt-2 text-sm leading-relaxed text-[#75685E]">
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
