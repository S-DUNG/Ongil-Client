import React from 'react'

interface SubNavbarProps {
  onMenuClick: (menu: 'bus' | 'help' | 'guide', id?: number) => void
}

const SubNavbar: React.FC<SubNavbarProps> = ({ onMenuClick }) => {
  return (
    <div className="w-full bg-[#EEEEEE] flex justify-center border-b border-gray-200">
      <div className="w-full max-w-4xl px-6 flex items-center justify-between text-[15px] font-medium text-gray-500">
        <div className="flex items-center gap-8">
          <button
            onClick={() => onMenuClick('bus')}
            className="py-3 hover:text-gray-900 transition cursor-pointer"
          >
            실시간 버스도착
          </button>

          {/* '쉬운 길찾기' 버튼은 깔끔하게 제거했습니다! */}

          <button
            onClick={() => onMenuClick('help')}
            className="py-2.5 px-4 bg-[#FFE899] text-amber-950 font-bold rounded-lg shadow-sm cursor-pointer"
          >
            도움 요청
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-600 bg-white/60 px-3 py-1.5 rounded-full border border-gray-200">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
          <span>음성지원 켜짐</span>
        </div>
      </div>
    </div>
  )
}

export default SubNavbar
