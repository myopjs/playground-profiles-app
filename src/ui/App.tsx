import { useState, useEffect } from 'react'
import {MyopComponent, preloadComponents} from "@myop/react";
import { COMPONENTS_IDS } from '../utils/componentsIds';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import {Analytics} from "./Analytics.tsx";
import {HomePage} from "./HomePage.tsx";
import {SideBar} from "./SideBar.tsx";
import {getRandomUser, type UserData} from "../data/mockUsers.ts";

const SESSION_STORAGE_KEY = 'currentUser';

function App() {
  const [currentUser, setCurrentUser] = useState<UserData | null>(() => {
    const savedUser = sessionStorage.getItem(SESSION_STORAGE_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [donePreload, setDonePreload] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const activeNavItem = location.pathname === '/analytics' ? 'analytics' : 'home';

    const handleSignIn = () => {
      const user = getRandomUser();
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
      setCurrentUser(user);
    };

    const handleLogout = () => {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      setCurrentUser(null);
    };

    const handleNavigate = (navId: string) => {
        if (navId === 'home') {
            navigate('/');
        } else if (navId === 'analytics') {
            navigate('/analytics');
        }
    };

    useEffect(() => {
        preloadComponents(Object.values(COMPONENTS_IDS), 'production').then(() => setDonePreload(true));
    }, [])


    if(!donePreload) {
        return (<div/>)
    }

  if (!currentUser) {

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
          <aside style={{ width: '280px', height: '100%', position: 'relative' }}>
             <SideBar userData={currentUser} activeNavItem={activeNavItem} onLogout={handleLogout} onNavigate={handleNavigate} />
          </aside>
          <main style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
              <Routes>
                  <Route path="/" element={<HomePage userData={currentUser} />} />
                  <Route path="/analytics" element={<Analytics />} />
              </Routes>
          </main>
      </div>
  )
}

export default App
