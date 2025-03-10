import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Goods } from '../interfaces/goods';
import { BasketItem } from '../interfaces/basket-item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {


  private goods: Goods[] = [];

  private static BASKET_URL ="http://localhost:3000/basket"
  private static GOODS_URL = "http://localhost:3000/goods"; 


  constructor( private httpClient: HttpClient) { this.getGoods();}

  private getGoods(){
      this.httpClient.get<Goods[]>(BasketService.GOODS_URL).subscribe((data)=>{
        this.goods = data;
      })
  }

  getBasket(): Observable<BasketItem[]> {
    const currentUser = localStorage.getItem("currentUser");
    return this.httpClient.get<BasketItem[]>(BasketService.BASKET_URL).pipe(
      map(basketItems => basketItems.filter(item => item.userId === currentUser))
    )
  }
  

  addToBasket(id: string, price: number){
    const product: BasketItem = {
      productId: id,
      productPrice: price,
      userId: localStorage.getItem("currentUser") || ""
    }
  
    return this.httpClient.post<BasketItem>(BasketService.BASKET_URL, product)
  }

  deleteItem(productId: string |  undefined): Observable<BasketItem>{
    const url = `${BasketService.BASKET_URL}/${productId}`
    return this.httpClient.delete<BasketItem>(url)
  }

  clearBasket(){
    const user = localStorage.getItem("currentUser");
    if(user){
      this.getBasket().subscribe(items => {
        items.forEach(item => {
          this.httpClient.delete(`${BasketService.BASKET_URL}/${item.id}`).subscribe;
        })
      })
    }
  }
}
