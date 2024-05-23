import { useRef, useState, useCallback, useEffect, useMemo, ChangeEvent } from 'react'
import { Box, Input, InputAdornment, Pagination, Stack, Typography } from '@mui/material'
import { Search } from '@mui/icons-material'
import { Job, JobEntity } from '../../components/Job/Job'
import './App.css'

const TITLE = 'Recherche sur l\'API Jobijoba'
const RESULTS_PER_PAGE = 10

export const App = () => {
  const [token, setToken] = useState<string>('')
  const [jobs, setJobs] = useState<{ total: number, ads: JobEntity[] }>({ total: 0, ads: [] })
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const debouncer = useRef<NodeJS.Timeout>()

  const login = useCallback(async () => {
    const response = await fetch('/authenticate')
    setToken(response.ok ? await response.text() : '')
  }, [])

  const getJobs = useCallback(async () => {
    if (!token || search.length < 3) return

    if (debouncer.current) clearTimeout(debouncer.current)

    debouncer.current = setTimeout(async () => {
      const params = {
        page: page.toString(),
        limit: '10',
        token,
        what: search,
        where: 'Bordeaux',
      }

      const response = await fetch(`/jobs?${new URLSearchParams(params).toString()}`, { method: 'GET' })
      setJobs(response.ok ? await response.json() : {})
    }, 500)
  }, [token, search, page])

  const pageCount = useMemo(() => Math.ceil(jobs.total / RESULTS_PER_PAGE), [jobs.total])

  useEffect(() => { login() }, [login])
  useEffect(() => { getJobs() }, [getJobs])

  return (
    <Box sx={{ p: 2, display: 'flex' }} justifyContent="flex-start">
      <Stack sx={{ width: '800px' }} direction="column" spacing={2}>
        <Typography gutterBottom variant="h4" component="div">{TITLE}</Typography>
        <Input startAdornment={<InputAdornment position="start"><Search /></InputAdornment>} onChange={({ target }) => setSearch(target.value)} />
        {
        jobs.total > 0 && <Pagination count={pageCount} onChange={(_: ChangeEvent<unknown>, other: number) => setPage(other)} />
      }
        {
        jobs.ads.map((job) => <Job job={job} key={job.id} />)
      }
      </Stack>
    </Box>
  )
}
