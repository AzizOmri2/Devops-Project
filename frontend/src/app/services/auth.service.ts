import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from "@angular/material/snack-bar";
import { StorageService } from './storage.service';
import { catchError, map, tap } from 'rxjs/operators'; // Importez catchError, map et tap depuis rxjs/operators


const BASIC_URL =['http://localhost:8081/'];
export const AUTH_HEADER="authorization";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(   
    private http: HttpClient,
    private storage:StorageService
  ) { }


  afficherUser():Observable<any>{
    return this.http.get(BASIC_URL + "usersList");
  }


  getUser(id:any):Observable<any>{
    return this.http.get(BASIC_URL + "get-user/"+id);
  }


  signup(signupRequest:any):Observable<any>{
    return this.http.post(BASIC_URL + "sign-up",signupRequest);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(BASIC_URL + "authenticate", { email, password }, { observe: 'response' }).pipe(
      tap(__ => this.log("User Authentication")),
      map((res: HttpResponse<any>) => {
        this.storage.saveUser(res.body);

        const authHeader = res.headers.get(AUTH_HEADER);
        let bearerToken: string | null = null;

        if (authHeader) {
            const tokenLength = authHeader.length;
            bearerToken = authHeader.substring(7, tokenLength);
        }

        if (bearerToken) {
            this.storage.saveToken(bearerToken);
        } else {
            console.error(`Failed to retrieve bearer token from header ${AUTH_HEADER}`);
        }

        return res;
      }),
      catchError((error: any) => {
        // Handle error here
        console.error('Login error:', error);
        return throwError(error); // Re-throw the error to be caught by the caller
      })
    );
  }

  log(message:string):void{
    console.log("User Auth Service"+message)
  }


  private createAuthorizationHeadear(){
    const jwtToken= localStorage.getItem('JWT');
   if(jwtToken){
    return new HttpHeaders().set(
          'Authorization','Bearer'+jwtToken
    )
   }else {
    console.log("JWT token not found in the local storage");
   }
   return null;
  }
}
