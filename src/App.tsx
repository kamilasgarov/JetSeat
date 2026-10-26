import { useState } from 'react'
import { Armchair, Car, CheckCircle2, ChevronRight, Fan, Package, Plug, Eye } from 'lucide-react'
import CarLayout from './components/CarLayout'
import { allSeats, defaultOccupied } from './seats'

const STORAGE_KEY = 'jetta-booked-seats'

function loadBooked(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveBooked(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // Storage unavailable (e.g. private mode) — booking stays in memory only
  }
}

const legend = [
  { label: 'Seçilmiş yer', className: 'text-blue-500' },
  { label: 'Mövcud yer', className: 'text-slate-600' },
  { label: 'Mövcud deyil', className: 'text-slate-300' },
  { label: 'Məşğul yer', className: 'text-red-500' },
]

const features = [
  { label: 'Geniş görüntü', Icon: Eye },
  { label: 'Kondisioner hava axını', Icon: Fan },
  { label: 'USB girişi', Icon: Plug },
  { label: 'Bardaqlıq və kiçik saxlama yeri', Icon: Package },
]

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [confirmedId, setConfirmedId] = useState<string | null>(null)
  const [booked, setBooked] = useState<string[]>(loadBooked)

  const occupiedIds = [...defaultOccupied, ...booked]
  const selectedSeat = allSeats.find((s) => s.id === selectedId)

  function handleSelect(id: string) {
    setSelectedId((prev) => (prev === id ? null : id))
    setConfirmedId(null)
  }

  function handleConfirm() {
    if (!selectedId) return
    const next = [...booked, selectedId]
    setBooked(next)
    saveBooked(next)
    setConfirmedId(selectedId)
    setSelectedId(null)
  }

  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900 lg:flex-row">
      {/* Road */}
      <section className="relative flex items-center justify-center overflow-hidden bg-[#3b3f45] px-4 py-12 lg:flex-1">
        <div className="absolute inset-y-0 left-[12%] w-1.5 bg-white/40" />
        <div className="absolute inset-y-0 right-[12%] w-1.5 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.4)_0_60px,transparent_60px_110px)]" />
        <CarLayout selectedId={selectedId} occupiedIds={occupiedIds} onSelect={handleSelect} />
      </section>

      {/* Panel */}
      <section className="flex w-full flex-col gap-6 bg-slate-50 px-4 py-10 sm:px-8 lg:max-w-md">
        <header className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[#0b1f4d] text-[#0b1f4d]">
            <Car size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#0b1f4d]">Jetta Seat Selection</h1>
            <p className="text-slate-500">Sərnişin yerinizi seçin</p>
          </div>
        </header>

        <ul className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4">
          {legend.map((item) => (
            <li key={item.label} className="flex items-center gap-3 text-slate-600">
              <Armchair className={item.className} size={24} fill="currentColor" />
              {item.label}
            </li>
          ))}
        </ul>

        <div>
          <h2 className="mb-2 font-semibold">Seçilmiş yer</h2>
          <div
            className={`flex items-center gap-4 rounded-xl border-2 bg-white p-4 ${
              selectedSeat ? 'border-blue-600' : 'border-dashed border-slate-200'
            }`}
          >
            <Armchair
              className={selectedSeat ? 'text-blue-500' : 'text-slate-300'}
              size={32}
              fill="currentColor"
            />
            {selectedSeat ? (
              <div>
                <p className="text-lg font-semibold">
                  {selectedSeat.id} — {selectedSeat.label}
                </p>
                <p className="text-sm text-slate-500">Sərnişin yeri</p>
              </div>
            ) : (
              <p className="text-slate-400">Hələ yer seçilməyib</p>
            )}
          </div>
        </div>

        {selectedSeat && (
          <div>
            <h2 className="mb-3 font-semibold">Yerin üstünlükləri</h2>
            <ul className="flex flex-col gap-3 text-slate-600">
              {features.map(({ label, Icon }) => (
                <li key={label} className="flex items-center gap-3">
                  <Icon size={20} className="text-slate-700" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="button"
          disabled={!selectedSeat}
          onClick={handleConfirm}
          className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
        >
          Yeri təsdiqlə
          <ChevronRight size={20} />
        </button>

        {confirmedId && (
          <div className="flex items-center gap-3 rounded-xl bg-green-50 p-4 text-green-700">
            <CheckCircle2 size={24} />
            <p>
              <span className="font-semibold">{confirmedId}</span> yeri uğurla təsdiqləndi!
            </p>
          </div>
        )}
      </section>
    </main>
  )
}
