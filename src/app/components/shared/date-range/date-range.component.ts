import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { defineLocale } from "ngx-bootstrap/chronos";
import { esLocale } from "ngx-bootstrap/locale";
import * as moment from "moment";

import "moment/locale/es";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
defineLocale("es", esLocale);
moment.locale("es");
@Component({
  selector: "app-date-range",
  templateUrl: "./date-range.component.html",
  styleUrls: ["./date-range.component.scss"],
})
export class DateRangeComponent implements OnInit {
  @Output() dateRange = new EventEmitter<string>();
  @Input() public flgRequired: any = true;
  dates;
  constructor(private localeService: BsLocaleService) {
    this.localeService.use("es");
    this.dates = [new Date(), new Date()];
  }

  ngOnInit(): void {}

  onChange(e: any) {
    this.dateRange.emit(e);
  }

  onSelectedOption(val: any) {
    switch (val) {
      case "hoy":
        this.dates = [new Date(), new Date()];
        break;
      case "ayer":
        this.dates = [
          moment().subtract(1, "days").toDate(),
          moment().subtract(1, "days").toDate(),
        ];
        break;
      case "7dias":
        this.dates = [moment().subtract(7, "days").toDate(), new Date()];
        break;
      case "30dias":
        this.dates = [
          moment().subtract(30, "days").toDate(),
          moment().toDate(),
        ];
        break;
      case "estemes":
        this.dates = [
          moment().startOf("month").toDate(),
          moment().endOf("month").toDate(),
        ];
        break;
      case "esteanho":
        this.dates = [
          moment().startOf("year").toDate(),
          moment().endOf("year").toDate(),
        ];
        break;
      case "mespasado":
        this.dates = [
          moment().subtract(1, "month").startOf("month").toDate(),
          moment().subtract(1, "month").endOf("month").toDate(),
        ];
        break;
      case "anhopasado":
        this.dates = [
          moment().subtract(1, "year").startOf("year").toDate(),
          moment().subtract(1, "year").endOf("year").toDate(),
        ];
        break;

      default:
        break;
    }
  }
}
