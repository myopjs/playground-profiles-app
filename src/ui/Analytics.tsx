import { Analytics as AnalyticsComponent } from "@myop/Analytics";
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
            navigate('/');
        }
    };

    return (
        <div className="analytics-container">
            <AnalyticsComponent
                data={{ ...analyticsData, isMobileView }}
                on={handleCta}
            />
        </div>
    );
};
