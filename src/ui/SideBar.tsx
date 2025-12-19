import {MyopComponent} from "@myop/react";
import {COMPONENTS_IDS} from "../utils/componentsIds.ts";


export const SideBar = () => {

    return  <MyopComponent componentId={COMPONENTS_IDS.sidebar} on={(actionId: string, payload: unknown) => {
        console.log('CTA received:', actionId, payload)
        if (actionId === '') {


        }
    }}/>
}