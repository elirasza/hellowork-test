import express from 'express'
import react from '@vitejs/plugin-react'
import { defineConfig, ViteDevServer } from 'vite'
import { config } from 'dotenv'
import { routes } from './vite.config.routes'

config()

const router = () => ({
  name: 'router',
  configureServer: (server: ViteDevServer) => Object.entries(routes).forEach(([route, callback]) => {
    server.middlewares.use(express().get(route, (request, response) => callback(request, response)))
  }),
})

export default defineConfig({
  plugins: [react(), router()],
  server: {
    headers: {
      'Content-Security-Policy': 'connect-src \'self\' https://api.jobijoba.com;',
    },
  },
})
