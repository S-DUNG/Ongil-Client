interface StartPageProps {
  onStart: () => void
}

function StartPage({ onStart }: StartPageProps) {
  return (
    <main className="min-h-screen bg-[#F7F3EC] text-[#695C4A] font-sans">
      <div className="mx-auto flex min-h-screen w-full max-w-[760px] flex-col">
        <section className="flex flex-1 flex-col items-center justify-center px-6 pb-16">
          <div className="text-center">
            <h1 className="text-[72px] font-bold leading-none tracking-[-0.06em] text-[#695C4A]">
              온길
            </h1>

            <p className="mt-8 text-[21px] font-semibold leading-[1.5] tracking-[-0.03em] text-[#695C4A]">
              당신이 가는 길, 온길이 함께합니다
            </p>
          </div>

          <div className="mt-28 w-full">
            <button
              type="button"
              onClick={onStart}
              className="flex min-h-[80px] w-full items-center justify-center rounded-[24px] bg-[#FFEEA0] text-[#695C4A] shadow-[0_4px_14px_rgba(105,92,74,0.08)] transition hover:-translate-y-0.5 hover:bg-[#FFEEA0] hover:shadow-[0_6px_18px_rgba(105,92,74,0.12)] active:translate-y-0"
            >
              <span className="text-[26px] font-bold leading-none tracking-[-0.03em]">
                시작하기
              </span>
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}

export default StartPage
