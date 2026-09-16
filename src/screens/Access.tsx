import { useEffect, useState } from 'react'
import { CODE_HASH, grantAccess, hasAccess, lockUntil, registerFail, sha256 } from '../lib/auth'
import { team } from '../lib/data'
import { useApp } from '../context'


export default function Access({ onDone }: { onDone: () => void }) {
  const { user, setUser } = useApp()
  const [ok, setOk] = useState(hasAccess())
  const [code, setCode] = useState('')
  const [err, setErr] = useState('')
  const [lock, setLock] = useState(Math.max(0, lockUntil() - Date.now()))
  useEffect(() => { if (lock <= 0) return; const t = setInterval(() => setLock(Math.max(0, lockUntil() - Date.now())), 500); return () => clearInterval(t) }, [lock])

  async function submit() {
    if (code.length !== 6) { setErr('6 chiffres attendus'); return }
    try {
      const h = await sha256(code)
      if (h === CODE_HASH) { grantAccess(); setOk(true); setErr('') }
      else { const r = registerFail(); setCode(''); if (r.locked) { setLock(30_000); setErr('3 échecs — attente 30 s') } else setErr(`Code incorrect (${r.n}/3)`) }
    } catch (e) { setErr((e as Error).message) }
  }

  if (ok && user) { onDone(); return null }
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center p-6 text-center safe-top">
      <div className="text-6xl font-bold mb-2"><span className="text-lavender">3</span>0</div>
      <h1 className="text-2xl font-bold mb-1">Sightline Ops</h1>
      <p className="text-warm text-sm mb-6">Sightline Productions · Marrakech & Agafay · 17 → 21 septembre 2026<br />Outil terrain MRCO — usage interne</p>
      {!ok ? (
        <form className="w-full max-w-xs space-y-3" onSubmit={e => { e.preventDefault(); void submit() }}>
          <input className="input text-center text-2xl tracking-[0.5em] font-bold" inputMode="numeric" pattern="[0-9]*" maxLength={6} autoFocus placeholder="••••••" value={code}
            onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))} disabled={lock > 0} aria-label="Code d'accès" />
          <button className="btn btn-primary w-full" disabled={lock > 0 || code.length !== 6}>{lock > 0 ? `Attente ${Math.ceil(lock / 1000)} s` : 'Entrer'}</button>
          {err && <div className="text-alert-red text-sm">{err}</div>}
        </form>
      ) : (
        <div className="w-full max-w-xs space-y-3">
          <p className="text-sm">Je suis :</p>
          {team.membres.map(m => (
            <button key={m} type="button" className="btn w-full text-lg" onClick={() => { setUser(m); onDone() }}>{m}</button>
          ))}
        </div>
      )}
    </div>
  )
}
