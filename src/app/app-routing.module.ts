import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAbsenceComponent } from './create-absence/create-absence.component';
import { CreateAvertissementComponent } from './create-avertissement/create-avertissement.component';
import { ListAbsenceComponent } from './list-absence/list-absence.component';
import { ListAvertissementComponent } from './list-avertissement/list-avertissement.component';

const routes:Routes=[
    {path :'create' , component : CreateAbsenceComponent },
    {path :'list' , component : ListAbsenceComponent },
    {path :'warning' , component : CreateAvertissementComponent },
    {path :'WarningList' , component : ListAvertissementComponent }
]
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
}
)
export class appRoutingModule{

}