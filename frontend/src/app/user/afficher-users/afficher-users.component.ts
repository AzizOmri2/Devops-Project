import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-afficher-users',
  templateUrl: './afficher-users.component.html',
  styleUrls: ['./afficher-users.component.css']
})
export class AfficherUsersComponent {
  users: any = [];

  constructor(
    private authS: AuthService,
    private router: Router){}

  ngOnInit(){
    this.getAllUsers();
  }

  getAllUsers(){
    this.authS.afficherUser().subscribe((res)=>{
      console.log(res);
      this.users = res;
    })
  }
}
