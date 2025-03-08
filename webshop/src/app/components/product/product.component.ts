import { Component, Input } from '@angular/core';
import { Goods } from '../../interfaces/goods';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-product',
  imports: [ 
    MatButton,
    MatCardModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  @Input() childProduct: Goods | undefined; 
}
