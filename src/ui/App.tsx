import { useState, useEffect } from 'react'
import { MyopComponent } from "@myop/react";
import { COMPONENTS_IDS } from '../utils/componentsIds';
import { NavLink, Route, Routes } from 'react-router-dom';
import {Analytics} from "./Analytics.tsx";
import {HomePage} from "./HomePage.tsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleSignIn = () => {
    setIsAuthenticated(true)
  }

  // Listen for postMessage from iframe components (for local development)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'myop_cta') {
        const { action } = event.data
        console.log('CTA received via postMessage:', action, event.data.payload)
        if (action === 'google_signin' || action === 'email_signin' ||
            action === 'google_signup' || action === 'email_signup') {
          handleSignIn()
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  if (/*!isAuthenticated*/ false) {

    return (
      <div style={{ height: '100vh' }}>
        <MyopComponent
          componentId={COMPONENTS_IDS.signup}
          on={(actionId: string, payload: unknown) => {
            console.log('CTA received:', actionId, payload)
            if (actionId === 'google_signin' || actionId === 'email_signin' ||
                actionId === 'google_signup' || actionId === 'email_signup') {
                debugger;
              handleSignIn()
            }
          }}
        />
      </div>
    )
  }

  return (<div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
          <aside style={{ width: '280px', height: '100%' }}>
              <MyopComponent componentId={COMPONENTS_IDS.sidebar} />
          </aside>
          <main style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/analytics" element={<Analytics />} />
              </Routes>
          </main>
      </div>
  )
}

export default App
