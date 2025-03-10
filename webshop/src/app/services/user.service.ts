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
  }

