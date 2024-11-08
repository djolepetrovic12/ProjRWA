import { Component, OnInit } from '@angular/core';
import { Emitters } from '../../emmiters/emmiters';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { SelectAuthFeature } from '../../store/selectors/user.selector';
import { Logout } from '../../store/actions/user.action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  
  authenticated$ : Observable<boolean> = of(false);

  constructor(private httpClient:HttpClient, private store: Store<AppState>){}
  
  ngOnInit(): void {
    
    this.authenticated$ = this.store.select(SelectAuthFeature);
    /*Emitters.authEmmiter.subscribe(
      (auth:boolean) => { this.authenticated = auth;}
    )*/
  }

  logout():void 
  {

    this.store.dispatch(Logout());

    /*
    this.httpClient.post("http://localhost:3000/user/logout",{},{withCredentials:true})
    .subscribe(()=> this.authenticated=false);*/
  }
   

}
