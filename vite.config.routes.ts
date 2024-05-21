import { join } from 'path'
import { Request, Response } from 'express'

export const routes = {
  '/authenticate': async (_: Request, response: Response) => {
    const route = join(process.env['JOBIJOBA_API_URL'] as string, 'login')
    const login = await fetch(route, {
      method: 'POST',
      body: JSON.stringify({
        'client_id': process.env['JOBIJOBA_API_ID'],
        'client_secret': process.env['JOBIJOBA_API_SECRET'],
      }),
    })

    const { token } = await login.json()

    response.header('Content-Type', 'text/plain')
    response.send(token).end()
  },
  '/jobs': async (request: Request, response: Response) => {
    const { limit, token, what, where } = request.query as Record<string, string>

    const route = join(process.env['JOBIJOBA_API_URL'] as string, 'ads/search')
    const headers = { 'Authorization': `Bearer ${token}` }
    const params = { limit, what, where }

    const jobs = await fetch(`${route}?${new URLSearchParams(params).toString()}`, { method: 'GET', headers })
    const { data } = await jobs.json()

    response.header('Content-Type', 'application/json')
    response.send(data).end()
  },
}
