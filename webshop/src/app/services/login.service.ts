import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users: User[] = [];

private isLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject(false)
private isLoggedInAdmin: BehaviorSubject<boolean> = new BehaviorSubject(false)

constructor(private userService: UserService) {
  this.userService.getAllUsers().subscribe((data: User[]) => {
    this.users = data;
  });
}


validateLogin(userName :string, password: string): Observable<boolean> {
  // 🔍 Benutzer in der DB suchen
  const user = this.users.find(u => u.userName === userName && u.userPassword === password);

  if (user) {
    // 🎯 User-Objekt mit Rolle speichern
    const loggedInUser = { userName: user.userName, role: user.userRole };
    localStorage.setItem("currentUser", JSON.stringify(loggedInUser));

    // 🔹 Admin-Check anhand der Rolle aus der DB
    if (user.userRole === "Admin") {
      this.isLoggedIn.next(true);
      this.isLoggedInAdmin.next(true);
      console.log("Admin erfolgreich angemeldet:", user);
      return of(true); // ✅ Admin-Rolle zurückgeben
    }

    // 🔹 Normaler Benutzer
    this.isLoggedIn.next(true);
    console.log("Normaler User erfolgreich angemeldet:", user);
    return of(true); 
  }

  console.log("Login fehlgeschlagen: Kein Benutzer gefunden");
  return of(false); 
}

  getItLoggedIn(): Observable<boolean>{
    return this.isLoggedIn.asObservable();
  }

  getItLoggedInAdmin(): Observable<boolean>{
    return this.isLoggedInAdmin.asObservable();
  }
}
