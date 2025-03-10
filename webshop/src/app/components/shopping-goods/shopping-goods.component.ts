import { Component } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { Goods } from '../../interfaces/goods';
import { BasketService } from '../../services/basket.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';


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

  constructor(private productService: ProductService){

    productService.getAllProducts().subscribe((data: Goods[]) => {
      console.log("insideSubsciption", data);
      this.products = data; 
    })
  }
}
