import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function TaskArea() {
  const { email, logout, api } = useAuth()
  const [myTasks, setMyTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [loadError, setLoadError] = useState('')
  const [busy, setBusy] = useState(true)

  async function load() {
    setLoadError('')
    setBusy(true)
    try {
      const list = await api('/api/tasks')
      setMyTasks(list)
    } catch (e) {
      setLoadError(e.message)
    } finally {
      setBusy(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function addTask(e) {
    e.preventDefault()
    const label = newTask.trim()
    if (!label) {
      alert('type something first')
      return
    }
    try {
      const t = await api('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({ label })
      })
      setMyTasks((prev) => [t, ...prev])
      setNewTask('')
    } catch (err) {
      alert(err.message)
    }
  }

  async function removeTask(id) {
    if (!window.confirm('delete this task?')) return
    try {
      await api('/api/tasks/' + id, { method: 'DELETE' })
      setMyTasks((prev) => prev.filter((x) => x._id !== id))
    } catch (err) {
      alert(err.message)
    }
  }

  async function flipDone(t) {
    try {
      const updated = await api('/api/tasks/' + t._id + '/toggle', { method: 'PATCH' })
      setMyTasks((prev) => prev.map((x) => (x._id === updated._id ? updated : x)))
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10 px-4">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Personal Dashboard</h1>
          <p className="text-sm text-slate-500">{email}</p>
        </div>
        <button
          onClick={logout}
          className="text-xs border border-slate-300 px-2 py-1 rounded bg-white hover:bg-slate-50"
        >
          log out
        </button>
      </header>

      {loadError ? <p className="text-sm text-red-600 mb-3">{loadError}</p> : null}

      <form onSubmit={addTask} className="flex gap-2 mb-5">
        <input
          className="flex-1 border border-slate-300 rounded px-2 py-2 text-sm"
          placeholder="new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" className="bg-emerald-700 text-white text-sm px-3 rounded">
          Add
        </button>
      </form>

      {busy ? <p className="text-sm text-slate-500">loading...</p> : null}

      <ul className="space-y-2">
        {myTasks.map((t) => (
          <li
            key={t._id}
            className="flex items-center gap-3 bg-white border border-slate-200 rounded px-3 py-2"
          >
            <input type="checkbox" checked={t.done} onChange={() => flipDone(t)} />
            <span className={`flex-1 text-sm ${t.done ? 'line-through text-slate-400' : 'text-slate-800'}`}>
              {t.label}
            </span>
            <button
              type="button"
              onClick={() => removeTask(t._id)}
              className="text-xs text-red-600 hover:underline"
            >
              delete
            </button>
          </li>
        ))}
      </ul>

      {!busy && myTasks.length === 0 ? (
        <p className="text-sm text-slate-500 mt-4">no tasks yet — add one above</p>
      ) : null}
    </div>
  )
}
