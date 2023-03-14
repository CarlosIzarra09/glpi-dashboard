import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { empty, forkJoin, map, Observable, of, switchMap } from "rxjs";
import { environment } from "src/environments/environment";
import { EvolutionTicket } from "../interface/dashboard/evolution_ticket";

import { GetIndicator } from "../interface/dashboard/get_indicator";
import { ResponseApi } from "../interface/response_api";




@Injectable({
  providedIn: "root",
})
export class ReportsService {

  constructor(
    private http: HttpClient
  ) {

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


  getAllReports() {

    /*return this.securityService.getToken().pipe(
      switchMap((respToken: ResponseApiSecurity) => {
        return forkJoin(
          of(respToken),
          this.getIndicators(),
          this.getTicketsEvolution(),
        ).pipe(
          map((resp: any) => {
            let data = [];
            data.push(
              resp[1],
              resp[2],
            );
            return data;
          })
        );
      })
    );*/
  }
}
