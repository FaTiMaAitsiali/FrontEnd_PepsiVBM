import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  server_url = "http://desktop-31psqv4:8081/Collaborateur"
  
  constructor(private http: HttpClient) {}

  postAbsence(id: any, data : any){
     return this.http.post<any>(this.server_url+"/Absence/"+id,data);
  }
  getAbsence(){
    return this.http.get<any>(this.server_url+"/Absence");
  }
  putAbsence(data:any , id: number){
    return this.http.put<any>(this.server_url+"/Absence/"+id,data);
    }
  deleteAbsence(id : number){
    return this.http.delete<any>(this.server_url+"/Absence/"+id);
    }


  postAvertissement( data : any){
    return this.http.post<any>("http://localhost:3000/AvertissementList/",data);
 }
  getAvertissement(){
    return this.http.get<any>("http://localhost:3000/AvertissementList/");
}
  putAvertissement(data:any , id:number){
    return this.http.put<any>("http://localhost:3000/AvertissementList/"+id,data);
    }
  deleteAvertissement(id : number){
    return this.http.delete<any>("http://localhost:3000/AvertissementList/"+id);
    }
  }
