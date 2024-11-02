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

  login(formData:any) :Observable<User>
  {
    return this.httpClient.post<User>(this.userURL + 'login',formData,{withCredentials:true})
  }

  logout()
  {
    return this.httpClient.post("http://localhost:3000/user/logout",{},{withCredentials:true})
  }
}




/*this.httpClient.post("http://localhost:3000/user/login", this.form.getRawValue(),{withCredentials:true})
    .subscribe(
      (response) => {this.router.navigate(['/']);},
      (error) => {
        const errorMessage = error.error?.message || 'An unknown error occurred';
        console.log(errorMessage);
      }
    );*/
