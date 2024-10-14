/* eslint-disable @typescript-eslint/no-non-null-assertion */
// import './index.css'
import './css/style.css'
import './css/satoshi.css'
import './css/simple-datatables.css'
import 'flatpickr/dist/flatpickr.min.css'

// import './css/simple-datatables.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
