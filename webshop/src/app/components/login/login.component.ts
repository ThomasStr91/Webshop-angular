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
  
  constructor(private userService: UserService, 
    private router: Router,
  private snackBar: MatSnackBar){

    userService.getAllUsers().subscribe((data: User[]) => {
      this.users = data
    })
  }

  login()  {
    const user = this.users.find(u => u.userName ===this.userName && u.userPassword === this.password) ;

  if(user){
    this.currentUser = user; 
    localStorage.setItem('currentUser', user.userName);
    this.router.navigate(['/shopping-goods']);
    console.log(this.userName);    
  } else {
    this.showErrorMessage("Falscher Benutzername oder Passwort");
  }
}
showErrorMessage(message: string) {
  this.snackBar.open(message, 'OK', { // ✅ Snackbar öffnen
    duration: 3000, // ✅ 5 Sekunden anzeigen
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  });
}
}

