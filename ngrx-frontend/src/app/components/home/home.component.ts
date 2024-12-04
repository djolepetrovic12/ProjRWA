import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
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
    
  }
}
