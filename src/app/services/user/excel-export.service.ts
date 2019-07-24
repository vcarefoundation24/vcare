import { Injectable } from '@angular/core';
import {File} from '@ionic-native/file/ngx'
import { UserService } from 'src/app/user.service';
import * as XLSX from 'xlsx';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {

  public loading:HTMLIonLoadingElement;
  public filePath = this.file.externalRootDirectory;
  constructor(public file:File,public userService:UserService) {}

  public exportAsExcelFile(json: any, excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  public saveAsExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
     this.file.writeFile(this.filePath, 'VCare_' + fileName + EXCEL_EXTENSION, data,{replace: true}).then(() => {
        this.userService.presentAlert('Success',"File downloaded at " + this.filePath);
      }).catch((err) => {
        this.userService.presentAlert('Error',"Unable to download File :"+ err.messsage);
      });
  }

  
}
