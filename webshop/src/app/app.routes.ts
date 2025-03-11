import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { ShoppingGoodsComponent } from './components/shopping-goods/shopping-goods.component';
import { LoginComponent } from './components/login/login.component';
import { BasketComponent } from './components/basket/basket.component';
import { UserManagementComponent } from './components/user-management/user-management.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'shopping-goods', component: ShoppingGoodsComponent },
    { path: '**', redirectTo: 'login' },
    { path: 'basket', component: BasketComponent},
    { path: 'user', component: UserManagementComponent}
];
