// src/components/RegularBusCard.tsx
import React from 'react'

interface Props {
  number: string
  type: string
  direction: string
  isLowFloor: boolean
  route: string
  congestion: string
  time: string
  stopsLeft: string
  opacity?: string
}

const RegularBusCard: React.FC<Props> = ({
  number,
  type,
  direction,
  isLowFloor,
  route,
  congestion,
  time,
  stopsLeft,
  opacity = '100',
}) => {
  return (
    <section
      className={`bg-white rounded-2xl shadow-sm p-5 flex justify-between items-center opacity-${opacity}`}
    >
      <div className="flex gap-4">
        <div className="bg-[#E0E0E0] text-gray-700 rounded-xl w-16 h-16 flex flex-col items-center justify-center">
          <span className="font-bold text-2xl leading-none">{number}</span>
          <span className="text-xs mt-1">{type}</span>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-lg">{direction}</h3>
            {isLowFloor ? (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                ✔ 저상 운행
              </span>
            ) : (
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                일반 버스
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 truncate w-[260px]">{route}</p>
        </div>
      </div>
      <div className="text-right flex flex-col justify-center">
        <p className="text-xs text-gray-500 mb-1">{congestion}</p>
        <div className="flex items-baseline justify-end gap-1 mb-1">
          <span className="text-sm text-gray-600">약</span>
          <span className="font-bold text-2xl text-gray-800">{time}</span>
          <span className="text-sm text-gray-600">분 후</span>
        </div>
        <p className="text-xs text-gray-400">{stopsLeft}</p>
      </div>
    </section>
  )
}

export default RegularBusCard
