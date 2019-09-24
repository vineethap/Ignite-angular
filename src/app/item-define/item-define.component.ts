import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ItemComponent } from '../item/item.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-item-define',
  templateUrl: './item-define.component.html',
  styleUrls: ['./item-define.component.css']
})
export class ItemDefineComponent implements OnInit {
  materialsUsed: any = [];
  total: number;
  waistPerc: number;
  other = 10;
  totalCost = 241.002;
  margin = 60.250;
  baseUrl: string='http://localhost:5555/Node_Api/';
  itemCode: any;
  lbrCostPerc: any;
  eqp: any;
  eqpNum: any;
  constructor(private dialog: MatDialog,private http:HttpClient,private snackBar: MatSnackBar ) { }
  ngOnInit() {
  }
  openDialog() {
    const dialogRef = this.dialog.open(ItemComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    
     let dataSet={
      "ItemDefineId": result.itemCode,
			"MaterialItemCd": +result.itemCode,
			"MaterialItemDs": result.desc,
			"MaterialQty": result.quantity,
			"Unit": result.unit,
			"Rate": result.unitPrice,
			"Amount": result.total
     } 
      this.materialsUsed.push(dataSet);
    });
  }
  calculateTotal() {
    if (this.materialsUsed.length > 0) {
      this.materialsUsed.map(val => {
        val.unitPrice = +val.unitPrice;
        val.quantity = +val.quantity;
        val.total = val.unitPrice * val.quantity
      })
    }
    // console.log(this.materialsUsed, "sum", this.sum('total', this.materialsUsed))
    this.total = this.sum('total', this.materialsUsed);
    return this.sum('total', this.materialsUsed)
  }
  sum(key, arr) {
    return arr.reduce((a, b) => a + (b[key] || 0), 0);
  }
  waistCalculation() {
    if (this.waistPerc && this.total)
      return (100 * this.waistPerc) / this.total;
  }
  percentageCalculation(value) {
    if (value)
      return (100 * value) / this.total;
  }
  saveItem(){
    this.setValues()
    this.http.post<any>(this.baseUrl + 'stock/InsertItemDefine',{data:this.setValues()} ).subscribe((res)=>{
     console.log(res)
     this.snackBar.open("successfully saved",'a' ,{
      duration: 2000
    });
    });
  }
 private setValues() {

    const data= {
      "ItemDefineHdr": {
        "ItemDefineId": this.itemCode,
        "ItemId": +this.itemCode,
        "TotalMaterialCost":this.calculateTotal(),
        "WaistPer": this.waistPerc,
        "WaistAmount": this.waistCalculation(),
        "LabourCostPer": this.lbrCostPerc,
        "LabourCostAmount":this.percentageCalculation(this.lbrCostPerc),
        "LabourCostDetailed": 10,
        "Eqp": this.eqp,
        "EqpHr": this.eqpNum,
        "EqpAmount": 10,
        "Other": this.other,
        "TotalCost": this.totalCost,
        "Margin": this.margin,
        "TotalAmount": 10,
        "InsertUpdateMode": 0
      },
      "MaterialItems": this.materialsUsed
    
  }
  return data
  }
}
