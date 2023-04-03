import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, finalize, map, switchMap } from "rxjs";
import { MenuPassport } from "src/app/interface/menu_passport";
import { Nav } from "src/app/interface/nav";
import {
  AuthMenu,
  DataAuthenticate,
} from "src/app/interface/security/dataAuth";
import { environment } from "src/environments/environment";
import { ResponseApi, ResponseApiSecurity } from "../interface/response_api";
import { AuthRolUsuario } from "src/app/interface/security/dataAuth";
import { AuthAccion } from "../interface/security/dataAuth";

@Injectable({
  providedIn: "root",
})
export class SecurityService {
  userAuth: BehaviorSubject<DataAuthenticate>;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private menu = new BehaviorSubject<Nav[]>([]);
  public roleSelected: AuthRolUsuario;
  public menuSelected: AuthMenu;
  public menuItemSelected: AuthMenu;
  public currentMenu: Nav;

  constructor(
    private http: HttpClient,

    public router: Router,

  ) {}


  getToken(): any {
    const headers = new HttpHeaders()
      //.set("apikey", environment.API_KEY)
      .set("Content-type", "application/json");
    return this.http.get<any>(`${environment.API_SEGURIDAD}/generateToken`, {
      headers: headers,
    });
  }


}
