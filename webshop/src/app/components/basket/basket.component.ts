import { Component } from '@angular/core';
import { BasketItem } from '../../interfaces/basket-item';
import { BasketService } from '../../services/basket.service';
import { BasketListItemComponent } from "../basket-list-item/basket-list-item.component";
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-basket',
  imports: [BasketListItemComponent, CommonModule, MatCardModule, MatButton],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {

  basketSubject = new BehaviorSubject<BasketItem[]>([])

  // basketItems: BasketItem[] = [];

  constructor(private basketService: BasketService) {
    basketService.getBasket().subscribe((data: BasketItem[]) => {
      console.log(data);
      this.basketSubject.next(data);
    })
  }

  clearBasket(){
    this.basketService.clearBasket().subscribe(() => {
      this.basketSubject.next([]); 
    })
   
  }

  sendOrder(){

  }

  getTotalPrice() : number{
    let sum: number = 0; 
    for(let item of this.basketSubject.value){
      sum += item.productPrice;
    }
    return sum;
  }
  
  // getTotalPrice(){
  //   return this.basketSubject.value.reduce((total, item) => total + item.productPrice, 0)
  // }
}
