import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    localStorage.removeItem('c_user'); // Remove the user token or any other stored data
    localStorage.removeItem('c_token');
    this.router.navigateByUrl("/login"); // Navigate to login page or any other page after logout  
  }
}
