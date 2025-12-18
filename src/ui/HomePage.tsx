import {MyopComponent} from "@myop/react";
import {COMPONENTS_IDS} from "../utils/componentsIds.ts";


export const HomePage = () => {

    return  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header Insights */}
        <div style={{ height: '35vh', paddingRight: '24px', paddingLeft: '24px' }}>
            <MyopComponent componentId={COMPONENTS_IDS.headerInsights} />
        </div>

        {/* Table */}
        <div style={{ flex: 1, overflow: 'auto', padding: '0 24px 24px' }}>
            <MyopComponent componentId={COMPONENTS_IDS.table} />
        </div>
    </div>
}