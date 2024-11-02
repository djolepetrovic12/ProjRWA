import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../../emmiters/emmiters';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { SelectUserFeature } from '../../store/selectors/user.selector';
import { User } from '../../models/user';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  message: string = "you are not logged in";
  userInfo$: Observable<User | null>;

  constructor(private httpClient:HttpClient, private store:Store<AppState>){}

  ngOnInit(): void {
    

    this.httpClient.get("http://localhost:3000/user/user1",{withCredentials:true})
    .subscribe(
      res=>{
        console.log(res); this.message = 'hello hello';
        Emitters.authEmmiter.emit(true);
      },
      err =>{
        console.log(err)
        Emitters.authEmmiter.emit(false);
      });
  }
}
