//
// ===== File globals.ts    
//

'use strict';
export const sep='/';
export class GlobalVariables {
    constructor () {}
    static isToBeShown =false;
    showSideNav()
    {
        GlobalVariables.isToBeShown = true;
    }
    hideSideNav()
    {
        GlobalVariables.isToBeShown = true;
    }
}
//It seems like when I update this variable it does not get updated on the other files.
//
export const version: string="22.2.2";    