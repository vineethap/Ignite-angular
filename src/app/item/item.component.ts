import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  materialsForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<ItemComponent>,public formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.materialsForm = this.formBuilder.group({
      itemCode: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      unitPrice: [],
      desc:['',[Validators.required]]
    })
  }
  saveData(){
    this.dialogRef.close(this.materialsForm.value);
  }
}