import { Component, Input } from '@angular/core';
import { Goods } from '../../interfaces/goods';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { BasketService } from '../../services/basket.service';


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

  constructor(private userService: UserService, private basketService: BasketService) {
  }

  addToBasket() {
    if (this.childProduct) {
      const { productId, price } = this.childProduct;
      this.basketService.addToBasket(productId, price).subscribe(response => {
        console.log("Produkt wurde zum Warenkorb hinzugefügt", response);
      }, error => {
        console.error("Fehler beim Hinzufügen zum Warenkorb", error);
      });
      console.log("Test");
      
    }
  }
}


