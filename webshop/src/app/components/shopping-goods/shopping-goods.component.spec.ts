import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingGoodsComponent } from './shopping-goods.component';

describe('ShoppingGoodsComponent', () => {
  let component: ShoppingGoodsComponent;
  let fixture: ComponentFixture<ShoppingGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingGoodsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
