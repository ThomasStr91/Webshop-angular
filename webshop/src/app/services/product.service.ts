import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    private static USERS_URL = "http://localhost:3000/products"
  constructor(private httpClient: HttpClient) { }

    getAllProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(ProductService.USERS_URL)
    
  }
}
