import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const BASIC_URL =['http://localhost:8081/'];


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  addProject(project : any): Observable<any> {
    return this.http.post(BASIC_URL + "project/add", project);
  }

  updateProject(id: number,project : any): Observable<any> {
    return this.http.put(BASIC_URL + "project/update/"+id, project);
  }

  viewProject():Observable<any>{
    return this.http.get(BASIC_URL + "project/all");
  }

  viewProjectById(id: number): Observable<any>{
    return this.http.get(BASIC_URL+"project/show/"+id);
  }

  deleteProject(id: number): Observable<any>{
    return this.http.delete(BASIC_URL+"project/delete/"+id);
  }

}
