import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Factura } from 'src/models/factura';
import { FacturaService } from 'src/services/factura.service';
import { TableService } from 'src/services/pages.service';


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


  constructor(
    private _tableService: TableService,

  ){}



  ngOnInit(): void {
    this._tableService.getFacturas()
  }
  
  ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
  }

  //! Filtro para busqueda en la tabla //
  applyFilter(event: Event) {}

  //! EXCEL EXPORT //
  exportAsExcel(){}
  

}
