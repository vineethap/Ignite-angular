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
  itemDs: any;
  qty: any;
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
        val.unitPrice = +val.Rate;
        val.quantity = +val.MaterialQty;
        val.total = val.unitPrice * val.quantity;
        val.Amount=val.total;
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
      return (this.total * this.waistPerc) /100 ;
  }
  percentageCalculation(value) {
    if (value)
      return ( this.total * value) /100;
  }
  saveItem(){
    this.setValues()
    this.http.post<any>(this.baseUrl + 'stock/InsertItemDefine',{data:this.setValues()} ).subscribe((res)=>{
     if(res.success_msg=='inserted'){
     this.snackBar.open("successfully saved",'a' ,{
      duration: 2000
    });
    this.materialsUsed=[];
    this.itemCode='';
    this.itemDs='';
    this.qty=null;
    this.waistPerc=null;
    this.lbrCostPerc=null;
    this.eqpNum=null;
    this.eqp=null;
  }
    else{
      this.snackBar.open("something went wrong",'' ,{
        duration: 2000
      });
    }
    });
  }
 private setValues() {

    const data= {
      "ItemDefineHdr": {
        "ItemDefineId": this.itemCode,
        "ItemId": parseInt(this.itemCode),
        "ItemCode": this.itemCode,
        "ItemDs": this.itemDs,
        "Qty":this.qty,
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
        "TotalAmount": this.grandTotal(),
        "InsertUpdateMode": 0
      },
      "MaterialItems": this.materialsUsed
    
  }
  return data
  }
  grandTotal(){
    let t=this.calculateTotal()+this.waistCalculation()+this.percentageCalculation(this.lbrCostPerc)+(this.eqp*this.eqpNum)+this.other+this.totalCost+this.margin;
    
    return t;
  }
}
