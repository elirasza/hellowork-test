import { join } from 'path'
import { config } from 'dotenv'
import { defineConfig, ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import express from 'express'

config()

const authenticator = () => ({
  name: 'authenticator',
  configureServer: (server: ViteDevServer) => {
    server.middlewares.use(express().get('/authenticate', async (_, response) => {
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
    }))
  },
})

export default defineConfig({
  plugins: [react(), authenticator()],
})
