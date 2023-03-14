import { Component, DoCheck } from "@angular/core";
import { Router } from "@angular/router";
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Glpi-dashboard';
  isSideNavCollapsed = true;
  screenWidth = window.innerWidth;
  isLoggedIn$: boolean = true;
  //isLoggedIn$: Observable<boolean>;
  constructor(public router: Router){

  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  ngOnInit() {}
}
