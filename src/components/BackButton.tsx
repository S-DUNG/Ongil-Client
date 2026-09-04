interface BackButtonProps {
  onClick: () => void
}

function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="뒤로가기"
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-2xl font-bold shadow-[0_3px_10px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_5px_14px_rgba(0,0,0,0.1)] active:translate-y-0"
    >
      ←
    </button>
  )
}

export default BackButton
