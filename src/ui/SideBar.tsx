import {MyopComponent} from "@myop/react";
import {COMPONENTS_IDS} from "../utils/componentsIds.ts";
import {type UserData} from "../data/mockUsers.ts";
import {ProfilePopover} from "./ProfilePopover.tsx";
import {useState} from "react";

type SideBarProps = {
    userData: UserData;
    onLogout: () => void;
    onNavigate: (navId: string) => void;
}

export const SideBar = ({ userData, onLogout, onNavigate }: SideBarProps) => {
    const [showPopover, setShowPopover] = useState(false);

    const sidebarUserData = {
        name: userData.name,
        role: 'Settings',
        initials: userData.initials,
        profileImage: userData.profileImage
    };

    const handleCta = (actionId: string, payload: any) => {
        if (actionId === 'profile_clicked') {
            setShowPopover(true);
        }
        if (actionId === 'nav_clicked' && payload?.navId) {
            onNavigate(payload.navId);
        }
    };

    return <>
        <MyopComponent
            componentId={COMPONENTS_IDS.sidebar}
            data={{ userData: sidebarUserData }}
            on={handleCta as any}
        />
        {showPopover && (
            <div style={{
                position: 'absolute',
                bottom: '70px',
                left: '16px',
                zIndex: 1000
            }}>
                <ProfilePopover
                    userData={userData}
                    onClose={() => setShowPopover(false)}
                    onLogout={onLogout}
                />
            </div>
        )}
    </>
}