import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Goods } from '../interfaces/goods';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    private static USERS_URL = "http://localhost:3000/goods"
  constructor(private httpClient: HttpClient) { }

    getAllProducts(): Observable<Goods[]>{
    return this.httpClient.get<Goods[]>(ProductService.USERS_URL)
    
  }
}
