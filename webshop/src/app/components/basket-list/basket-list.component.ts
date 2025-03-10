import { Component, Input } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { BasketItem } from '../../interfaces/basket-item';
import { BasketComponent } from '../basket/basket.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basket-list',
  imports: [MatCard, MatCardContent, CommonModule],
  templateUrl: './basket-list.component.html',
  styleUrl: './basket-list.component.scss'
})
export class BasketListComponent {

    @Input() childItem: BasketItem | undefined;
}
