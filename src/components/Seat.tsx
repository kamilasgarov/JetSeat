import type { SeatInfo } from '../seats'

type Props = {
  seat: SeatInfo
  selected: boolean
  occupied: boolean
  onSelect: (id: string) => void
}

export default function Seat({ seat, selected, occupied, onSelect }: Props) {
  const surface = occupied
    ? 'border-red-400/70 bg-gradient-to-b from-red-500 to-red-700 disabled:opacity-100'
    : selected
      ? 'border-blue-300 bg-gradient-to-b from-blue-500 to-blue-700 shadow-[0_0_28px_rgba(59,130,246,0.75)]'
      : 'border-[#4a5059] bg-gradient-to-b from-[#3d424a] to-[#23272d] hover:border-blue-400'

  return (
    <button
      type="button"
      disabled={seat.disabled || occupied}
      onClick={() => onSelect(seat.id)}
      aria-pressed={selected}
      aria-label={`${seat.id} ${seat.label}`}
      className={`relative h-full w-full cursor-pointer overflow-hidden rounded-t-[22px] rounded-b-[14px] border transition-all disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:border-[#4a5059] ${surface}`}
    >
      {/* Side bolsters */}
      <span className="absolute inset-y-2 left-1 w-2 rounded-full bg-black/25" />
      <span className="absolute inset-y-2 right-1 w-2 rounded-full bg-black/25" />
      {/* Backrest */}
      <span className="absolute inset-x-2 bottom-1.5 h-[26%] rounded-lg border-t border-white/10 bg-black/20" />

      <span
        className={`relative mx-auto flex w-fit flex-col items-center rounded-md border px-2 py-1 ${
          selected ? 'border-white/30 bg-white/10 text-white' : 'border-white/10 bg-black/25 text-slate-100'
        }`}
      >
        <span className="text-lg leading-tight font-semibold">{seat.id}</span>
        <span className="text-[10px] whitespace-nowrap text-slate-200/90">
          {occupied ? 'Məşğul' : seat.label}
        </span>
      </span>
    </button>
  )
}
