// src/components/CongestionChart.tsx
import React from 'react';

const CongestionChart: React.FC = () => {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 mt-4">
      <div className="flex justify-between items-end mb-6">
        <h3 className="font-bold flex items-center gap-2 text-lg">
          시간대별 예상 혼잡도 안내
        </h3>
        <span className="text-xs text-gray-400">광주역 정류소 통계 데이터 기반</span>
      </div>

      <div className="flex gap-4">
        {/* 출근 시간대 */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">출근 시간대</span>
            <span className="text-xs text-gray-400">07~09시</span>
          </div>
          <div className="h-2 w-full bg-red-500 rounded-full mb-2"></div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-red-500">● 혼잡</span>
            <span className="text-xs text-gray-500">입석 다수</span>
          </div>
        </div>
        
        {/* 오전 시간대 */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">오전 시간대</span>
            <span className="text-xs text-gray-400">10~12시</span>
          </div>
          <div className="h-2 w-full bg-gray-300 rounded-full mb-2"></div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-gray-500">● 보통</span>
            <span className="text-xs text-gray-500">좌석 가능</span>
          </div>
        </div>

        {/* 낮 시간대 */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">낮 시간대</span>
            <span className="text-xs text-gray-400">13~16시</span>
          </div>
          <div className="h-2 w-full bg-green-500 rounded-full mb-2"></div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-green-600">● 여유</span>
            <span className="text-xs text-gray-500">좌석 넉넉</span>
          </div>
        </div>

        {/* 퇴근 시간대 */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">퇴근 시간대</span>
            <span className="text-xs text-gray-400">18~20시</span>
          </div>
          <div className="h-2 w-full bg-red-500 rounded-full mb-2"></div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-red-500">● 혼잡</span>
            <span className="text-xs text-gray-500">탑승 대기</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CongestionChart;