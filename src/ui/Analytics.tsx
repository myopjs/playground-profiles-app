import {MyopComponent} from "@myop/react";
import {getComponentId, QUERY_PARAMS} from "../utils/queryParams.ts";
import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {generateAnalyticsData} from "../data/analyticsData.ts";
import type {TeamMember} from "../data/teamMembers.ts";

interface AnalyticsProps {
    members: TeamMember[];
    isMobileView: boolean;
}

export const Analytics = ({members, isMobileView}: AnalyticsProps) => {
    const navigate = useNavigate();

    const analyticsData = useMemo(() => generateAnalyticsData(members), [members]);

    const handleCta = (action: string): void => {
        if (action === 'back_clicked') {
            navigate({ pathname: '/', search: window.location.search });
        }
    };

    return (
        <div className="analytics-container">
            <MyopComponent
                componentId={getComponentId(QUERY_PARAMS.analytics)}
                data={{ ...analyticsData, isMobileView }}
                on={handleCta}
            />
        </div>
    );
};
