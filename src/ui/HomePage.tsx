import {MyopComponent} from "@myop/react";
import {COMPONENTS_IDS} from "../utils/componentsIds.ts";
import {useState} from "react";

export const HomePage = () => {

    const [view, setView] = useState('table')


    const handleCta = (action: string, payload: any) => {
        if (action === 'view-changed' && payload) {
            setView(payload.view);
        }
    };

    return  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header Insights */}
        <div style={{ height: '35vh', paddingRight: '24px', paddingLeft: '24px' }}>
            <MyopComponent componentId={COMPONENTS_IDS.headerInsights} />
        </div>

        {/* Content Header */}
        <div style={{  padding: '0 24px 24px' }} >
            <MyopComponent
                componentId={COMPONENTS_IDS.tableHeader}
                on={handleCta as any}
            />

        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: '0 24px 24px' }}>
            { view === 'table' ?
                <MyopComponent componentId={COMPONENTS_IDS.table} />:
                <MyopComponent componentId={COMPONENTS_IDS.cardsView} />
            }
        </div>
    </div>
}