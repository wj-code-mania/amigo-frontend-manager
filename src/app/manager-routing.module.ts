import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthguardService } from './service/authguard';
import { CommonComponent } from './common/common.component';

const ManagerRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },{
        path: '',
        component: CommonComponent,
        canActivate: [AuthguardService],
        children: [
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },{
                path: 'order/history',
                loadChildren: './order-history/order-history.module#OrderHistoryModule'
            },{
                path: 'order/calendar',
                loadChildren: './order-calendar/order-calendar.module#OrderCalendarModule'
            },{
                path: 'parent',
                loadChildren: './parent/parent.module#ParentModule'
            },{
                path: 'canteen',
                loadChildren: './canteen/canteen.module#CanteenModule'
            },{
                path: 'emailers',
                loadChildren: './emailers/emailers.module#EmailersModule'
            },{
                path: 'reports',
                loadChildren: './reports/reports.module#ReportsModule'
            },{
                path: 'settings',
                loadChildren: './settings/settings.module#SettingsModule'
            },{
                path: 'auth/stripe',
                loadChildren: './stripe/stripe.module#StripeModule'
            },{
                path: 'security',
                loadChildren: './security/security.module#SecurityModule'
            },{
                path: 'callback',
                loadChildren: './callback/callback.module#CallbackModule'
            },{
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(ManagerRoutes)],
    exports: [RouterModule]
})

export class ManagerRoutingModule { }