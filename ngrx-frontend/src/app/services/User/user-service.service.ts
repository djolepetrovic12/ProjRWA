import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userURL = 'http://localhost:3000/user/'

  constructor(private httpClient:HttpClient) { }

  getCurrentUser() {
    return this.httpClient.get<User>(this.userURL + 'user1',{withCredentials:true});
  }

  login(formData:any) :Observable<User>
  {
    return this.httpClient.post<User>(this.userURL + 'login',formData,{withCredentials:true})
  }

  logout()
  {
    return this.httpClient.post("http://localhost:3000/user/logout",{},{withCredentials:true})
  }

  register(formData:any)
  {
    return this.httpClient.post("http://localhost:3000/user/register", formData);
  }

  getAllUsers(userID:number)
  {
    return this.httpClient.get(this.userURL + 'getAllUsers/' + userID,{withCredentials:true});
  }

  deleteUser(id:number)
  {
    return this.httpClient.delete(this.userURL + 'deleteUser/' + id,{withCredentials:true});
  }

  updateUser(id:number, formData: any)
  {
    return this.httpClient.patch(this.userURL + 'updateUser/' + id,formData,{withCredentials:true});
  }

}

