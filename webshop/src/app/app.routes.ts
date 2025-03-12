import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { ShoppingGoodsComponent } from './components/shopping-goods/shopping-goods.component';
import { LoginComponent } from './components/login/login.component';
import { BasketComponent } from './components/basket/basket.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'shopping-goods', component: ShoppingGoodsComponent },
    { path: 'basket', component: BasketComponent},
    { path: 'users', component: UserManagementComponent},
    { path: '**', component: PageNotFoundComponent },
];
