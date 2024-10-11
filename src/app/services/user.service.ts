import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/users';


// The UserService class is an Angular service that provides methods for CRUD operations on the User object. The service uses the HttpClient service to send HTTP requests to the server. 
// The service methods return Observables that emit User objects or arrays of User objects. The service methods are used by the 
// UserListComponent and UserFormComponent components to fetch, create, update, and delete User objects.
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/users';



// The constructor method injects the HttpClient service into the UserService class. The HttpClient service is used to send HTTP requests to the server.
  constructor(private http:HttpClient) { }

  // The getUsers method sends an HTTP GET request to the server to fetch all users. The method returns an Observable that emits an array of User objects.
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl);
  }

// The getUserById method sends an HTTP GET request to the server to fetch a user by id. The method returns an Observable that emits an array of User objects.
  getUserById(id:number):Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl+`/${id}`);
  }

  // The createUser method sends an HTTP POST request to the server to create a new user. The method returns an Observable that emits the created User object
  createUser(user:User):Observable<User> {
    return this.http.post<User>(this.apiUrl,user);
  }

  // The updateUser method sends an HTTP POST request to the server to update a user. The method returns an Observable that emits the updated User object.
  updateUser(user:User){
    return this.http.post(this.apiUrl,user);
  }

  // The deleteUser method sends an HTTP DELETE request to the server to delete a user. The method returns an Observable that emits the deleted User object.
  deleteUser(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  

}
