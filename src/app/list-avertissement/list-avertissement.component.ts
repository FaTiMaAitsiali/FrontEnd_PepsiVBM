import { AfterViewInit ,Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { MatDialog , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateAbsenceComponent } from '../create-absence/create-absence.component';
import { CreateAvertissementComponent } from '../create-avertissement/create-avertissement.component';

@Component({
  selector: 'app-list-avertissement',
  templateUrl: './list-avertissement.component.html',
  styleUrls: ['./list-avertissement.component.scss']
})
export class ListAvertissementComponent implements OnInit {
  displayedColumns: string[] = ['id','typeAvert','dateAvert','createdDate','commentaire','file','Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private api:ApiService,private dialog:MatDialog) { }
  ngOnInit(): void {
    this.getAllAvertissement();
  }
  getAllAvertissement(){
    this.api.getAvertissement()
    .subscribe({
       next:(res) => {
        console.log(res)
        this.dataSource= new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = this.dataSource.data.concat(res);
       },
       error:(err) => {
        alert("Erreur lors de la récupération des enregistrements!")
       }
    })
  }

  editAvertissement( row:any){
    this.dialog.open(CreateAvertissementComponent,{
    width:'50%',
    data:row
    }).afterClosed().subscribe(val => {
     if(val === 'update'){
    this.getAllAvertissement();
     }
     })
}
  
deleteAvertissement(id : number){
  this.api.deleteAvertissement(id)
  .subscribe({
    next:(res) => {
      alert("Avertissement Supprimée avec succès!");
      this.getAllAvertissement();
    },
    error:() =>{
      //alert("Erreur lors de la suppression d'avertissement!");
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

openDialog(){
  this.dialog.open(CreateAvertissementComponent,{
    width:'50%'
  });
}

}
