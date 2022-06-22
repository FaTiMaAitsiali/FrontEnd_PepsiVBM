import { Component, OnInit } from '@angular/core';
import { MatDialog , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateAbsenceComponent } from './create-absence/create-absence.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'absence';
  constructor(private dialog:MatDialog){}
  
  openDialog(){
    this.dialog.open(CreateAbsenceComponent,{
      width:'50%'
    });
  }
 


}
