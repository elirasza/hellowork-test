import { useCallback, useEffect, useState } from 'react'
import './App.css'

export const App = () => {
  const [token, setToken] = useState('')

  const login = useCallback(async () => {
    const response = await fetch('/authenticate')
    setToken(response.ok ? await response.text() : '')
  }, [])

  const fetchGetJobs = useCallback(() => {

  }, [])

  useEffect(() => { login() }, [login])

  return (
    <div>
      BONJOUR
    </div>
  )
}
