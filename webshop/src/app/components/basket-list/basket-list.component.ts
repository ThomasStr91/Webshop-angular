import { Component, Input, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { BasketItem } from '../../interfaces/basket-item';
import { BasketComponent } from '../basket/basket.component';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { BasketService } from '../../services/basket.service';
import { Goods } from '../../interfaces/goods';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-basket-list',
  imports: [MatCard, MatCardContent, CommonModule, MatButton],
  templateUrl: './basket-list.component.html',
  styleUrl: './basket-list.component.scss'
})
export class BasketListComponent implements OnInit {

    @Input() childItem: BasketItem | undefined;

    basketItems: BasketItem[] = [];
    goods: Goods [] =[]

    constructor(private basketService: BasketService, private productService: ProductService) {}

    ngOnInit(): void {
      this.loadBasketItems();

      this.productService.getAllProducts().subscribe(goods => {
        this.goods = goods;
      })
    }

    getProductName(productId: string | undefined): string {
      return this.goods.find(product => productId === product.productId)?.productName || 'Unbekanntes Produkt';
    }
  
    loadBasketItems(): void {
      this.basketService.getBasket().subscribe((items: BasketItem[]) => {
        this.basketItems = items;
      });
    }

    deleteItem(){
      if(this.childItem) {
      if (this.childItem && this.childItem.productId){
      this.basketService.deleteItem(this.childItem?.id).subscribe((deleteItem: BasketItem) => {
        console.log(deleteItem);
        this.basketService.getBasket()
      })}
    }}
}
