import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterModule,
    CommonModule
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  admin: boolean = false;
  private isLoggedInAdminSubscription!: Subscription;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.isLoggedInAdminSubscription = this.loginService.getIsLoggedInAdmin().subscribe(
      (isLoggedInAdmin: boolean) => {
        this.admin = isLoggedInAdmin;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.isLoggedInAdminSubscription) {
      this.isLoggedInAdminSubscription.unsubscribe();
    }
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  logout(): void {
    this.loginService.logout();  
    this.router.navigate(['/']);  
  }
}
