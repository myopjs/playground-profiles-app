import {useState, useCallback} from "react";
import { ProfilePopover as ProfilePopoverComponent } from "@myop/ProfilePopover";
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

    const handleCta = (action: string): void => {
        if (action === 'logout_clicked') {
            onLogout();
        }
        if (action === 'click_outside' || action === 'escape_pressed' || action === 'drag_closed') {
            onClose();
        }
    };

    return <>
        <div className="profile-popover-container">
            <ProfilePopoverComponent
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
