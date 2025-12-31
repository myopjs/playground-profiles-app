import {useState, useCallback} from "react";
import {MyopComponent} from "@myop/react";
import {getComponentId, QUERY_PARAMS} from "../utils/queryParams.ts";
import {type UserData} from "../data/mockUsers.ts";
import {Toast} from "./Toast.tsx";

type ProfilePopoverProps = {
    userData: UserData;
    onClose: () => void;
    onLogout: () => void;
    isMobileView: boolean;
}

export const ProfilePopover = ({ userData, onClose, onLogout, isMobileView }: ProfilePopoverProps) => {
    const [toastOpen, setToastOpen] = useState(false);

    const closeToast = useCallback(() => setToastOpen(false), []);

    const handleCta = (action: string, payload?: { componentId?: string; selectedComponent?: string }): void => {
        if (action === 'logout_clicked') {
            onLogout();
        }
        if (action === 'click_outside' || action === 'escape_pressed' || action === 'drag_closed') {
            onClose();
        }
        if (action === 'open_clicked' && payload?.componentId && payload?.selectedComponent) {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set(payload.selectedComponent, payload.componentId);
            window.open(currentUrl.toString(), '_blank');
        }
    };

    return <>
        <div className="profile-popover-container">
            <MyopComponent
                componentId={getComponentId(QUERY_PARAMS.profilePopover)}
                data={{ userData, isMobileView }}
                on={handleCta}
            />
        </div>
        <Toast
            message="Settings feature coming soon!"
            isOpen={toastOpen}
            onClose={closeToast}
        />
    </>
}
