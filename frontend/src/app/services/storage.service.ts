import { Injectable } from '@angular/core';
import { Token } from '@angular/compiler';



const TOKEN ='c_token';
const USER ='c_user';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static hasToken():boolean{
    if(this.getToken()===null){
      return false;
    }
    return true;
  }


  public saveUser(user:any)
  {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER,JSON.stringify(user))
  }


  public saveToken(token:string){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
  }


  static getToken(){
    return localStorage.getItem(TOKEN);
  }

  static isUserLoggedIn(){
    if (this.getToken()==null){
      return false;
    }
    return true
  }
  
  static logout(){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }


  static signOut():void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }


  static getUser(): any{
    const userString = localStorage.getItem(USER);
    if (userString !==null){
      return JSON.parse(userString);
    }
  }


  static getUserId():string{
    const user = this.getUser();
    if(user==null){return '';}
    return user.userId;
  }
}
