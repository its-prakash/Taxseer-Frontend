import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: "", pathMatch: "full", redirectTo: "dashboard"},
    {path: "dashboard", loadComponent: () => import('./views/pages/dashboard/dashboard.component').then(m => m.DashboardComponent)},
    {path: "new-filing", loadComponent: () => import("./views/pages/new-filing/new-filing.component").then(m => m.NewFilingComponent)},
    {path:"orders", loadComponent: () => import("./views/pages/orders/orders/orders.component"). then( m => m.OrdersComponent)},
    {path:"filers", loadComponent: () =>import("./views/pages/taxseer-filing-filer/filers//filers.component").then(m => m.FilersComponent)},
    {path:"recipient_and_w9", loadComponent: () => import("./views/pages/recipient_and_w9/w9-managment/w9-managment.component").then(m => m.W9ManagmentComponent)}
];
