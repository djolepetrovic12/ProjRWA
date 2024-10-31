import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../../emmiters/emmiters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  message: string = "you are not logged in";

  constructor(private httpClient:HttpClient){}

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
