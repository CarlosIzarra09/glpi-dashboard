import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { empty, forkJoin, map, Observable, of, switchMap } from "rxjs";
import { ResponseApi, ResponseApiSecurity } from "../interface/response_api";
import { environment } from "src/environments/environment";
import { EvolutionTicket } from "../interface/dashboard/evolution_ticket";
import { GetIndicator } from "../interface/dashboard/get_indicator";
import { SecurityService } from "./security.service";
import { TicketByDay } from "../interface/dashboard/ticket_by_day";
import { UserOnline } from "../interface/dashboard/user_online";
//import { SecurityService } from "./security/security.service";




@Injectable({
  providedIn: "root",
})
export class ReportsService {

  constructor(
    private http: HttpClient,
    private securityService: SecurityService,
  ) {

  }

  getAllReports() {
    return this.securityService.getToken().pipe(
      switchMap((respToken: ResponseApiSecurity) => {
        return forkJoin(
          of(respToken),
          this.getIndicators(),
          this.getStateChart(),
          this.getLastSevenDays(),
          this.getOpenTicketsAgeDashboard(),
          this.getTicketsEvolution(),
          this.getListByRequestTypeDashboard(),
          this.getTicketsByDay(),
          this.getUsersOnline()
        ).pipe(
          map((resp: any) => {
            let data = [];
            data.push(
              resp[1],
              resp[2],
              resp[3],
              resp[4],
              resp[5],
              resp[6],
              resp[7],
              resp[8],
            );
            return data;
          })
        );
      })
    );
  }

  getIndicators() {
    return this.http.get<ResponseApi<GetIndicator>>(
      `${environment.API_TICKET}/v1/ticketstadistics/getIndicators`,
      {
        headers: new HttpHeaders()
      }
    );
  }


  getTicketsEvolution() {
    return this.http.get<ResponseApi<EvolutionTicket>>(
      `${environment.API_TICKET}/v1/ticketstadistics/getTicketsEvolution`,
      {
        headers: new HttpHeaders()
      }
    );
  }

  getStateChart() {
    return this.http.get<ResponseApi<any>>(
      `${environment.API_TICKET}/v1/ticketstadistics/getStateChart`,
      {
        headers: new HttpHeaders()
      }
    );
  }

  getLastSevenDays() {
    return this.http.get<ResponseApi<any>>(
      `${environment.API_TICKET}/v1/ticketstadistics/getLastSevenDays`,
      {
        headers: new HttpHeaders()
      }
    );
  }

  getOpenTicketsAgeDashboard() {
    return this.http.get<ResponseApi<any>>(
      `${environment.API_TICKET}/v1/ticketstadistics/getOpenTicketsAge`,
      {
        headers: new HttpHeaders()
      }
    );
  }

  getListByRequestTypeDashboard(){
    return this.http.get<ResponseApi<any>>(
      `${environment.API_TICKET}/v1/ticketstadistics/getListByRequestType`,
      {
        headers: new HttpHeaders()
      }
    );
  }

  getTicketsByDay() {
    return this.http.get<ResponseApi<TicketByDay>>(
      `${environment.API_TICKET}/v1/ticketstadistics/getTicketsByDay`,
      {
        headers: new HttpHeaders()
      }
    );
  }

  getUsersOnline() {
    return this.http.get<ResponseApi<UserOnline>>(
      `${environment.API_TICKET}/v1/ticketstadistics/getUsersOnline`,
      {
        headers: new HttpHeaders()
      }
    );

  }


}
