import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LoginComponent } from "../login/login.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterModule,
    LoginComponent,
    CommonModule
],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  constructor(private router: Router){}

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;

  }

  logout(){
    localStorage.removeItem('currentUser');
    this.router.navigate(["/"])
  }
}
