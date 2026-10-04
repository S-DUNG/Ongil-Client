import React, { useState } from 'react'
import Header from '../components/Header'
import BackButton from '../components/BackButton'

interface HelpRequestPageProps {
  onNavigate: (page: 'bus' | 'route' | 'help' | 'guide', id?: number) => void
  onBack: () => void
}

const HelpRequestPage: React.FC<HelpRequestPageProps> = ({
  onNavigate,
  onBack,
}) => {
  const [selectedId, setSelectedId] = useState<number>(1)

  const options = [
    {
      id: 1,
      text: '길을 찾기 어려워요 / 길을 잃었어요',
      icon: (
        <svg
          width="20"
          height="20"
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
          width="20"
          height="20"
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
          width="20"
          height="20"
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
      <Header onHome={onBack} />

      <main className="w-full max-w-4xl px-6 py-8">
        <div className="flex items-start gap-5 mb-8">
          <BackButton onClick={onBack} />

          <div>
            <h1 className="text-[32px] font-extrabold text-[#695C4A] mb-2">
              무엇을 도와드릴까요?
            </h1>

            <p className="text-[17px] font-medium text-[#8C7A60] leading-relaxed">
              궁금하시거나 불편한 사항을 선택하시면 맞춤형 안내를 제공해
              드립니다.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#E8E2D5]">
          <div className="flex justify-between items-center mb-5 px-1 text-[15px] text-[#9E8B70] font-semibold">
            <span>도움 요청 유형 선택</span>
            <span>해당 항목을 눌러주세요</span>
          </div>

          <div className="space-y-4 mb-8">
            {options.map((opt) => {
              const isSelected = selectedId === opt.id

              return (
                <div
                  key={opt.id}
                  onClick={() => setSelectedId(opt.id)}
                  className={`flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all outline-none focus:outline-none select-none ${
                    isSelected
                      ? 'bg-[#FFFDEB] shadow-[0_4px_14px_rgba(105,92,74,0.18)]'
                      : 'bg-white shadow-[0_1px_5px_rgba(105,92,74,0.08)] hover:shadow-[0_3px_10px_rgba(105,92,74,0.12)]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl ${
                        isSelected
                          ? 'bg-[#FFEEA0] text-[#695C4A]'
                          : 'bg-[#F7F3EC] text-[#7A6A53]'
                      }`}
                    >
                      {opt.icon}
                    </div>

                    <span
                      className={`text-[19px] font-bold leading-relaxed ${
                        isSelected ? 'text-[#695C4A]' : 'text-[#7A6A53]'
                      }`}
                    >
                      {opt.text}
                    </span>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'border-[3px] border-[#695C4A]'
                        : 'border-2 border-[#D5CEBF]'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-3.5 h-3.5 rounded-full bg-[#695C4A]" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center mb-2">
            <button
              type="button"
              onClick={() => onNavigate('guide', selectedId)}
              className="w-full max-w-md py-4 bg-[#FFEEA0] text-[#695C4A] font-bold rounded-2xl text-[18px] hover:bg-[#FFE57A] transition flex items-center justify-center gap-2 shadow-sm cursor-pointer border border-[#E3C37A]"
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
