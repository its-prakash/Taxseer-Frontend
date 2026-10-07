import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './views/sheared-component/header/header.component';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { NewFilingComponent } from './views/pages/new-filing/new-filing.component'
import { DashboardFilersComponent } from './views/pages/filing/dashboard-filers/dashboard-filers.component';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, DashboardComponent, NewFilingComponent, RouterOutlet, DashboardFilersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'taxseer-frontend';
}
