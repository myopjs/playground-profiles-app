import {MyopComponent} from "@myop/react";
import {COMPONENTS_IDS} from "../utils/componentsIds.ts";
import {type UserData} from "../data/mockUsers.ts";

type ProfilePopoverProps = {
    userData: UserData;
    onClose: () => void;
    onLogout: () => void;
}

export const ProfilePopover = ({ userData, onClose, onLogout }: ProfilePopoverProps) => {

    const handleCta = (actionId: string) => {
        if (actionId === 'logout_clicked') {
            onLogout();
        }
        if (actionId === 'click_outside' || actionId === 'escape_pressed') {
            onClose();
        }
    };

    return <MyopComponent
        componentId={COMPONENTS_IDS.profilePopover}
        data={{ userData }}
        on={handleCta as any}
    />
}