import { useState } from 'react'
import { MyopComponent } from "@myop/react";
import { COMPONENTS_IDS } from '../utils/componentsIds';
import { Route, Routes } from 'react-router-dom';
import {Analytics} from "./Analytics.tsx";
import {HomePage} from "./HomePage.tsx";
import {SideBar} from "./SideBar.tsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleSignIn = () => setIsAuthenticated(true);

  if (!isAuthenticated) {

    return (<div style={{ height: '100vh', width: '100vw' }}>
        <MyopComponent
          componentId={COMPONENTS_IDS.signup}
          on={(actionId: string) => {
            if (actionId === 'google_signin' || actionId === 'email_signin' ||
                actionId === 'google_signup' || actionId === 'email_signup') {
              handleSignIn()
            }
          }}
        />
      </div>
    )
  }

  return (<div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
          <aside style={{ width: '280px', height: '100%' }}>
             <SideBar/>
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
