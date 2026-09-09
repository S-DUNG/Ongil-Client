import React, { useState } from 'react'
import Header from '../components/Header'
import SubNavbar from '../components/SubNavbar'

interface HelpRequestPageProps {
  onNavigate: (page: 'bus' | 'route' | 'help' | 'guide', id?: number) => void
  onEndSession?: () => void
}

const HelpRequestPage: React.FC<HelpRequestPageProps> = ({
  onNavigate,
  onEndSession,
}) => {
  const [selectedId, setSelectedId] = useState<number>(1)

  const options = [
    {
      id: 1,
      text: '길을 찾기 어려워요 / 길을 잃었어요',
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      ),
    },
    {
      id: 2,
      text: '버스 탑승 및 하차 방법이 궁금해요',
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="4" width="18" height="15" rx="2" />
          <path d="M4 11h16" />
          <circle cx="8" cy="15" r="1" />
          <circle cx="16" cy="15" r="1" />
        </svg>
      ),
    },
    {
      id: 4,
      text: '스마트 패드 기기 사용 안내가 필요해요',
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
  ]

  return (
    <div className="w-full flex flex-col items-center pb-16 font-sans min-h-screen bg-[#F7F3EC] text-[#695C4A] relative">
      <div className="w-full">
        <Header />
      </div>
      <SubNavbar onMenuClick={onNavigate} />

      {/* 우측 상단 이용 종료 버튼 */}
      {onEndSession && (
        <div className="absolute top-6 right-10 z-50">
          <button
            type="button"
            onClick={onEndSession}
            className="bg-[#695C4A] hover:bg-[#524638] text-[#FFEEA0] px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-colors flex items-center gap-2 cursor-pointer border border-[#E3C37A]"
          >
            <span>⟲</span> 이용 종료
          </button>
        </div>
      )}

      <main className="w-full max-w-4xl px-6 py-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <button
              onClick={() => onNavigate('bus')}
              className="flex items-center gap-1 text-sm text-[#7A6A53] hover:text-[#695C4A] mb-2 transition font-medium cursor-pointer"
            >
              ← 이전으로
            </button>
            <h1 className="text-3xl font-bold text-[#695C4A] mb-1.5">
              무엇을 도와드릴까요?
            </h1>
            <p className="text-[#8C7A60] text-sm">
              궁금하시거나 불편한 사항을 선택하시면 맞춤형 안내를 제공해
              드립니다.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#E8E2D5]">
          <div className="flex justify-between items-center mb-4 px-1 text-xs text-[#9E8B70] font-medium">
            <span>도움 요청 유형 선택</span>
            <span>해당 항목을 눌러주세요</span>
          </div>

          <div className="space-y-3 mb-8">
            {options.map((opt) => {
              const isSelected = selectedId === opt.id
              return (
                <div
                  key={opt.id}
                  onClick={() => setSelectedId(opt.id)}
                  className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#E3C37A] bg-[#FFFDEB] shadow-sm'
                      : 'border-[#E8E2D5] bg-white hover:border-[#E3C37A]/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl ${isSelected ? 'bg-[#FFEEA0] text-[#695C4A]' : 'bg-[#F7F3EC] text-[#7A6A53]'}`}
                    >
                      {opt.icon}
                    </div>
                    <span
                      className={`text-lg font-bold ${isSelected ? 'text-[#695C4A]' : 'text-[#7A6A53]'}`}
                    >
                      {opt.text}
                    </span>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-[#695C4A] bg-[#FFEEA0] text-[#695C4A]'
                        : 'border-[#D5CEBF]'
                    }`}
                  >
                    {isSelected && <span className="text-xs font-bold">✓</span>}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center mb-2">
            <button
              onClick={() => onNavigate('guide', selectedId)}
              className="w-full max-w-md py-4 bg-[#FFEEA0] text-[#695C4A] font-bold rounded-2xl text-lg hover:bg-[#FFE57A] transition flex items-center justify-center gap-2 shadow-sm cursor-pointer border border-[#E3C37A]"
            >
            이 내용으로 안내받기
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HelpRequestPage
