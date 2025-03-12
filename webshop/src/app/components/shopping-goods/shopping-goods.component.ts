import { Component } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { Product } from '../../interfaces/product';
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
  products: Product[] = [];

  constructor(private productService: ProductService){

    productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data; 
    })
  }
}
