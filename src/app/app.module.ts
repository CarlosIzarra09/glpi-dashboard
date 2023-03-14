import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localePE from "@angular/common/locales/es-PE";

import { BodyComponent } from "./components/layouts/body/body.component";
import { SidenavComponent } from "./components/layouts/sidenav/sidenav.component";
import { HeaderComponent } from "./components/layouts/header/header.component";
import { SublevelMenuComponent } from "./components/layouts/sidenav/sublevel-menu.component";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { registerLocaleData } from '@angular/common';
import { BlockUIModule } from "ng-block-ui";
import { ModalModule } from "ngx-bootstrap/modal";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BlockuiTemplateComponent } from './components/shared/blockui-template/blockui-template.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from './modules/shared/shared.module';
registerLocaleData(localePE, "es");
//import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    HeaderComponent,
    SublevelMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    BlockUIModule.forRoot({
      message: "Procesando su solicitud...",
      template: BlockuiTemplateComponent,
    }),
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    ModalModule.forRoot(),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "es-PE" },
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
