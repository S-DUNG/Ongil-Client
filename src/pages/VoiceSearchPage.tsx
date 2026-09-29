import { useEffect, useRef, useState } from 'react'

import BackButton from '../components/BackButton'
import Header from '../components/Header'

import { LocationIcon, MicIcon, SearchIcon } from '../components/Icons'
import type { Destination } from './SearchPage'

interface VoiceSearchPageProps {
  onBack: () => void
  onRoute: (destination: Destination) => void
  onHome: () => void
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
}

interface SpeechRecognitionInstance {
  lang: string
  interimResults: boolean
  continuous: boolean
  start: () => void
  stop: () => void
  abort: () => void
  onstart: (() => void) | null
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor
    webkitSpeechRecognition?: SpeechRecognitionConstructor
  }
}

function VoiceSearchPage({ onBack, onRoute, onHome }: VoiceSearchPageProps) {
  const [isListening, setIsListening] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const [error, setError] = useState(
    typeof window !== 'undefined' &&
      !window.SpeechRecognition &&
      !window.webkitSpeechRecognition
      ? '이 브라우저에서는 음성 검색을 사용할 수 없습니다.'
      : '',
  )

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      return
    }

    const recognition = new SpeechRecognition()

    recognition.lang = 'ko-KR'
    recognition.interimResults = false
    recognition.continuous = false

    recognition.onstart = () => {
      setIsListening(true)
      setError('')
    }

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript.trim()

      if (!result) {
        setError('음성을 인식하지 못했어요. 다시 말씀해주세요.')
        return
      }

      setKeyword(result)
      setError('')
    }

    recognition.onerror = (event) => {
      console.error('음성 인식 오류:', event.error)

      if (event.error === 'not-allowed') {
        setError(
          '마이크 사용 권한이 필요합니다. 브라우저에서 마이크 권한을 허용해주세요.',
        )
      } else if (event.error === 'no-speech') {
        setError('음성이 들리지 않았어요. 다시 말씀해주세요.')
      } else if (event.error === 'network') {
        setError('음성 인식에 연결할 수 없습니다. 인터넷 연결을 확인해주세요.')
      } else {
        setError('음성을 잘 듣지 못했어요. 다시 말씀해주세요.')
      }

      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition

    return () => {
      recognition.abort()
      recognitionRef.current = null
    }
  }, [])

  const handleStartListening = () => {
    const recognition = recognitionRef.current

    if (!recognition) {
      setError('이 브라우저에서는 음성 검색을 사용할 수 없습니다.')
      return
    }

    if (isListening) {
      recognition.stop()
      return
    }

    setKeyword('')
    setError('')

    try {
      recognition.start()
    } catch (error) {
      console.error('음성 인식 시작 오류:', error)
      setError('음성 인식을 시작하지 못했어요. 다시 눌러주세요.')
    }
  }

  const handleSearch = async () => {
    const trimmedKeyword = keyword.trim()

    if (!trimmedKeyword) {
      setError('목적지를 먼저 말씀해주세요.')
      return
    }

    setIsSearching(true)
    setError('')

    try {
      const response = await fetch(
        `/api/destinations/search?query=${encodeURIComponent(trimmedKeyword)}`,
      )

      if (!response.ok) {
        console.error(
          '목적지 검색 응답 상태:',
          response.status,
          response.statusText,
        )

        throw new Error('목적지 검색에 실패했습니다.')
      }

      const data: Destination[] = await response.json()

      console.log('음성 검색 결과:', data)

      if (data.length === 0) {
        setError('말씀하신 장소를 찾지 못했어요. 다시 말씀해주세요.')
        return
      }

      onRoute(data[0])
    } catch (error) {
      console.error('목적지 검색 오류:', error)
      setError('목적지를 불러오지 못했어요. 잠시 후 다시 시도해주세요.')
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC]">
      <Header onHome={onHome} />

      <div className="mx-auto min-h-screen w-full max-w-[760px]">
        <section className="px-6 pb-10 pt-8">
          {/* 페이지 제목 */}
          <div className="flex items-center gap-4">
            <BackButton onClick={onBack} />

            <div>
              <p className="text-sm font-semibold text-[#695C4A]/70">
                음성으로 목적지 검색
              </p>

              <h1 className="mt-1 text-3xl font-bold text-[#695C4A]">
                어디로 가시나요?
              </h1>
            </div>
          </div>

          {/* 음성 검색 */}
          <section className="mt-12 flex flex-col items-center">
            <p className="text-lg font-semibold text-[#695C4A]/70">
              {isListening
                ? '듣고 있어요'
                : keyword
                  ? '이렇게 들었어요'
                  : '목적지를 말씀해주세요'}
            </p>

            <button
              type="button"
              onClick={handleStartListening}
              disabled={isSearching}
              className={`mt-8 flex h-44 w-44 items-center justify-center rounded-full shadow-[0_6px_20px_rgba(105,92,74,0.12)] transition ${
                isListening
                  ? 'scale-105 bg-[#FFEEA0]'
                  : 'bg-white hover:scale-105 active:scale-100'
              } ${
                isSearching ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
              }`}
              aria-label={isListening ? '음성 인식 중지' : '음성 검색 시작'}
            >
              <MicIcon size={64} />
            </button>

            <p className="mt-8 text-center text-2xl font-bold text-[#695C4A]">
              {isListening
                ? '말씀해주세요'
                : keyword
                  ? keyword
                  : '마이크 버튼을 눌러주세요'}
            </p>

            {/* 음성 인식 중 애니메이션 */}
            {isListening && (
              <div className="mt-5 flex items-center gap-2">
                <span className="h-3 w-3 animate-pulse rounded-full bg-[#FFEEA0]" />

                <span className="h-3 w-3 animate-pulse rounded-full bg-[#FFEEA0] [animation-delay:150ms]" />

                <span className="h-3 w-3 animate-pulse rounded-full bg-[#FFEEA0] [animation-delay:300ms]" />
              </div>
            )}
          </section>

          {/* 인식한 목적지 */}
          {keyword && !isListening && (
            <section className="mt-10">
              <div className="rounded-[24px] bg-white p-5 shadow-[0_3px_12px_rgba(105,92,74,0.07)]">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFEEA0]">
                    <LocationIcon size={25} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#695C4A]/70">
                      인식한 목적지
                    </p>

                    <p className="mt-1 text-xl font-bold text-[#695C4A]">
                      {keyword}
                    </p>
                  </div>
                </div>
              </div>

              {/* 목적지 검색 */}
              <button
                type="button"
                onClick={handleSearch}
                disabled={isSearching}
                className="mt-4 flex w-full items-center justify-center gap-3 rounded-[24px] bg-[#695C4A] py-5 text-xl font-bold text-white shadow-[0_4px_14px_rgba(105,92,74,0.14)] transition hover:-translate-y-0.5 hover:bg-[#5B4F40] hover:shadow-[0_6px_18px_rgba(105,92,74,0.18)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <SearchIcon size={24} />

                {isSearching ? '목적지 찾는 중...' : '이 목적지로 검색'}
              </button>

              {/* 다시 말하기 */}
              <button
                type="button"
                onClick={handleStartListening}
                disabled={isSearching}
                className="mt-3 w-full rounded-[24px] bg-white py-5 text-xl font-bold text-[#695C4A] shadow-[0_3px_12px_rgba(105,92,74,0.07)] transition hover:bg-[#F7F3EC] active:bg-[#FFEEA0] disabled:cursor-not-allowed disabled:opacity-60"
              >
                다시 말하기
              </button>
            </section>
          )}

          {/* 오류 메시지 */}
          {error && (
            <section className="mt-5 rounded-2xl bg-[#F1E5D5] px-5 py-4">
              <p className="text-base font-semibold leading-relaxed text-[#66563F]">
                {error}
              </p>
            </section>
          )}

          {/* 초기 안내 */}
          {!keyword && !isListening && !error && (
            <section className="mt-10 rounded-3xl bg-[#F1E5D5] p-5">
              <p className="text-base font-bold text-[#66563F]">
                음성으로 편하게 찾아보세요
              </p>

              <p className="mt-2 text-sm leading-relaxed text-[#75685E]">
                마이크 버튼을 누르고
                <br />
                가고 싶은 장소의 이름을 말씀해주세요.
              </p>
            </section>
          )}
        </section>
      </div>
    </main>
  )
}

export default VoiceSearchPage
