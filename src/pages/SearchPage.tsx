import { useState } from 'react'

import BackButton from '../components/BackButton'
import Header from '../components/Header'

import { LocationIcon, SearchIcon } from '../components/Icons'

interface SearchPageProps {
  onBack: () => void
  onRoute: (destination: Destination) => void
  onHome: () => void
}

export interface Destination {
  destinationId: string
  name: string
  addressName: string
  lat: number
  lng: number
}

function SearchPage({ onBack, onRoute, onHome }: SearchPageProps) {
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState<Destination[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    const trimmedKeyword = keyword.trim()

    if (!trimmedKeyword) {
      setResults([])
      return
    }

    setIsSearching(true)
    setError('')

    try {
      const response = await fetch(
        `/api/destinations/search?query=${encodeURIComponent(trimmedKeyword)}`,
      )

      if (!response.ok) {
        throw new Error('목적지 검색에 실패했습니다.')
      }

      const data: Destination[] = await response.json()

      setResults(data)
    } catch (error) {
      console.error(error)
      setResults([])
      setError('목적지를 불러오지 못했어요.')
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC]">
      <Header onHome={onHome} />

      <div className="mx-auto min-h-screen w-full max-w-[760px]">
        <section className="px-6 pb-10 pt-8">
          <div className="flex items-center gap-4">
            <BackButton onClick={onBack} />

            <div>
              <p className="text-sm font-semibold text-[#695C4A]/70">
                목적지 검색
              </p>

              <h1 className="mt-1 text-3xl font-bold text-[#695C4A]">
                어디로 가시나요?
              </h1>
            </div>
          </div>

          <section className="mt-8">
            <div className="flex items-center gap-4 rounded-[24px] bg-white px-5 py-5 shadow-[0_3px_12px_rgba(105,92,74,0.07)]">
              <SearchIcon size={28} />

              <input
                type="text"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleSearch()
                  }
                }}
                placeholder="장소 이름을 입력해주세요"
                className="min-w-0 flex-1 bg-transparent text-xl font-medium text-[#695C4A] outline-none placeholder:text-[#695C4A]/45"
              />

              {keyword && (
                <button
                  type="button"
                  onClick={() => {
                    setKeyword('')
                    setResults([])
                    setError('')
                  }}
                  aria-label="검색어 지우기"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F7F3EC] text-sm font-bold text-[#695C4A]"
                >
                  ×
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleSearch}
              disabled={isSearching}
              className="mt-4 w-full rounded-[24px] bg-[#695C4A] py-5 text-xl font-bold text-white shadow-[0_4px_14px_rgba(105,92,74,0.14)] transition hover:-translate-y-0.5 hover:bg-[#5B4F40] hover:shadow-[0_6px_18px_rgba(105,92,74,0.18)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSearching ? '검색 중...' : '목적지 검색'}
            </button>
          </section>

          {error && (
            <p className="mt-5 rounded-2xl bg-[#FFEEA0] px-5 py-4 text-base font-semibold text-[#695C4A]">
              {error}
            </p>
          )}

          {results.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-bold text-[#695C4A]">검색 결과</h2>

              <div className="mt-4 overflow-hidden rounded-3xl bg-white shadow-[0_3px_12px_rgba(105,92,74,0.06)]">
                {results.map((destination) => (
                  <button
                    key={destination.destinationId}
                    type="button"
                    onClick={() => onRoute(destination)}
                    className="flex w-full items-center gap-4 border-b border-[#F7F3EC] px-5 py-5 text-left transition last:border-b-0 hover:bg-[#F7F3EC] active:bg-[#FFEEA0]"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFEEA0] text-[#695C4A]">
                      <LocationIcon size={25} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xl font-bold text-[#695C4A]">
                        {destination.name}
                      </p>

                      <p className="mt-1 text-sm text-[#695C4A]/70">
                        {destination.addressName}
                      </p>
                    </div>

                    <span className="text-2xl font-bold text-[#695C4A]">→</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {keyword.trim() && !isSearching && !error && results.length === 0 && (
            <section className="mt-8 rounded-3xl bg-[#FFEEA0] p-5">
              <p className="text-base font-bold text-[#695C4A]">
                검색 결과가 없어요.
              </p>

              <p className="mt-2 text-sm leading-relaxed text-[#695C4A]/70">
                장소 이름을 다시 확인해주세요.
              </p>
            </section>
          )}

          {!keyword.trim() && (
            <section className="mt-8 rounded-3xl bg-[#F1E5D5] p-5">
              <p className="text-base font-bold text-[#66563F]">
                장소를 찾아보세요
              </p>

              <p className="mt-2 text-sm leading-relaxed text-[#75685E]">
                역, 병원, 학교, 관공서 등
                <br />
                가고 싶은 장소의 이름을 입력해주세요.
              </p>
            </section>
          )}
        </section>
      </div>
    </main>
  )
}

export default SearchPage
