import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatTableModule,MatTabsModule,MatGridListModule,MatInputModule} from '@angular/material';
import {
  MatButtonModule, MatSidenavModule, MatListModule, MatToolbarModule} from '@angular/material';
import {MatDialogModule,MatCardModule} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SecondComponent } from './second/second.component';
import { FirstComponent } from './first/first.component';
import {RouterModule, Routes} from "@angular/router";
import {CustomMaterialModule} from "./core/material.module";
import { ClientBoqComponent } from './client-boq/client-boq.component';
import { ItemDefineComponent } from './item-define/item-define.component';
import { MaterialDialogComponent } from './material-dialog/material-dialog.component';
import { ItemComponent } from './item/item.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule,  } from "@angular/common/http";
import {MatSnackBarModule} from '@angular/material/snack-bar';
const appRoutes: Routes = [
  { path: '', component: FirstComponent, data: { title: 'First Component' } },
  { path: 'first', component: FirstComponent, data: { title: 'First Component' } },
  { path: 'second', component: SecondComponent, data: { title: 'Second Component' } }
];
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SecondComponent,
    FirstComponent,
    ClientBoqComponent,
    ItemDefineComponent,
    MaterialDialogComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatTabsModule,
    MatGridListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatListModule,HttpClientModule,
    BrowserAnimationsModule,MatButtonModule, MatSidenavModule, MatListModule, MatToolbarModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true } // <-- debugging purposes only
    ),
   
    CustomMaterialModule
  ],
  entryComponents: [MaterialDialogComponent,ItemComponent],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
