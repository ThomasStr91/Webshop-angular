import { Component, Input } from '@angular/core';
import { Goods } from '../../interfaces/goods';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-product',
  imports: [
    MatCardModule,
    CommonModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})

export class ProductComponent {

  @Input() childProduct: Goods | undefined;

  constructor(private userService: UserService, private snackbar: MatSnackBar) { }

  addToCart(product: Goods) {
    const currentUserString = localStorage.getItem('currentUser');
    if (!currentUserString) {
      this.showErrorMessage("Bitte zuerst einloggen!");
      return;
    }

    const currentUser = JSON.parse(currentUserString); 

    this.userService.addToCart(currentUser.id, product).subscribe(
      () => {this.showSuccessMessage("Produkt wurde zum Warenkorb hinzugefügt!");},
      error => {this.showErrorMessage("Fehler beim Hinzufügen des Produkts!"); }
    );


  }
  showSuccessMessage(message: string) {
    this.snackbar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });}

    showErrorMessage(message: string) {
      this.snackbar.open(message, 'OK', { // ✅ Snackbar öffnen
        duration: 3000, // ✅ 5 Sekunden anzeigen
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }}

