// src/components/RequestStatusCard.tsx
import React from 'react'

const RequestStatusCard: React.FC = () => {
  return (
    <div className="bg-[#F8F8F7] rounded-2xl p-5 border border-gray-200/80">
      <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-800 font-medium">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#B8860B"
            strokeWidth="2.5"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          요청 위치:{' '}
          <span className="font-bold text-gray-900">
            광주역 정류장 스마트 패드 1호기
          </span>
        </div>
        <span className="bg-[#EFEFEF] text-gray-600 px-3 py-1 rounded-full text-xs font-bold border border-gray-200">
          접수 대기 중
        </span>
      </div>
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center gap-2 text-gray-600">
          <span className="w-2 h-2 rounded-full bg-amber-600"></span>
          요청 내역을 시스템에 확인 중입니다. {/* 🌟 담당자 이동 대신 수정! */}
        </div>
        <button className="text-gray-400 hover:text-gray-600 underline transition">
          오작동 시 [이용 종료] 터치
        </button>
      </div>
    </div>
  )
}

export default RequestStatusCard
