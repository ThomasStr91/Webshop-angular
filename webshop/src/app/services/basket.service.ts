import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Product } from '../interfaces/product';
import { BasketItem } from '../interfaces/basket-item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {


  private goods: Product[] = [];

  private static BASKET_URL ="http://localhost:3000/basket"
  private static GOODS_URL = "http://localhost:3000/products"; 


  constructor( private httpClient: HttpClient) { this.getGoods();}

  private getGoods(){
      this.httpClient.get<Product[]>(BasketService.GOODS_URL).subscribe((data)=>{
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

  clearBasket(): Observable<void> {
    const user = localStorage.getItem("currentUser");
    if (user) {
      return this.getBasket().pipe(
        map(basketItems => {
          // Löscht alle Artikel im Warenkorb des Benutzers
          const deleteRequests = basketItems.map(item =>
            this.httpClient.delete(`${BasketService.BASKET_URL}/${item.id}`)
          );
          return deleteRequests;
        }),
        switchMap(deleteRequests => {
          // Warten auf alle Lösch-Anfragen, bevor wir das Observable beenden
          return forkJoin(deleteRequests).pipe(map(() => {}));
        })
      );
    }
    return new Observable<void>();  // Gibt ein leeres Observable zurück, wenn kein Benutzer gefunden wurde
  }
}