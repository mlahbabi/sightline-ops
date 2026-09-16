import type { Sequence } from './types'

// HEURE LÉGALE DU MAROC — calcul manuel, sans dépendre de la base de fuseaux du téléphone.
// Décret n° 2.26.530 (BO du 29/06/2026) : dans la nuit du samedi 19 au dimanche 20 septembre 2026, à 02:00 (UTC+1)
// les horloges reculent à 01:00 et le Royaume reste définitivement à GMT. Les téléphones dont la base de fuseaux
// n'est pas à jour continueront d'afficher UTC+1 : l'app fait foi.
export const TZ = 'Africa/Casablanca'
export const SWITCH_UTC = Date.UTC(2026, 8, 20, 1, 0, 0) // 20/09/2026 01:00 UTC = 02:00 UTC+1 → 01:00 GMT
export const offsetMs = (d: Date) => (d.getTime() < SWITCH_UTC ? 3_600_000 : 0)
export const offsetLabel = (d: Date) => (d.getTime() < SWITCH_UTC ? 'UTC+1' : 'GMT')
/** Décalage entre l'heure du téléphone et l'heure légale du Maroc (minutes ; 0 = téléphone juste). */
export const phoneDriftMin = (d: Date) => Math.round((-d.getTimezoneOffset() * 60_000 - offsetMs(d)) / 60_000)

const p2 = (n: number) => String(n).padStart(2, '0')
/** Date/heure légale au Maroc : { date: 'YYYY-MM-DD', time: 'HH:MM', ddmm } */
export function mParts(d: Date) {
  const t = new Date(d.getTime() + offsetMs(d))
  const date = `${t.getUTCFullYear()}-${p2(t.getUTCMonth() + 1)}-${p2(t.getUTCDate())}`
  return { date, time: `${p2(t.getUTCHours())}:${p2(t.getUTCMinutes())}`, ddmm: `${p2(t.getUTCDate())}/${p2(t.getUTCMonth() + 1)}` }
}
/** Construit une Date à partir d'une date et d'une heure légale marocaine (UTC+1 jusqu'au 19/09 inclus, GMT à partir du 20/09). */
export const toDate = (date: string, time: string) => new Date(`${date}T${time}:00${date >= '2026-09-20' ? '+00:00' : '+01:00'}`)
export const hmOf = (ms: number) => mParts(new Date(ms)).time

export const J: Record<string, string> = {
  '2026-09-16': 'J-1', '2026-09-17': 'J1', '2026-09-18': 'J2', '2026-09-19': 'J3', '2026-09-20': 'J4', '2026-09-21': 'J5',
}
export const DAYS = Object.keys(J)
const WD = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.']
export const ddmm = (date: string) => `${date.slice(8, 10)}/${date.slice(5, 7)}`
export function dayShort(date: string) {
  const d = toDate(date, '12:00')
  return `${WD[d.getUTCDay()]} ${ddmm(date)}`
}
export const dayLabel = (date: string) => `${dayShort(date)}${J[date] ? ' — ' + J[date] : ''}`
export const jOf = (date: string) => J[date] || ''

export function fmtMins(mins: number) {
  const m = Math.abs(mins)
  if (m < 60) return `${m} min`
  const h = Math.floor(m / 60), r = m % 60
  return r ? `${h} h ${String(r).padStart(2, '0')}` : `${h} h`
}
export function fmtIso(iso: string) {
  try { const p = mParts(new Date(iso)); return `${p.ddmm} ${p.time}` } catch { return iso }
}

export function seqWindow(s: Sequence) {
  const start = toDate(s.date, s.start)
  let end: Date
  if (s.end) { end = toDate(s.date, s.end); if (end <= start) end = new Date(end.getTime() + 86400000) }
  else end = new Date(start.getTime() + 45 * 60000)
  return { start, end }
}

export type Badge = 'MAINTENANT' | 'T-15' | 'T-30' | 'T-60' | null
export type SeqStatus = { state: 'past' | 'now' | 'future'; minsTo: number; badge: Badge; pinned: boolean; minsLeft: number }
export function seqStatus(s: Sequence, now: Date, checklistDone: boolean): SeqStatus {
  const { start, end } = seqWindow(s)
  const minsTo = Math.round((start.getTime() - now.getTime()) / 60000)
  const minsLeft = Math.round((end.getTime() - now.getTime()) / 60000)
  if (now >= end || (checklistDone && now >= start)) return { state: 'past', minsTo, badge: null, pinned: false, minsLeft }
  if (now >= start) return { state: 'now', minsTo, badge: 'MAINTENANT', pinned: s.level === 'critique', minsLeft }
  const badge: Badge = minsTo <= 15 ? 'T-15' : minsTo <= 30 ? 'T-30' : s.level === 'critique' && minsTo <= 60 ? 'T-60' : null
  return { state: 'future', minsTo, badge, pinned: s.level === 'critique' && minsTo <= 60, minsLeft }
}
