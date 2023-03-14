import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { EvolutionTicket } from 'src/app/interface/dashboard/evolution_ticket';
import { GetIndicator } from 'src/app/interface/dashboard/get_indicator';
import { Datum, OpenTicketByAgent } from 'src/app/interface/dashboard/open_ticket_agent';
import { ReportsService } from 'src/app/services/reports.service';
declare var Highcharts: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  unsuscribe = new Subject<void>();

  contentLoaded = false;
  filterOptionLastTicket = 10;
  listDataLastTickets = [];

  //GetOpenTicketsAgeDashboard
  getIndicator: GetIndicator | undefined;
  listTicketsOpenAgent!: OpenTicketByAgent;
  evolutionTicket: EvolutionTicket | undefined;


  constructor(private _reportsService: ReportsService) {

  }

  ngOnInit(): void {
    this.getDataDashboard();
  }

  getDataDashboard() {
    this.contentLoaded = true;
    var _context = this;

    this._reportsService.getTicketsEvolution().subscribe(
      (result) => {
        this.contentLoaded = false;

        this.evolutionTicket = result.data;


        setTimeout(() => {
          _context.runEvolutionTicket();
        }, 400);
      },
      (error) => (this.contentLoaded = false)
    )

    this._reportsService.getIndicators().subscribe(
      (result) => {
        this.contentLoaded = false;
        this.getIndicator = result.data;

        setTimeout(() => {
          _context.runEvolutionTicket();
        }, 400);
      },
      (error) => (this.contentLoaded = false)
    )
  }

  runEvolutionTicket() {
    Highcharts.chart("container00", {
      credits: {
        enabled: false,
      },
      chart: {
        type: "spline",
      },
      title: {
        text: "Evolución de tickets",
      },
      subtitle: {
        text: "Source: ",
      },
      xAxis: {
        categories: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic",
        ],
        accessibility: {
          description: "Months of the year",
        },
      },
      yAxis: {
        title: {
          text: "N° de Tickets",
        },
        labels: {
          //@ts-ignore
          formatter: function () {
            //@ts-ignore
            return this.value + "";
          },
        },
      },
      tooltip: {
        crosshairs: true,
        shared: true,
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: "#666666",
            lineWidth: 1,
          },
        },
      },
      series: this.evolutionTicket,
    });
  }

}
