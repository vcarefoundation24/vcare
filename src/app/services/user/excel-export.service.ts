import { Injectable } from '@angular/core';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import {File, FileEntry} from '@ionic-native/file/ngx'
import { UserService } from 'src/app/user.service';
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {

  public loading:HTMLIonLoadingElement;
  constructor(private file:File,private userService:UserService,private loadingCtrl : LoadingController) {
    this.sName = 'SheetTest';
    this.excelFileName = 'TestExcelExport.xlsx';
  }

  name: string;
  sName:string;
  excelFileName:string;
  //blobType: string = "text/plain;charset=utf-8";
  blobType: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  
  exportToExcel(jsonData,excelName,excelColumns)
  {
    var workbook = new Excel.Workbook();
    workbook.creator = 'Web';
    workbook.lastModifiedBy ='Web';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.addWorksheet(this.sName, { views: [{ state: 'frozen', ySplit: 3, xSplit: 0, activeCell: 'A1', showGridLines: true }] })
    var sheet = workbook.getWorksheet(1);
    var head1 = [excelName];
    sheet.addRow(head1);
    sheet.addRow("");
    sheet.getRow(3).values = excelColumns;
    let columnKeys = [];
    excelColumns.forEach(element => {
      columnKeys.push({key:element});
    });
    sheet.columns = columnKeys;
    sheet.addRows(jsonData);
    workbook.xlsx.writeBuffer().then(data => {
      var blob = new Blob([data], { type: this.blobType });
      let filePath = this.file.externalRootDirectory;
    //Write the file
    this.file.writeFile(filePath, 'VCare_' + excelName + '.xlsx', blob, { replace: true }).then((fileEntry: FileEntry) => {
        this.userService.presentAlert('Success',"File downloaded at " + filePath);
    }).catch((err) => {
        this.userService.presentAlert('Error',"Unable to download File :"+ err.messsage);
      });
    });
  }

  
}
