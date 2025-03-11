import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  userName: string = '';
  password: string = '';
  errorMessage: string = '';

  users: User[] = [];

  currentUser: User | null = null;

  constructor(
    private userService: UserService,
    private loginService: LoginService) 
    {
    userService.getAllUsers().subscribe((data: User[]) => {
      this.users = data
    })
  }

  login() {
      this.loginService.validateLogin(this.userName, this.password).subscribe((result: boolean) => {
        console.log("login", result); })
      }
}
