import { InjectionToken } from '@angular/core';
import { IManagerConfig } from './imanager.config';

export const MANAGER_CONFIG = new InjectionToken('manager.config');
export const ManagerConfig: IManagerConfig = {

    /*local*/
    endPoints : {
        server: 'http://localhost:8080/',
        manager: 'http://localhost:4200/',
        parent: 'http://localhost:4200/'
    }
    /*****/

    /*server*/
        
    /****/

};
