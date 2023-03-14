import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-skeleton-loading",
  templateUrl: "./skeleton-loading.component.html",
  styleUrls: ["./skeleton-loading.component.scss"],
})
export class SkeletonLoadingComponent implements OnInit {
  @Input() imageSize = 75;
  @Input() barHeight = 15;
  @Input() bars = 1;

  // Final properties

  public totalBars: { width: string }[] = [];
  public finalStyleImage = {};
  public finalHeightBar = "0";

  constructor() {}

  ngOnInit() {
    // Calculate total bars
    for (let i = 0; i < this.bars; i++) {
      const width = Math.floor(Math.random() * (100 - 60)) + 60;
      this.totalBars.push({ width: `${width}%` });
    }

    // img style

    this.finalStyleImage = {
      width: `${this.imageSize}px`,
      height: `${this.imageSize}px`,
    };

    // bar style
    this.finalHeightBar = `${this.barHeight}px`;
  }
}
