import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  constructor(private router: Router){}

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  goToNewFiling(){
    this.router.navigate(["/new-filing"]);
  }

  
}


