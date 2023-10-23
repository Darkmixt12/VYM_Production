import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Factura } from 'src/models/factura';



@Component({
  selector: 'app-push-table',
  templateUrl: './push-table.component.html',
  styleUrls: ['./push-table.component.css']
})
export class PushTableComponent {

  displayedColumns: string[] = ['facturasId','numPedido','cliente','Monto', 'fechaRegDia_db', 'acciones' ];
  dataSource = new MatTableDataSource<Factura>
}
