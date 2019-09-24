import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-material-dialog',
  templateUrl: './material-dialog.component.html',
  styleUrls: ['./material-dialog.component.css']
})
export class MaterialDialogComponent implements OnInit {

  form: FormGroup;
  baseUrl: string='http://localhost:5555/Node_Api/';
  itemList= [];

  constructor(
    public dialogRef: MatDialogRef<MaterialDialogComponent>, private fb: FormBuilder,
    public http: HttpClient
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.form = this.fb.group({
      description: [''],
      itemCode: [],
      qty: [],
      price: [],
      unit: []
    })
    this.form.get('itemCode').valueChanges.subscribe(val => {
      console.log(val)
      if (this.form.controls.itemCode.value) {
        let data={StockCd:this.form.controls.itemCode.value}
        this.http.get<any>(this.baseUrl + 'stock/GetClientBOQ',{params:data} ).subscribe((res)=>{
        if(res)
          this.itemList=res.StockData;
      });
  }
})

}
setItem(item){
  // this.item=item;
  this.form.setValue({
    itemCode:item.ItemCd,
    description:item.ItemDs,
    price:this.form.value.price,
    qty:item.Qty,
    unit:this.form.value.unit
  },
    {emitEvent:false})
  this.itemList=[];
}
saveData(){
  this.dialogRef.close(this.form.value)
}
}
