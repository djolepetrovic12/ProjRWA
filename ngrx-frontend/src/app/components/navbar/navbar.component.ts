import { Component, OnInit } from '@angular/core';
import { Emitters } from '../../emmiters/emmiters';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  
  authenticated : boolean = false;

  constructor(private httpClient:HttpClient){}
  
  ngOnInit(): void {
    Emitters.authEmmiter.subscribe(
      (auth:boolean) => { this.authenticated = auth;}
    )
  }

  logout():void 
  {
    this.httpClient.post("http://localhost:3000/user/logout",{},{withCredentials:true})
    .subscribe(()=> this.authenticated=false);
  }
   

}
