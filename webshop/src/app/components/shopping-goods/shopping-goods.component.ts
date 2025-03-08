import { Component } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { Goods } from '../../interfaces/goods';
import { BasketService } from '../../services/basket.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-shopping-goods',
  imports: [
    ProductComponent,
    CommonModule
  ],
  templateUrl: './shopping-goods.component.html',
  styleUrl: './shopping-goods.component.scss'
})
export class ShoppingGoodsComponent {
  products: Goods[] = [];

  constructor(private basketService: BasketService){

    basketService.getAllProducts().subscribe((data: Goods[]) => {
      console.log("insideSubsciption", data);
      this.products = data; 
    })
  }
}
