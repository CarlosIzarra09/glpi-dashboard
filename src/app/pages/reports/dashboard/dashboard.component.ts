import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataStatus } from 'src/app/interface/dashboard/data_status';
import { EvolutionTicket } from 'src/app/interface/dashboard/evolution_ticket';
import { GetIndicator } from 'src/app/interface/dashboard/get_indicator';
import { GetLastSevenDay } from 'src/app/interface/dashboard/get_last_seven_day';
import { ListRequestType } from 'src/app/interface/dashboard/list_request_type';
import { Datum, OpenTicketByAgent } from 'src/app/interface/dashboard/open_ticket_agent';
import { OpenTicketAge } from 'src/app/interface/dashboard/open_tickets_age';
import { TicketByDay } from 'src/app/interface/dashboard/ticket_by_day';
import { UserOnline } from 'src/app/interface/dashboard/user_online';
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
  listDataLastTickets;

  //GetOpenTicketsAgeDashboard
  getIndicator: GetIndicator;
  dataStatus: DataStatus;
  dataSevenDays: GetLastSevenDay;
  userOnline: UserOnline;


  listTicketsOpenAgent: OpenTicketByAgent;
  ticketAge: OpenTicketAge;
  evolutionTicket: EvolutionTicket;
  ticketsByDay: TicketByDay;
  listByRequestTypeDashboard: ListRequestType;


  constructor(private _reportsService: ReportsService) {
    setInterval(() => {
      location.reload();
    }, 60000);
  }

  ngOnInit(): void {
    this.getDataDashboard();
  }

  getDataDashboard() {
    this.contentLoaded = true;
    var _context = this;

    this._reportsService.getAllReports().subscribe(
      (result) => {
        this.contentLoaded = false;

        this.getIndicator = result[0].data;
        this.dataStatus = result[1].data;
        this.dataSevenDays = result[2].data;
        this.ticketAge = result[3];
        this.evolutionTicket = result[4].data;
        this.listByRequestTypeDashboard = result[5].data;
        this.ticketsByDay = result[6].data;
        this.userOnline = result[7];
        //console.log(this.getIndicator);
        //console.log(this.evolutionTicket);

        setTimeout(() => {
          _context.runGraphOpennedTicketsPerState();
        }, 400);

        setTimeout(() => {
          _context.runGraphEvolutionTicket();
        }, 400);

        setTimeout(() => {
          _context.runGraphLastSevenDays();
        }, 400);

        setTimeout(() => {
          _context.runGetOpenTicketsAge();
        }, 400);

        setTimeout(() => {
          _context.runGraphTicketsBySource();
        }, 400);

        setTimeout(() => {
          _context.runTicketsByDay();
        }, 400);
      },
      (error) => (this.contentLoaded = false)
    );

  }

  runGraphEvolutionTicket() {
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
          formatter: function () {
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

  runGraphOpennedTicketsPerState() { //Run GraphOne
    Highcharts.chart("container01", {
      credits: {
        enabled: false,
      },
      chart: {
        styledMode: true,
      },
      title: {
        text: "Tickets abiertos por estado",
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
      },
      series: [
        {
          type: "pie",
          allowPointSelect: true,
          keys: ["name", "y", "selected", "sliced"],
          data: this.dataStatus,
          showInLegend: true,
        },
      ],
    });
  }

  runGraphLastSevenDays() { //RunGraphTwo
    Highcharts.chart("container02", {
      credits: {
        enabled: false,
      },
      chart: {
        type: "column",
      },
      title: {
        text: "Incidencias - Últimos 7 Días",
        align: "left",
      },
      xAxis: {
        categories: this.dataSevenDays.categories,
      },
      yAxis: {
        min: 0,
        title: {
          text: "Count trophies",
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: "bold",
            color:
              // theme
              (Highcharts.defaultOptions.title.style &&
                Highcharts.defaultOptions.title.style.color) ||
              "gray",
            textOutline: "none",
          },
        },
      },
      legend: {
        align: "left",
        x: 70,
        verticalAlign: "top",
        y: 70,
        floating: true,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || "white",
        borderColor: "#CCC",
        borderWidth: 1,
        shadow: false,
      },
      tooltip: {
        headerFormat: "<b>{point.x}</b><br/>",
        pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
      },
      plotOptions: {
        column: {
          stacking: "normal",
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: this.dataSevenDays.series,
    });
  }

  runGetOpenTicketsAge() { //RunGraphThree
    Highcharts.chart("container03", {
      credits: {
        enabled: false,
      },
      chart: {
        type: "column",
      },
      title: {
        text: "Edades de ticket aperturados",
        align: "left",
      },
      xAxis: {
        categories: this.ticketAge.data.categories,
      },
      yAxis: {
        min: 0,
        title: {
          text: "",
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: "bold",
            color:
              // theme
              (Highcharts.defaultOptions.title.style &&
                Highcharts.defaultOptions.title.style.color) ||
              "gray",
            textOutline: "none",
          },
        },
      },
      legend: {
        align: "left",
        x: 70,
        verticalAlign: "top",
        y: 70,
        floating: true,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || "white",
        borderColor: "#CCC",
        borderWidth: 1,
        shadow: false,
      },
      tooltip: {
        headerFormat: "<b>{point.x}</b><br/>",
        pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
      },
      plotOptions: {
        column: {
          stacking: "normal",
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: this.ticketAge.data.series,
    });
  }

  runGraphTicketsBySource() { //Rungraphfour
    const chart = Highcharts.chart("container04", {
      credits: {
        enabled: false,
      },
      title: {
        text: "Número de tickets por fuente de solicitud",
      },
      xAxis: {
        categories: this.listByRequestTypeDashboard.categories,
      },
      series: [
        {
          type: "column",
          name: "Tickets",
          colorByPoint: true,
          data: this.listByRequestTypeDashboard.data,
          showInLegend: false,
        },
      ],
    });
  }

  runTicketsByDay() {
    Highcharts.chart("container05", {
      credits: {
        enabled: false,
      },
      chart: {
        styledMode: true,
      },
      title: {
        text: "Periodo de atención de Tickets",
      },
      xAxis: {
        categories: [],
      },
      series: [
        {
          type: "pie",
          allowPointSelect: true,
          keys: ["name", "y", "selected", "sliced"],
          data: this.ticketsByDay,
          showInLegend: true,
        },
      ],
    });
  }

}
