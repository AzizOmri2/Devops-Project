import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(
      () => {
        console.log('Logged in successfully');
        this.getUserRoleFromLocalStorage();
      },
      (error) => console.error('Login failed', error)
    );
  }

  
  


  getUserRoleFromLocalStorage() {
    const userString = localStorage.getItem('c_user');
      if (userString) {
        const userId = JSON.parse(userString).userID;
        this.authService.getUser(userId).subscribe(
          (user: any) => {
            const userRole = user.userRole;
            if(userRole == "USER"){
              this.router.navigateByUrl("/merci");
            }else{
              this.router.navigateByUrl("/dashboard");
            }
          },
          (error) => console.error('Error fetching user role:', error)
        );
    } else {
      console.error('User ID not found in localStorage');
      // Handle case where user ID is not found in localStorage
    }
  }
}
