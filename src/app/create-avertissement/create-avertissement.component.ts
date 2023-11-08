import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { MatDialog , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-create-avertissement',
  templateUrl: './create-avertissement.component.html',
  styleUrls: ['./create-avertissement.component.scss']
})
export class CreateAvertissementComponent implements OnInit {

  createAvertForm !: FormGroup;
  fichier: File = null;
  actionBtn :string ="Valider";

  constructor(private formBuilder : FormBuilder ,private router : Router , private api : ApiService, @Inject(MAT_DIALOG_DATA) public editData:any , private dialogRef:MatDialogRef<CreateAvertissementComponent>) { }

  ngOnInit(): void {
    this.createAvertForm=this.formBuilder.group({
      dateAvert:['',Validators.required],
      typeAvert:['',Validators.required],
      id:['',Validators.required],
      file:[''],
      commentaire:[''],
      createdDate:new Date()
    });
  if (this.editData){
    this.actionBtn="Enregistrer";
    this.createAvertForm.controls['dateAvert'].setValue(this.editData.dateAvert);
    this.createAvertForm.controls['typeAvert'].setValue(this.editData.typeAvert);
    this.createAvertForm.controls['id'].setValue(this.editData.id);
    this.createAvertForm.controls['commentaire'].setValue(this.editData.commentaire);
    this.createAvertForm.controls['file'].setValue(this.editData.file);
  }
  }
  
  envoiFichier (event: Event,) {
    console.log( (event.target as HTMLInputElement) .files)
}
  CreerAvert(){
    if(!this.editData){
      if(this.createAvertForm.valid)
      {
        this.api.postAvertissement(this.createAvertForm.value)
        .subscribe({
          next:(res) => {
            alert("Avertissement Créé avec succès!");
            this.createAvertForm.reset();
            this.dialogRef.close('save');
        },
        error:() => {
          alert("Une erreur à été détécter au moment de création d'avertissement!");
         }
      }),
      this.router.navigateByUrl('/WarningList');
    }
    }
  else{
    this.updateAvertissement();
  }
}

updateAvertissement(){
  this.api.putAvertissement(this.createAvertForm.value,this.editData.id)
  .subscribe({
    next:(res) => {
      alert("Avertissement modifiée avec succès!");
      this.createAvertForm.reset();
      this.dialogRef.close('update');
    },
    error:() =>{
      alert("Erreur lors de la modification d'avertissement!");
    }
  })
}
}