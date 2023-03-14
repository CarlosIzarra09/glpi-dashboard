import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-blockui-template",
  templateUrl: "./blockui-template.component.html",
  styleUrls: ["./blockui-template.component.scss"],
})
export class BlockuiTemplateComponent implements OnInit {
  message: string | undefined;
  constructor() {}

  ngOnInit(): void {}
}
