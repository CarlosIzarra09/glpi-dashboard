import { compileNgModule } from "@angular/compiler";
import { Component, Input, TemplateRef } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Subscription } from "rxjs";
import { AuthRolUsuario, DataAuthenticate } from "src/app/interface/security/dataAuth";

import { environment } from "src/environments/environment";
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  @BlockUI()
  blockUI!: NgBlockUI;
  modalRef!: BsModalRef;
  token: string = '';
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  nombreRol: String = "";

  public formChangePassword = this.fb.group({
    token: [null, [Validators.required]],
    passwordOld: [
      "",
      [Validators.required, Validators.minLength(5), Validators.maxLength(15)],
    ],
    passworNew: [
      "",
      [Validators.required, Validators.minLength(5), Validators.maxLength(15)],
    ],
  });

  dataAuthenticate: DataAuthenticate = new DataAuthenticate();
  isLoggedIn: boolean = false;
  suscription: Subscription = new Subscription();
  roles: AuthRolUsuario[] | undefined;
  rol: AuthRolUsuario | undefined;
  rolId: number | null = null;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    public router: Router,

  ) {
    //this.dataAuthenticate = securityService.getUserAuth();
    //const rolx = this.dataAuthenticate.dataAuth.AuthRolUsuario.Data.find(
    //  (row) => row.POR_DEFECTO
    //);

    //this.rol = rolx;
    this.rolId = 1;
    //this.roles = this.dataAuthenticate.dataAuth.AuthRolUsuario.Data;
    //this.securityService.roleSelected = rolx;
  }
  getHeaderClass(): string {
    let styleClass = "";
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = "header-trimmed";
    } else {
      styleClass = "header-md-screen";
    }
    return styleClass;
  }

  /*inputNotValid(campo: string): boolean {
    if (
      this.formChangePassword.get(campo).invalid &&
      this.formChangePassword.get(campo).touched
    ) {
      return true;
    } else {
      return false;
    }
  }*/

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }



}
