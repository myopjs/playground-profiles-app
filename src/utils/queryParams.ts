import {COMPONENTS_IDS} from "./componentsIds.ts";

export const QUERY_PARAMS = {
    signup: 'signup',
    table: 'table',
    headerInsights: 'headerInsights',
    sidebar: 'sidebar',
    cardsView: 'cardsView',
    profilePopover: 'profilePopover',
    tableHeader: 'tableHeader',
    editProfile: 'editProfile',
    analytics: 'analytics',
    addProfile: 'addProfile',
    treeView: 'treeView',
} as const;

type ComponentKey = keyof typeof QUERY_PARAMS;

export function getComponentId(key: ComponentKey): string {
    const params = new URLSearchParams(window.location.search);
    const overrideId = params.get(QUERY_PARAMS[key]);
    return overrideId || COMPONENTS_IDS[key];
}
