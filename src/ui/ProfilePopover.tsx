import {useState, useEffect} from "react";
import {MyopComponent} from "@myop/react";
import {COMPONENTS_IDS} from "../utils/componentsIds.ts";
import {type UserData} from "../data/mockUsers.ts";

type ProfilePopoverProps = {
    userData: UserData;
    onClose: () => void;
    onLogout: () => void;
}

export const ProfilePopover = ({ userData, onClose, onLogout }: ProfilePopoverProps) => {
    const [toastOpen, setToastOpen] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);

    useEffect(() => {
        if (toastOpen) {
            requestAnimationFrame(() => setToastVisible(true));
            const timer = setTimeout(() => {
                setToastVisible(false);
                setTimeout(() => setToastOpen(false), 300);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toastOpen]);

    const handleCta = (actionId: string, payload?: { componentId?: string }) => {
        if (actionId === 'logout_clicked') {
            onLogout();
        }
        if (actionId === 'click_outside' || actionId === 'escape_pressed') {
            onClose();
        }
        if (actionId === 'open_clicked' && payload?.componentId) {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('cardsComponent', payload.componentId);
            window.open(currentUrl.toString(), '_blank');
        }
        if (actionId === 'settings_clicked') {
            setToastOpen(true);
        }
    };

    return <>
        <div style={{ width: '300px', height: '350px' }}>
            <MyopComponent
                componentId={COMPONENTS_IDS.profilePopover}
                data={{ userData }}
                on={handleCta as any}
            />
        </div>
        {toastOpen && (
            <div
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    transform: toastVisible ? 'translateX(0)' : 'translateX(calc(100% + 24px))',
                    backgroundColor: '#50FFEE',
                    color: '#000',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    zIndex: 2000,
                    fontSize: '14px',
                    transition: 'transform 300ms ease-out',
                }}
            >
                ✓ Settings feature coming soon!
            </div>
        )}
    </>
}