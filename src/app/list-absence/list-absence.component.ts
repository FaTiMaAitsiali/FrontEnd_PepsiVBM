import { AfterViewInit ,Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { MatDialog , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateAbsenceComponent } from '../create-absence/create-absence.component';
@Component({
  selector: 'app-list-absence',
  templateUrl: './list-absence.component.html',
  styleUrls: ['./list-absence.component.scss']
})
export class ListAbsenceComponent implements OnInit {
  displayedColumns: string[] = ['id','typeAbs','datePremierJ', 'dateDernierJ', 'dateRetour', 'nombreJ','createdDate','commentaire','file','Action'];
  dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private api:ApiService,private dialog:MatDialog) { }
  // ngAfterViewInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  ngOnInit(): void {
    this.dataSource= new MatTableDataSource();
    this.getAllAbsences();
   }
  getAllAbsences(){
    this.dataSource.data = []
    this.api.getAbsence()
    .subscribe({
      next:(res) => {
        console.log(res)
        this.dataSource= new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = this.dataSource.data.concat(res)
      },
      error:(err) => {
        alert("Erreur lors de la récupération des enregistrements!")
      }
    })
  }
  editAbsence( row:any){
      this.dialog.open(CreateAbsenceComponent,{
      width:'50%',
      data:row
  }).afterClosed().subscribe(val => {
    if(val === 'update'){
      this.getAllAbsences();
    }
  })
    }

  deleteAbsence(id : number){
    this.api.deleteAbsence(id)
    .subscribe({
      next:(res) => {
        alert("Absence Supprimée avec succès!");
        this.getAllAbsences();
      },
      error:() =>{
        //alert("Erreur lors de la suppression d'absence!");
      }
    })
  }  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }  
}
