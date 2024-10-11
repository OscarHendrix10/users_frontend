import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/users';




  constructor(private http:HttpClient) { }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl);
  }


  getUserById(id:number):Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl+`/${id}`);
  }

  createUser(user:User):Observable<User> {
    return this.http.post<User>(this.apiUrl,user);
  }

  updateUser(user:User){
    return this.http.post(this.apiUrl,user);
  }

  deleteUser(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  

}
