import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function LoginBox() {
  const { login, register } = useAuth()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errText, setErrText] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setErrText('')
    try {
      if (mode === 'login') {
        await login(email, password)
      } else {
        await register(email, password)
      }
    } catch (err) {
      setErrText(err.message)
      if (!err.message) alert('network error maybe?')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
      <h1 className="text-xl font-semibold text-slate-800 mb-1">Personal Dashboard</h1>
      <p className="text-sm text-slate-500 mb-5">log in to see your tasks</p>
      <p className="text-xs text-slate-400 mb-4">
        Full stack with one command: from project root <code className="bg-slate-100 px-1">npm start</code> (Docker + DB
        wait + server + client). For API+web only: <code className="bg-slate-100 px-1">npm run dev</code>
      </p>

      {errText ? <p className="text-sm text-red-600 mb-3">{errText}</p> : null}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs text-slate-600 mb-1">Email</label>
          <input
            className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </div>
        <div>
          <label className="block text-xs text-slate-600 mb-1">Password</label>
          <input
            className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-slate-800 text-white text-sm py-2 rounded hover:bg-slate-700"
        >
          {mode === 'login' ? 'Login' : 'Create account'}
        </button>
      </form>

      <button
        type="button"
        className="mt-4 text-xs text-blue-700 underline"
        onClick={() => {
          setMode(mode === 'login' ? 'register' : 'login')
          setErrText('')
        }}
      >
        {mode === 'login' ? 'No account? Register' : 'Have account? Login'}
      </button>
    </div>
  )
}
