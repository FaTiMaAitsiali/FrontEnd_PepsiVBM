import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}
  postAbsence(data : any){
     return this.http.post<any>("http://localhost:3000/AbsenceList/",data);
  }
  
  getAbsence(){
    return this.http.get<any>("http://desktop-31psqv4:8081/Collaborateur/Allabsences");
  }

  putAbsence(data:any , id: number){
    return this.http.put<any>("http://localhost:3000/AbsenceList/"+id,data);
    }
     
  deleteAbsence(id : number){
    return this.http.delete<any>("http://localhost:3000/AbsenceList/"+id);
    }
  }
