import {MyopComponent} from "@myop/react";
import {COMPONENTS_IDS} from "../utils/componentsIds.ts";
import {type UserData} from "../data/mockUsers.ts";

type ProfilePopoverProps = {
    userData: UserData;
    onClose: () => void;
    onLogout: () => void;
}

export const ProfilePopover = ({ userData, onClose, onLogout }: ProfilePopoverProps) => {

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
    };

    return <div style={{ width: '300px', height: '350px' }}>
        <MyopComponent
            componentId={COMPONENTS_IDS.profilePopover}
            data={{ userData }}
            on={handleCta as any}
        />
    </div>
}