import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localePE from "@angular/common/locales/es-PE";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { registerLocaleData } from '@angular/common';
import { BlockUIModule } from "ng-block-ui";
import { BlockuiTemplateComponent } from './components/shared/blockui-template/blockui-template.component';
registerLocaleData(localePE, "es");
//import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BlockUIModule.forRoot({
      message: "Procesando su solicitud...",
      template: BlockuiTemplateComponent,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
