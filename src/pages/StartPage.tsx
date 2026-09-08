import React from 'react'
import Header from '../components/Header'

interface StartPageProps {
  onStart: () => void
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
  return (
    <div className="w-full min-h-screen bg-[#FBFBFB] flex flex-col font-sans items-center pb-12">
      {/* 상단 공통 헤더 */}
      <Header />

      {/* 메인 컨텐츠 영역 (760px 기준선) */}
      <main className="w-full max-w-[760px] px-6 pt-6 flex flex-col items-center">
        {/* 1. 날씨 & 미세먼지 안내 위젯 (button 태그로 감싸서 클릭 보장) */}
        <button
          type="button"
          onClick={onStart}
          className="w-full bg-white rounded-3xl border-2 border-amber-100 p-6 mb-8 shadow-sm flex items-center justify-between hover:border-amber-300 transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center text-4xl shadow-inner">
              🌤️
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-extrabold text-gray-900 text-xl">
                  오늘의 날씨
                </h3>
                <span className="bg-emerald-100 text-emerald-700 text-sm font-bold px-3 py-1 rounded-full">
                  미세먼지 보통 🟢
                </span>
              </div>
              <p className="text-base font-semibold text-gray-600">
                현재 기온 <span className="text-gray-900 font-bold">24°C</span>{' '}
                · 야외 활동하기 좋은 날씨예요
              </p>
            </div>
          </div>
        </button>

        {/* 2. 온길 로고 영역 */}
        <div className="flex flex-col items-center pointer-events-none my-4">
          <img
            src="/ongil-logo.png"
            alt="온길 로고"
            className="h-24 object-contain mb-2"
          />
        </div>

        {/* 3. 진짜 HTML <button> 태그로 만든 시작 버튼 */}
        <button
          type="button"
          onClick={onStart}
          className="w-full bg-white px-12 py-6 rounded-full shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all cursor-pointer"
        >
          <span className="text-2xl font-bold text-gray-800 tracking-tight">
            화면을 터치하여 시작해 주세요
          </span>
        </button>
      </main>
    </div>
  )
}

export default StartPage
