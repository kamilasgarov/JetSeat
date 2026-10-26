export type SeatInfo = {
  id: string
  label: string
  disabled?: boolean
}

export const frontRow: SeatInfo[] = [
  { id: '1A', label: 'Sürücü', disabled: true },
  { id: '1B', label: 'Ön sağ' },
]

export const rearRow: SeatInfo[] = [
  { id: '2A', label: 'Arxa sol' },
  { id: '2B', label: 'Arxa orta' },
  { id: '2C', label: 'Arxa sağ' },
]

export const allSeats = [...frontRow, ...rearRow]

export const defaultOccupied = ['1B', '2C']
