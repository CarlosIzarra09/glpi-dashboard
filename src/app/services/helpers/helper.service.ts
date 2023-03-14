import { Injectable } from "@angular/core";
// @ts-ignore
import PNotify from "pnotify/dist/es/PNotify";
// @ts-ignore
import PNotifyButtons from "pnotify/dist/es/PNotifyButtons";
import Swal from "sweetalert2";
import * as CryptoJS from "crypto-js";
import { environment } from "src/environments/environment";
import { FormBuilder } from "@angular/forms";
import { IconFile } from "../../models/icon";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class HelperService {
  constructor(private router: Router) {
    PNotifyButtons;
  }
  rowsSize = [10, 20, 50, 100, 150, 200, 300, 400, 500];
  getMessage(message: string, type: string) {
    return new PNotify({
      target: document.body,
      data: {
        text: message,
        type: type,
      },
    });
  }
  getLoading(type:any, message:any) {
    Swal.fire({
      allowOutsideClick: false,
      icon: type,
      text: message,
    });
    Swal.showLoading();
  }





  getAlertMessage(
    message: string = `¡Oops! algo sucedió. <br>Por favor intenta nuevamente.`,
    title = ""
  ) {
    return Swal.fire({
      title: title,
      icon: "warning",
      allowOutsideClick: false,
      html: message,
      confirmButtonText: `<i class="fa-solid fa-rotate-right"></i> Vuelve a intentar nuevamente`,
      confirmButtonColor: "#2282ff",
    });
  }

  getSuccessAlert(
    title: string,
    message: string,
    confirmButtonText: string = ""
  ) {
    return Swal.fire({
      allowOutsideClick: false,
      title: title,
      icon: "success",
      html: message,
      confirmButtonColor: "#2282ff",
      confirmButtonText: confirmButtonText,
    });
  }

  getErrorAlert(
    message: string = `¡Oops! algo sucedió. <br>Por favor intenta nuevamente.`,
    title = "¡Lo sentimos!"
  ) {
    return Swal.fire({
      title: title,
      icon: "error",
      allowOutsideClick: false,
      html: message,
      confirmButtonText: `<i class="fa-solid fa-rotate-right"></i> Vuelve a intentar nuevamente`,
      confirmButtonColor: "#2282ff",
    });
  }

  generaIdentity() {
    let chars = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890`;
    let pass = "";
    for (var x = 0; x < 10; x++) {
      var i = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(i);
    }
    return pass;
  }

  setObjToParams(obj:any) {
    const params = Object.keys(obj)
      .map(function (k) {
        return (
          encodeURIComponent(k) +
          "=" +
          encodeURIComponent(obj[k] == null ? "" : obj[k])
        );
      })
      .join("&");
    return params;
  }

  getIconFile(typeFile:any): IconFile {
    let icon: IconFile = new IconFile();
    switch (typeFile) {
      case "application/pdf":
        icon.name = "fa-solid fa-file-pdf";
        icon.color = "#ea4e4e";
        break;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        icon.name = "fa-regular fa-file-word";
        icon.color = "#2778c4";
        break;
      case "application/msword":
        icon.name = "fa-solid fa-file-word";
        icon.color = "#2778c4";
        break;
      case "image/jpeg":
        icon.name = "fa-regular fa-image";
        icon.color = "#2778c4";
        break;

      case "image/png":
        icon.name = "fa-regular fa-image";
        icon.color = "#2778c4";
        break;

      case "application/vnd.rar":
        icon.name = "fa-regular fa-file-zipper";
        icon.color = "";
        break;
      case "application/zip":
        icon.name = "fa-regular fa-file-zipper";
        icon.color = "#a38835";
        break;
      case "application/octet-stream":
        icon.name = "fa-regular fa-file-zipper";
        icon.color = "#a38835";
        break;
      case "application/x-zip-compressed":
        icon.name = "fa-regular fa-file-zipper";
        icon.color = "#a38835";
        break;
      case "multipart/x-zip":
        icon.name = "fa-regular fa-file-zipper";
        icon.color = "#a38835";
        break;
      default:
        icon.name = "fa-regular fa-file";
        icon.color = "#2778c4";
        break;
    }

    return icon;
  }

  formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) return { size: 0, measure: "Bytes" };

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return {
      size: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)),
      measure: sizes[i],
    };
  }
  compareBinaryMeasure(size_file_request:any, pmax_size:any) {
    const measures = [
      { measure: "Bytes", order: 0 },
      { measure: "KB", order: 1 },
      { measure: "MB", order: 2 },
      { measure: "GB", order: 3 },
      { measure: "TB", order: 4 },
    ];

    //I check the weight of the file
    const size_file = this.formatBytes(size_file_request);

    //I get the order of the file measure
    const measure_file = measures.find(
      (item) => item.measure === size_file.measure
    );

    //Obtengo la medida solicitada del archivo
    const size_request = measures.find(
      (item) => item.measure === pmax_size.slice(-2)
    );

    //Get the maximum size of the requested file
    const max_size = pmax_size.slice(0, -2);

    //I compare the measurements if it is less than or equal to what is requested
    if (measure_file!.order < size_request!.order) {
      return { result: true, size_file: size_file.size + size_file.measure };
    } else if (measure_file!.order == size_request!.order) {
      if (size_file.size <= max_size) {
        return { result: true, size_file: size_file.size + size_file.measure };
      } else {
        return { result: false, size_file: size_file.size + size_file.measure };
      }
    } else {
      return { result: false, size_file: size_file.size + size_file.measure };
    }
  }

  encodeData(e:any, r:any) {
    if (null === e) return null;
    if (void 0 === e) return void 0;
    if ("" === e.replace(/^\s+|\s+$/gm, "")) return e;
    var t = CryptoJS.enc.Utf8.parse(r),
      n = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(e), t, {
        keySize: 16,
        iv: t,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }),
      o = n.toString();
    return encodeURIComponent(o);
  }

  decodeData(e:any, r:any) {
    if (null === e) return null;
    if (void 0 === e) return void 0;
    if ("" === e.replace(/^\s+|\s+$/gm, "")) return e;
    var t = CryptoJS.enc.Utf8.parse(r);
    e = decodeURIComponent(e);
    var n = CryptoJS.AES.decrypt(e, t, {
        keySize: 16,
        iv: t,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }),
      o = n.toString(CryptoJS.enc.Utf8).replace(/\\/g, "");
    o = o.replace('"{', "{").replace('}"', "}");

    return o;
  }

  async getBase64ImageFromUrl(imageUrl:any) {
    var res = await fetch(imageUrl);
    var blob = await res.blob();

    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          resolve(reader.result);
        },
        false
      );

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    });
  }

  getUrlBase(): string {
    return location.pathname.substring(1);
  }

  convertHtmlToText(value:any) {
    let str = (typeof value === 'string') ? value : value.toString();
  return str.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ');

  }
}
