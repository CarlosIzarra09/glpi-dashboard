import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { RouterModule } from "@angular/router";
import { NgxDropzoneModule } from "ngx-dropzone";
import { TooltipModule } from "ngx-bootstrap/tooltip";

import { PaginationModule } from "ngx-bootstrap/pagination";
import { BlockUIModule } from "ng-block-ui";
import { DateRangeComponent } from "../../components/shared/date-range/date-range.component";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { SkeletonLoadingComponent } from "../../components/shared/skeleton-loading/skeleton-loading.component";
import { BlockCopyPasteDirective } from "../../directives/block-copy-paste.directive";
import { BlockTagHtmlDirective } from "../../directives/blocktaghtml.directive";
import { NumericDirective } from "../../directives/numeric.directive";
import { TextDirective } from "../../directives/text.directive";



@NgModule({
  declarations: [
    SkeletonLoadingComponent,
    DateRangeComponent,
    BlockCopyPasteDirective,
    BlockTagHtmlDirective,
    NumericDirective,
    TextDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    RouterModule,
    TooltipModule.forRoot(),
    NgxDropzoneModule,
    RouterModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    BlockUIModule.forRoot(),
    NgxSkeletonLoaderModule,
  ],
  exports: [
    DateRangeComponent,
    SkeletonLoadingComponent,
    BlockTagHtmlDirective,
    BlockCopyPasteDirective,
    NumericDirective,
    TextDirective,
  ],
})
export class SharedModule { }
