import { frontRow, rearRow } from '../seats'
import Seat from './Seat'

type Props = {
  selectedId: string | null
  occupiedIds: string[]
  onSelect: (id: string) => void
}

function SteeringWheel() {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full border-[5px] border-[#2f343b] shadow-[inset_0_0_6px_rgba(0,0,0,0.6)]">
      <div className="h-5 w-7 rounded-md bg-[#2f343b]" />
    </div>
  )
}

export default function CarLayout({ selectedId, occupiedIds, onSelect }: Props) {
  return (
    <div className="relative h-[660px] w-[320px] shrink-0">
      {/* Side mirrors */}
      <div className="absolute top-[168px] -left-4 h-7 w-9 -rotate-12 rounded-l-full rounded-r-md bg-gradient-to-r from-slate-300 to-white" />
      <div className="absolute top-[168px] -right-4 h-7 w-9 rotate-12 rounded-l-md rounded-r-full bg-gradient-to-l from-slate-300 to-white" />

      {/* Body */}
      <div className="absolute inset-0 rounded-[46%_46%_36%_36%/13%_13%_9%_9%] bg-[linear-gradient(90deg,#c9ced5,#ffffff_14%,#ffffff_86%,#c9ced5)] shadow-[0_30px_60px_rgba(0,0,0,0.45)]" />

      {/* Hood line */}
      <div className="absolute top-6 left-1/2 h-16 w-40 -translate-x-1/2 rounded-t-[50%] border-t border-slate-200" />

      {/* Windshield */}
      <div className="absolute top-[92px] right-[30px] left-[30px] h-[70px] rounded-t-[60px] rounded-b-md bg-gradient-to-b from-[#4b5563] to-[#111418]" />

      {/* Cabin */}
      <div className="absolute top-[150px] right-[22px] left-[22px] h-[386px] rounded-[26px] bg-[#14171b] p-3 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
        {/* Dashboard */}
        <div className="relative mb-3 grid h-[64px] grid-cols-2 items-center border-b border-white/5">
          <div className="flex justify-center">
            <SteeringWheel />
          </div>
          <div className="absolute top-3 left-1/2 h-6 w-16 -translate-x-1/2 rounded-md border border-white/10 bg-[#0a0c0f]" />
        </div>

        {/* Front row with center console */}
        <div className="relative grid h-[120px] grid-cols-2 gap-x-12">
          <div className="absolute inset-y-1 left-1/2 flex w-9 -translate-x-1/2 flex-col items-center gap-2 rounded-lg bg-[#1c2025] pt-3">
            <div className="h-5 w-3 rounded-full bg-[#3a3f47]" />
            <div className="h-6 w-6 rounded-md bg-[#0f1114]" />
          </div>
          {frontRow.map((seat) => (
            <Seat key={seat.id} seat={seat} selected={selectedId === seat.id}
              occupied={occupiedIds.includes(seat.id)}
              onSelect={onSelect} />
          ))}
        </div>

        {/* Rear bench */}
        <div className="mt-8 grid h-[130px] grid-cols-3 gap-1 rounded-2xl bg-[#1c2025] p-1">
          {rearRow.map((seat) => (
            <Seat key={seat.id} seat={seat} selected={selectedId === seat.id}
              occupied={occupiedIds.includes(seat.id)}
              onSelect={onSelect} />
          ))}
        </div>
      </div>

      {/* Rear window */}
      <div className="absolute top-[532px] right-[34px] left-[34px] h-[34px] rounded-b-[40px] bg-gradient-to-b from-[#111418] to-[#4b5563]" />

      {/* Trunk */}
      <p className="absolute bottom-7 left-1/2 -translate-x-1/2 text-xs font-bold tracking-[0.5em] text-slate-700">
        JETTA
      </p>
      <div className="absolute bottom-10 left-3 h-3 w-16 -rotate-6 rounded-full bg-gradient-to-r from-red-800 to-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]" />
      <div className="absolute right-3 bottom-10 h-3 w-16 rotate-6 rounded-full bg-gradient-to-l from-red-800 to-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]" />
    </div>
  )
}
