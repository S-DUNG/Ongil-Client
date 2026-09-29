interface BackButtonProps {
  onClick: () => void
}

function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="뒤로가기"
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#695C4A] shadow-[0_3px_10px_rgba(105,92,74,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_5px_14px_rgba(105,92,74,0.12)] active:translate-y-0"
    >
      <svg
        width="27"
        height="27"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M15 18L9 12L15 6"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export default BackButton
