import { Component, Input } from '@angular/core';
import { Goods } from '../../interfaces/goods';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  @Input() childProduct: Goods | undefined; 
}
