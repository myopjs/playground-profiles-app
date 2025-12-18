import { useState, useEffect } from 'react'
import { MyopComponent } from "@myop/react";
import { COMPONENTS_IDS } from '../utils/componentsIds';

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

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '280px', height: '100%' }}>
        <MyopComponent componentId={COMPONENTS_IDS.sidebar} />
      </div>

      {/* Main content area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header Insights */}
        <div style={{ height: '35vh', paddingRight: '24px', paddingLeft: '24px' }}>
          <MyopComponent componentId={COMPONENTS_IDS.headerInsights} />
        </div>

        {/* Table */}
        <div style={{ flex: 1, overflow: 'auto', padding: '0 24px 24px' }}>
          <MyopComponent componentId={COMPONENTS_IDS.table} />
        </div>
      </div>
    </div>
  )
}

export default App
