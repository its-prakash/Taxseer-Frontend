import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: "", pathMatch: "full", redirectTo: "dashboard"},
    {path: "dashboard", loadComponent: () => import("./views/pages/dashboard/dashboard.component").then(m => m.DashboardComponent)},
    {path: "new-filing", loadComponent: () => import("./views/pages/new-filing/new-filing.component").then(m => m.NewFilingComponent)}
];
