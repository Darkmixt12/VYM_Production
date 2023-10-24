import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Factura } from 'src/models/factura';
import { FacturaService } from 'src/services/factura.service';

import { ElementRef} from '@angular/core';
import * as XLSX from 'xlsx';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-push-table',
  templateUrl: './push-table.component.html',
  styleUrls: ['./push-table.component.css'],
  providers: [FacturaService] 
})
export class PushTableComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['facturasId','agente','cliente','fechaRegDia_db','push50','push100','push500','push1000','push5000','Monto','acciones' ];
  dataSource = new MatTableDataSource<Factura>
  loading?: boolean

  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('TABLE') table!: ElementRef;

  constructor(
    public dialog: MatDialog,
    private _facturaService: FacturaService,
    private _snackBar: MatSnackBar

  ){}



  ngOnInit(): void {
    this.getFacturas()
  }
  
  ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




  getFacturas(){
    this.loading = true
    setTimeout(()=>{
      this._facturaService.listaFacturas().subscribe(
        response => {
          this.loading = false
          if(response.facturasInfo){
            this.dataSource.data = response.facturasInfo /* para que se llenen los campos */

          }
        },
        error => {
          console.log(<any> error);
        }
    )
    }, 700 )

  }

  //! EXCEL IMPORT // ----------------

  exportAsExcel()
  {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');

  }
}
