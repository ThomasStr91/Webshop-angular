import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static USERS_URL= "http://localhost:3000/users"
  
  constructor(private httpClient: HttpClient){
  
  }
  getAllUsers(): Observable<User[]> {
      return this.httpClient.get<User[]>(UserService.USERS_URL)
  }
  addToCart(userName: string, product: any): Observable<User> {
    return this.getAllUsers().pipe(
      map(users => users.find(user => user.userName === userName)),
      switchMap(user => {
        if (!user) {
          throw new Error('User not found');
        }
        const updatedCart = user.cart ? [...user.cart, product] : [product];
        return this.httpClient.patch<User>(`${UserService.USERS_URL}/${user.id}`, { cart: updatedCart });
      })
    );
  }
  
  }
}
