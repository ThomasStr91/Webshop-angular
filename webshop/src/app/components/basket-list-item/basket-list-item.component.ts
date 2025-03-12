import { Component, Input, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { BasketItem } from '../../interfaces/basket-item';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { BasketService } from '../../services/basket.service';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import {MatListModule} from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-basket-list',
  imports: [MatCard, CommonModule, MatButton, MatListModule, MatIcon],
  templateUrl: './basket-list-item.component.html',
  styleUrl: './basket-list-item.component.scss'
})
export class BasketListItemComponent implements OnInit {

  @Input() childItem: BasketItem | undefined;
  @Input() basketList!: BehaviorSubject<BasketItem[]>;

    goods: Product [] =[]

    constructor(private basketService: BasketService, private productService: ProductService) {}

    ngOnInit(): void {
      this.productService.getAllProducts().subscribe(goods => {
        this.goods = goods;
      })
    }

    getProductName(productId: string | undefined): string {
      return this.goods.find(product => productId === product.productId)?.productName || 'Unbekanntes Produkt';
    }

    // getProductPhoto(productId: string | undefined): string {
    //   return this.goods.find(pro => productId === pro.productId)?.picture || 'Kein Bild vorhanden';
    // }
  
    deleteItem(){
      if(this.childItem) {
      if (this.childItem && this.childItem.productId){
      this.basketService.deleteItem(this.childItem?.id).subscribe((deleteItem: BasketItem) => {
        console.log(deleteItem);
        let basket = this.basketList.getValue()
        const index = basket.findIndex(u => u.id === this.childItem?.id);
        if (index !== -1) {
          basket.splice(index, 1)
          this.basketList.next(basket)
        }
      })}
    }}
}
