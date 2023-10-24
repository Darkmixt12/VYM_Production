import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FacturaService } from './factura.service';
import { Factura } from '../models/factura';
import { ViewChild, ElementRef, Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable()
export class TableService {

  dataSource = new MatTableDataSource<Factura>();
  loading?: boolean = false;


  @ViewChild('TABLE') table!: ElementRef;

  constructor(
    public dialog: MatDialog,
    private _facturaService: FacturaService,
  ) {}

  //? Jala la info de las facturas de la BQ y las muestra en la tabla // 
  getFacturas() {
    this.loading = true;
    setTimeout(() => {
      this._facturaService.listaFacturas().subscribe(
        (response) => {
          this.loading = false;
          if (response.facturasInfo) {
            this.dataSource.data =
              response.facturasInfo; /* para que se llenen los campos */
          }
        },
        (error) => {
          console.log(<any>error);
        }
      );
    }, 700);
  }

  //? Aplica el filtro a la tabla pero es global busca por todos los campos sus relaciones 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //? Funcion para exportar en excel el contenido de la tabla
  exportAsExcel()
  {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');

  }


}
