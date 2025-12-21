import {MyopComponent} from "@myop/react";
import {COMPONENTS_IDS} from "../utils/componentsIds.ts";
import {useNavigate} from "react-router-dom";

export const Analytics = () => {
    const navigate = useNavigate();

    const handleCta = (actionId: string) => {
        if (actionId === 'back_clicked') {
            navigate('/');
        }
    };

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
            <MyopComponent
                componentId={COMPONENTS_IDS.analytics}
                on={handleCta as any}
            />
        </div>
    );
};