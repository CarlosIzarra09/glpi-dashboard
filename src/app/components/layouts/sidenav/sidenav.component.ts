import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from "@angular/animations";
import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Nav } from "src/app/interface/nav";
import { fadeInOut, INavBarData } from "./helper";
import { navbarData } from "./nava-data";
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
  animations: [
    fadeInOut,
    trigger("rotate", [
      transition(":enter", [
        animate(
          "1000ms",
          keyframes([
            style({ transform: "rotate(0deg)", offset: "0" }),
            style({ transform: "rotate(2turn)", offset: "1" }),
          ])
        ),
      ]),
    ]),
  ],
})
export class SidenavComponent implements OnInit {
  collapsed = true;
  screenWidth = 770;
  multiple: boolean = false;
  isLoggedIn: boolean = false;
  //navData = navbarData;
  navData = [] as any[];

  menuxx$: Observable<any[]> | undefined;

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  constructor(public router: Router) {

  }
  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
  closeSidenav() {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
  handleClick(item: any) {
    if (!this.multiple) {
      for (let modelIem of this.navData) {
        if (item !== modelIem && modelIem.expanded) modelIem.expanded = false;
      }
    }
    item.expanded = !item.expanded;
  }
  getActiveClass(data: INavBarData): string {
    return this.router.url.includes(data.routeLink) ? "active" : "";
  }

  shrinkItems(item: INavBarData): void {
    if (!this.multiple) {
      for (let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }
}
