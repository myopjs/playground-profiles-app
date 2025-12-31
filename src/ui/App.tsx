import { useState, useEffect, useCallback } from 'react'
import {MyopComponent, preloadComponents} from "@myop/react";
import { COMPONENTS_IDS } from '../utils/componentsIds';
import { getComponentId, QUERY_PARAMS } from '../utils/queryParams';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import {Analytics} from "./Analytics.tsx";
import {HomePage} from "./HomePage.tsx";
import {AddMember} from "./AddMember.tsx";
import {SideBar} from "./SideBar.tsx";
import {getRandomUser, type UserData} from "../data/mockUsers.ts";
import {teamMembersData, type TeamMember} from "../data/teamMembers.ts";

const LOCAL_STORAGE_KEY = 'currentUser';
const MOBILE_BREAKPOINT = 700;

function App() {
  const [currentUser, setCurrentUser] = useState<UserData | null>(() => {
    const savedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [donePreload, setDonePreload] = useState(false);
  const [members, setMembers] = useState<TeamMember[]>(teamMembersData);
  const [isMobileView, setIsMobileView] = useState<boolean>(window.innerWidth <= MOBILE_BREAKPOINT);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const activeNavItem = location.pathname === '/analytics' ? 'analytics' : 'home';

  const handleAddMember = useCallback((newMember: TeamMember) => {
    setMembers(prev => [...prev, newMember]);
  }, []);

  const handleUpdateMember = useCallback((updatedMember: Partial<TeamMember> & { id: string }) => {
    setMembers(prev => prev.map(member =>
      String(member.id) === String(updatedMember.id)
        ? { ...member, ...updatedMember }
        : member
    ));
  }, []);

  const handleDeleteMember = useCallback((memberId: string) => {
    setMembers(prev => prev.filter(member => String(member.id) !== String(memberId)));
  }, []);

    const handleSignIn = () => {
      const user = getRandomUser();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
      setCurrentUser(user);
    };

    const handleLogout = () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setCurrentUser(null);
    };

    const handleNavigate = (navId: string) => {
        const search = window.location.search;
        if (navId === 'home') {
            navigate({ pathname: '/', search });
        } else if (navId === 'analytics') {
            navigate({ pathname: '/analytics', search });
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        // Separate IDs into default (from COMPONENTS_IDS) and override (from URL params)
        const defaultIds: string[] = [];
        const overrideIds: string[] = [];

        Object.entries(QUERY_PARAMS).forEach(([key, paramName]) => {
            const overrideId = params.get(paramName);
            if (overrideId) {
                overrideIds.push(overrideId);
            } else {
                const defaultId = COMPONENTS_IDS[key as keyof typeof COMPONENTS_IDS];
                if (defaultId) {
                    defaultIds.push(defaultId);
                }
            }
        });

        // Preload default IDs without preview, override IDs with preview=true
        Promise.all([
            defaultIds.length > 0 ? preloadComponents(defaultIds, 'production') : Promise.resolve(),
            overrideIds.length > 0 ? preloadComponents(overrideIds, 'production', true) : Promise.resolve()
        ]).then(() => setDonePreload(true));
    }, [])

    useEffect(() => {
        const handleResize = () => {
            const newIsMobile = window.innerWidth <= MOBILE_BREAKPOINT;
            if (newIsMobile !== isMobileView) {
                setIsMobileView(newIsMobile);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileView]);


    if(!donePreload) {
        return (<div/>)
    }

  if (!currentUser) {

    return (<div className="app-signup-container">
        <MyopComponent
          componentId={getComponentId(QUERY_PARAMS.signup)}
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

  return (<div className={`app-layout${isMobileView ? ' mobile' : ''}`}>
          <aside className={`app-sidebar${isSidebarExpanded ? ' expanded' : ''}`}>
             <SideBar userData={currentUser} activeNavItem={activeNavItem} onLogout={handleLogout} onNavigate={handleNavigate} isMobileView={isMobileView} onSidebarToggle={setIsSidebarExpanded} />
          </aside>
          <main className="app-main">
              <Routes>
                  <Route path="/" element={<HomePage userData={currentUser} members={members} onUpdateMember={handleUpdateMember} onDeleteMember={handleDeleteMember} isMobileView={isMobileView} />} />
                  <Route path="/analytics" element={<Analytics members={members} isMobileView={isMobileView} />} />
                  <Route path="/add-member" element={<AddMember members={members} onAddMember={handleAddMember} isMobileView={isMobileView} />} />
              </Routes>
          </main>
      </div>
  )
}

export default App
