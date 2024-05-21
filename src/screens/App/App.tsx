import { useCallback, useEffect, useState } from 'react'
import './App.css'

export const App = () => {
  const [token, setToken] = useState('')

  const login = useCallback(async () => {
    const response = await fetch('/authenticate')
    setToken(response.ok ? await response.text() : '')
  }, [])

  const getJobs = useCallback(async () => {
    if (!token) return

    const params = {
      token,
      what: 'Infirmier',
      where: 'Paris',
      limit: '1',
    }

    const response = await fetch(`/jobs?${new URLSearchParams(params).toString()}`, { method: 'GET' })
    console.log(response)
  }, [token])

  useEffect(() => { login() }, [login])
  useEffect(() => { getJobs() }, [getJobs])

  return (
    <div>
      BONJOUR
    </div>
  )
}
