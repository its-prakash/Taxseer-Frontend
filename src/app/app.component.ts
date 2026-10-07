import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './views/sheared-component/header/header.component';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { FilersComponent } from './views/pages/taxseer-filing-filer/filers/filers.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, DashboardComponent, FilersComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'taxseer-frontend';
}
