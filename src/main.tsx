import { createRoot } from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material'

import { App } from './screens/App/App'
import './index.css'

const theme = createTheme({ palette: { mode: 'dark' } })

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
)
