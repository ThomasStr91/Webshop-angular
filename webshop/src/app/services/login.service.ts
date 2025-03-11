import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users: User[] = [];
  currentUser: User | null = null;

  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false)
  private isLoggedInAdmin: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor(private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar) {

    this.userService.getAllUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }


  validateLogin(userName: string, password: string): Observable<boolean> {
    // 🔍 Benutzer in der DB suchen
    const user = this.users.find(u => u.userName === userName && u.userPassword === password);

    if (user) {

      this.currentUser = user;
      localStorage.setItem('currentUser', user.userName);


      const loggedInUser = { userName: user.userName, role: user.userRole };
      localStorage.setItem("currentUser", JSON.stringify(loggedInUser));


      if (user.userRole === "Admin") {
        this.isLoggedIn.next(true);
        this.isLoggedInAdmin.next(true);
        console.log("Admin erfolgreich angemeldet:", user);

        this.router.navigate(['/shopping-goods']);

        return of(true);
      }

      this.isLoggedIn.next(true);
      console.log("Normaler User erfolgreich angemeldet:", user);
      this.router.navigate(['/shopping-goods']);
      return of(true);
    } else {
      this.showErrorMessage("Falscher Benutzername oder Passwort");
    }

    console.log("Login fehlgeschlagen: Kein Benutzer gefunden");
    return of(false);
  }

  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  getIsLoggedInAdmin(): Observable<boolean> {
    return this.isLoggedInAdmin.asObservable();
  }

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'OK', { // ✅ Snackbar öffnen
      duration: 3000, // ✅ 5 Sekunden anzeigen
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}

