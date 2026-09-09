import React from 'react'
import Header from '../components/Header'
import SubNavbar from '../components/SubNavbar'

interface HelpGuidePageProps {
  selectedId: number
  onNavigate: (page: 'bus' | 'route' | 'help' | 'guide', id?: number) => void
  onEndSession?: () => void
}

const HelpGuidePage: React.FC<HelpGuidePageProps> = ({
  selectedId,
  onNavigate,
  onEndSession,
}) => {
  const guideDataMap: Record<
    number,
    { title: string; steps: string[]; tip: string }
  > = {
    1: {
      title: '길을 찾기 어려워요 / 길을 잃었어요',
      steps: [
        '화면 상단의 [음성안내 요청] 버튼을 터치해 보세요.',
        '가고자 하는 목적지의 이름을 음성으로 또박또박 말씀해 주시면 검색해 드립니다.',
        '검색된 버스 노선이나 정류장 위치를 화면에서 확인하고 기다려 주세요.',
      ],
      tip: '현재 계신 정류장 번호와 위치는 화면 상단에서 언제든 확인할 수 있습니다.',
    },
    2: {
      title: '버스 탑승 및 하차 방법이 궁금해요',
      steps: [
        '실시간 버스 정보에서 타고자 하는 버스의 도착 시간을 확인합니다.',
        '버스가 정류장에 도착하면 차량 번호와 방면을 다시 한번 확인합니다.',
        '승차 시 교통카드를 단말기에 태그하고, 내릴 때는 미리 하차 벨을 누릅니다.',
      ],
      tip: '몸이 불편하신 경우 저상버스(휠체어 마크) 표시가 있는 버스를 이용하시면 편리합니다.',
    },
    4: {
      title: '스마트 패드 기기 사용 안내가 필요해요',
      steps: [
        '터치 반응이 느릴 때는 화면을 꾹 누르지 말고 가볍게 톡 터치해 주세요.',
        '기기 사용이 어려우실 땐 상단의 [음성안내 요청]을 누르면 말로 조작할 수 있습니다.',
        '화면을 30초 동안 터치하지 않으면 자동으로 처음 화면으로 초기화됩니다.',
      ],
      tip: '이전 화면으로 돌아가고 싶을 때는 언제든 좌측 상단의 [← 이전으로] 버튼을 눌러주세요.',
    },
  }

  const currentGuide = guideDataMap[selectedId] || guideDataMap[1]

  return (
    <div className="w-full min-h-screen bg-[#F7F3EC] flex flex-col items-center font-sans text-[#695C4A] pb-16 relative">
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

      <main className="w-full max-w-[760px] px-6 pt-8 flex flex-col">
        <div className="mb-6">
          <button
            type="button"
            onClick={() => onNavigate('help')}
            className="text-sm text-[#7A6A53] hover:text-[#695C4A] mb-2 font-medium transition cursor-pointer flex items-center gap-1"
          >
            ← 이전으로 (도움 요청 선택)
          </button>
          <h1 className="text-[28px] font-extrabold tracking-tight text-[#695C4A] mb-1">
            맞춤형 이용 안내
          </h1>
          <p className="text-[15px] text-[#8C7A60]">
            선택하신 항목에 대한 상세한 이용 방법을 순서대로 안내해 드립니다.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#E8E2D5] mb-8">
          <div className="border-b border-[#E8E2D5] pb-6 mb-6">
            <h2 className="text-[22px] font-bold text-[#695C4A]">
              {currentGuide.title}
            </h2>
          </div>

          <div className="space-y-4 mb-8">
            {currentGuide.steps.map((step, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-5 rounded-2xl bg-[#F7F3EC] border border-[#E8E2D5]"
              >
                <div className="w-8 h-8 rounded-full bg-[#FFEEA0] text-[#695C4A] font-bold flex items-center justify-center shrink-0 text-sm border border-[#E3C37A]">
                  {index + 1}
                </div>
                <p className="text-[16px] font-medium text-[#695C4A]">{step}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#FFFDEB] border-2 border-[#E3C37A] rounded-2xl p-5 flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div>
              <h4 className="font-bold text-[#695C4A] text-base mb-1">
                참고해 주세요!
              </h4>
              <p className="text-[#7A6A53] text-sm leading-relaxed">
                {currentGuide.tip}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            type="button"
            onClick={() => onNavigate('help')}
            className="flex-1 max-w-[220px] py-4 bg-white text-[#7A6A53] font-bold rounded-2xl text-[16px] hover:bg-[#F9F6F0] transition cursor-pointer text-center border border-[#E8E2D5]"
          >
            다른 도움말 보기
          </button>
          <button
            type="button"
            onClick={() => onNavigate('bus')}
            className="flex-1 max-w-[280px] py-4 bg-[#FFEEA0] text-[#695C4A] font-bold rounded-2xl text-[16px] hover:bg-[#FFE57A] transition shadow-sm cursor-pointer border border-[#E3C37A] text-center"
          >
            실시간 버스 정보 보러가기 →
          </button>
        </div>
      </main>
    </div>
  )
}

export default HelpGuidePage
