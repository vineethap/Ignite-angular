import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { MaterialDialogComponent } from '../material-dialog/material-dialog.component';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'}
 
];
@Component({
  selector: 'app-client-boq',
  templateUrl: './client-boq.component.html',
  styleUrls: ['./client-boq.component.css']
})
export class ClientBoqComponent implements OnInit {
  displayedColumns: string[] = ['ItemCode', 'Description', 'Qty', 'Unit','Rate','Amount'];
  dataSource = [];
  constructor(private dialog: MatDialog,) { }

  ngOnInit() {
  }
  openDialog() {
    const dialogRef = this.dialog.open(MaterialDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.dataSource.push(result);
      this.dataSource = [...this.dataSource]; 
    })
}
}
