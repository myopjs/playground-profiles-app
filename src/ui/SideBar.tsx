import { Sidebar } from "@myop/Sidebar";
import {type UserData} from "../data/mockUsers.ts";
import {ProfilePopover} from "./ProfilePopover.tsx";
import {useState, useEffect} from "react";
import {createPortal} from "react-dom";

type SideBarProps = {
    userData: UserData;
    activeNavItem: string;
    onLogout: () => void;
    onNavigate: (navId: string) => void;
    isMobileView: boolean;
    onSidebarToggle?: (expanded: boolean) => void;
}

export const SideBar = ({ userData, activeNavItem, onLogout, onNavigate, isMobileView, onSidebarToggle }: SideBarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => setIsVisible(true));
        }
    }, [isOpen]);

    const closePopover = () => {
        setIsVisible(false);
        setTimeout(() => setIsOpen(false), 200);
    };

    const sidebarUserData = {
        name: userData.name,
        role: 'Settings',
        initials: userData.initials,
        profileImage: userData.profileImage
    };

    const handleCta = (action: string, payload: any): void => {
        console.log('SideBar CTA:', action, payload);
        if (action === 'profile_clicked') {
            setIsOpen(true);
        }
        if (action === 'nav_clicked' && payload?.navId) {
            onNavigate(payload.navId);
        }
        if (action === 'sidebar_toggled' && onSidebarToggle) {
            onSidebarToggle(payload?.expanded ?? false);
        }
    };

    const popoverContent = isOpen && (
        <>
            <div
                className={`sidebar-overlay${isVisible ? ' visible' : ''}`}
                onClick={closePopover}
            />
            <div className={`sidebar-popover${isVisible ? ' visible' : ''}${isMobileView ? ' mobile' : ''}`}>
                <ProfilePopover
                    userData={userData}
                    onClose={closePopover}
                    onLogout={onLogout}
                    isMobileView={isMobileView}
                />
            </div>
        </>
    );

    return <>
        <Sidebar
            data={{ userData: sidebarUserData, activeNavItem, isMobileView }}
            on={handleCta}
        />
        {isMobileView
            ? popoverContent && createPortal(popoverContent, document.body)
            : popoverContent
        }
    </>
}
