import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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


  @Input() childProduct: Product | undefined;

  constructor(private basketService: BasketService) {
  }

  addToBasket() {
    if (this.childProduct) {
      const { productId, price } = this.childProduct;
      this.basketService.addToBasket(productId, price).subscribe(
        {
          next: (response) => {
            console.log("Produkt wurde zum Warenkorb hinzugefügt", response);
          },
          error(error) {
            console.error("Fehler beim Hinzufügen zum Warenkorb", error);
          }
        }
      );
    }
  }
}

