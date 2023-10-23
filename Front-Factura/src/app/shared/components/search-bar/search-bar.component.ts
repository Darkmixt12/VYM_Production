import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Factura } from 'src/models/factura';

@Component({
  selector: 'shared-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  dataSource = new MatTableDataSource<Factura>


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
