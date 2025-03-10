import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Goods } from '../interfaces/goods';
import { BasketItem } from '../interfaces/basket-item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private static BASKET_URL ="http://localhost:3000/basket"

  constructor( private httpClient: HttpClient) { }


  getBasket():Observable<BasketItem[]>{
    const currentUser = localStorage.getItem("currentUser");

    return this.httpClient.get<BasketItem[]>(BasketService.BASKET_URL)
    .pipe(map(basketItems => basketItems.filter(item => item.userId === currentUser)))
  }

  addToBasket(id: string, price: number){
    const product: BasketItem = {
      productId: id,
      productPrice: price,
      userId: localStorage.getItem("currentUser") || ""
    }
  
    return this.httpClient.post<BasketItem>(BasketService.BASKET_URL, product)
  }

  // getProductName(productId: string): string {
  //   return this.products.find(product => product.id === productId)?.name || 'Unbekanntes Produkt';
  // }
 
 
}
