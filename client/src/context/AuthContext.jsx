import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)
const STORAGE_KEY = 'todo_jwt'
const EMAIL_KEY = 'todo_email'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY))
  const [email, setEmail] = useState(() => localStorage.getItem(EMAIL_KEY))

  useEffect(() => {
    if (token) {
      localStorage.setItem(STORAGE_KEY, token)
    } else {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(EMAIL_KEY)
    }
  }, [token])

  function logout() {
    setToken(null)
    setEmail(null)
  }

  async function api(path, options = {}) {
    const headers = { 'Content-Type': 'application/json', ...options.headers }
    if (token) {
      headers['Authorization'] = 'Bearer ' + token
    }
    let res
    try {
      res = await fetch(path, { ...options, headers })
    } catch {
      throw new Error(
        'Cannot connect to backend - please start server first: go to server folder and run `npm start` (port 5000)'
      )
    }
    const raw = await res.text()
    let data = {}
    try {
      data = raw ? JSON.parse(raw) : {}
    } catch {
      data = {}
    }
    if (!res.ok) {
      const proxyProbably =
        (res.status === 500 || res.status === 502 || res.status === 503 || res.status === 504) &&
        !data.message
      const fallback = proxyProbably
        ? 'API not running on port 5000 - start with `npm start` from project root or `npm run dev` for server+client'
        : 'Something went wrong'
      const err = new Error(data.message || fallback)
      err.status = res.status
      throw err
    }
    return data
  }

  async function login(emailVal, password) {
    const data = await api('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email: emailVal, password })
    })
    setToken(data.token)
    setEmail(data.email)
    localStorage.setItem(EMAIL_KEY, data.email)
    return data
  }

  async function register(emailVal, password) {
    const data = await api('/api/users/register', {
      method: 'POST',
      body: JSON.stringify({ email: emailVal, password })
    })
    setToken(data.token)
    setEmail(data.email)
    localStorage.setItem(EMAIL_KEY, data.email)
    return data
  }

  const value = { token, email, login, register, logout, api }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth needs provider')
  return ctx
}
