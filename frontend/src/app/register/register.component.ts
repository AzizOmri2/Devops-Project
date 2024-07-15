import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  signupForm: FormGroup;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { 
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validators: RegisterComponent.confirmationValidator });
  }

  ngOnInit() {
    // Pas besoin de répéter l'initialisation de signupForm ici
  }

  static confirmationValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  signup() {
    if (this.signupForm && this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.service.signup(this.signupForm.value).subscribe(
        (response: any) => {
          console.log(response);
            console.log("You're registered successfully!");
            this.router.navigateByUrl('/login');
        },
        (error: any) => {
          console.log("Your Registration failed, Please try again!");
          console.error("Signup failed:", error);
        }
      );
    } else {
      console.error("Signup form is not initialized or invalid.");
    }
  }

}
