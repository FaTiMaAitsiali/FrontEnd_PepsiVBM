import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAbsenceComponent } from './create-absence/create-absence.component';
import { ListAbsenceComponent } from './list-absence/list-absence.component';

const routes:Routes=[
    {path :'create' , component:CreateAbsenceComponent },
    {path :'list' , component:ListAbsenceComponent },
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