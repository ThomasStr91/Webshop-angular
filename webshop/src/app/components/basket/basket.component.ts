import { Component } from '@angular/core';
import { BasketItem } from '../../interfaces/basket-item';
import { BasketService } from '../../services/basket.service';
import { BasketListComponent } from "../basket-list/basket-list.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basket',
  imports: [BasketListComponent, CommonModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {

  basketItems: BasketItem[] = [];

  constructor(private basketService: BasketService) {
    basketService.getBasket().subscribe((data: BasketItem[]) => {
      console.log(data);
      this.basketItems = data;
    })
  }

}
