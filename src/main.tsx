
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create root with the new React 19 pattern that doesn't require StrictMode
const root = createRoot(document.getElementById('root')!)
root.render(<App />)
