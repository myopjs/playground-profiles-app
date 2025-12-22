import {MyopComponent} from "@myop/react";
import {getComponentId, QUERY_PARAMS} from "../utils/queryParams.ts";
import {useNavigate} from "react-router-dom";
import {analyticsData} from "../data/analyticsData.ts";

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
                componentId={getComponentId(QUERY_PARAMS.analytics)}
                data={analyticsData}
                on={handleCta as any}
            />
        </div>
    );
};